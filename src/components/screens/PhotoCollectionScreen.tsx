import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { compressImage } from "@/utils/imageCompression";

interface PhotoCollectionScreenProps {
  isFacilitator?: boolean;
  sessionId?: string;
}

export const PhotoCollectionScreen = ({ isFacilitator = false, sessionId }: PhotoCollectionScreenProps) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedPhoto, setSubmittedPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sessionId) {
      setPhotos([]);
      return;
    }

    loadPhotos();

    const channel = supabase
      .channel(`photo-submissions-realtime:${sessionId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'photo_submissions',
        filter: `session_id=eq.${sessionId}`
      }, (payload) => {
        console.log('Photo submission change detected:', payload);
        loadPhotos();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const loadPhotos = async () => {
    if (!sessionId) {
      setPhotos([]);
      return;
    }
    console.log('Loading photos for session:', sessionId);
    const { data, error } = await supabase
      .from('photo_submissions')
      .select('*, profiles(display_name)')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading photos:', error);
    } else {
      console.log('Loaded photos:', data?.length || 0);
      setPhotos(data || []);
    }
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitPhoto = async () => {
    if (!selectedFile || !sessionId) return;

    setIsSubmitting(true);
    setUploadProgress(0);
    const toastId = toast.loading('Compressing image...');

    try {
      // Compress image
      setUploadProgress(20);
      const compressedBlob = await compressImage(selectedFile, 1600, 0.8);
      
      toast.loading('Uploading photo...', { id: toastId });
      setUploadProgress(40);

      const { data: { user } } = await supabase.auth.getUser();
      
      // Upload to storage
      const fileName = `${sessionId}/${user?.id || 'anonymous'}_${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('photo-submissions')
        .upload(fileName, compressedBlob, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
        });

      if (uploadError) throw uploadError;

      setUploadProgress(80);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photo-submissions')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('photo_submissions')
        .insert({
          session_id: sessionId,
          photo_url: publicUrl,
          user_id: user?.id,
        });

      if (dbError) throw dbError;

      setUploadProgress(100);
      toast.success('Photo submitted successfully!', { id: toastId });
      setSubmittedPhoto(true);
      setSelectedImage(null);
      setSelectedFile(null);
    } catch (error: any) {
      toast.error(`Error submitting photo: ${error.message}`, { id: toastId });
      console.error('Error submitting photo:', error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  // Facilitator View
  if (isFacilitator) {
    return (
      <main className="h-screen flex flex-col py-6 animate-fade-in overflow-hidden" role="main" aria-label="Photo collection display">
        <header className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            How You Learn Best
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Everyone processes information differently
          </p>
          <Badge variant="outline" className="text-lg px-6 py-3">
            📸 Step 1: Learning Preferences
          </Badge>
        </header>

        <section className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full" aria-label="Submitted photos from participants">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Everyone: Take a photo that represents how you learn best
            </h2>
            <p className="text-lg text-muted-foreground">
              What environment, tool, or approach helps your brain absorb new information?
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {photos.map((photo: any, index) => (
              <Card key={photo.id} className="p-2 animate-fade-in">
                <img 
                  src={photo.photo_url || photo.photo_data} 
                  alt={`Learning preference photo ${index + 1} submitted by ${photo.profiles?.display_name || 'a participant'}`} 
                  className="w-full h-32 object-cover rounded mb-2" 
                />
                <p className="text-xs text-center text-muted-foreground truncate">
                  {photo.profiles?.display_name || 'Anonymous'}
                </p>
              </Card>
            ))}
            {photos.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground" role="status" aria-live="polite">
                Waiting for photos to arrive...
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  // Participant View
  return (
    <main className="h-screen flex items-center justify-center p-6 animate-fade-in" role="main" aria-label="Photo submission form">
      <Card className="max-w-2xl w-full p-8 bg-background/90 backdrop-blur-xl">
        <header className="text-center mb-6">
          <Badge variant="outline" className="mb-4">Step 1 of 5</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            How Do You Learn Best?
          </h2>
          <p className="text-muted-foreground">
            Take or upload a photo that represents your ideal learning environment or approach
          </p>
        </header>

        {!submittedPhoto ? (
          <>
            {!selectedImage ? (
              <div className="space-y-4">
                {/* Separate camera input */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageCapture}
                  className="hidden"
                />
                {/* Separate gallery input */}
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageCapture}
                  className="hidden"
                />
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  size="lg"
                  className="w-full h-32 text-xl"
                  aria-label="Take a photo using your device camera"
                >
                  <Camera className="mr-3 h-8 w-8" aria-hidden="true" />
                  Take Photo
                </Button>
                <Button
                  onClick={() => galleryInputRef.current?.click()}
                  variant="outline"
                  size="lg"
                  className="w-full h-20 text-lg"
                  aria-label="Upload a photo from your device gallery"
                >
                  <Upload className="mr-3 h-6 w-6" aria-hidden="true" />
                  Upload from Gallery
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <img src={selectedImage} alt="Preview of your selected learning preference photo" className="w-full rounded-lg" />
                {isSubmitting && uploadProgress > 0 && (
                  <div className="space-y-2" role="status" aria-live="polite" aria-label={`Upload progress: ${uploadProgress}%`}>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-center text-muted-foreground">
                      {uploadProgress < 40 ? 'Compressing...' : uploadProgress < 80 ? 'Uploading...' : 'Finishing...'}
                    </p>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button onClick={() => { setSelectedImage(null); setSelectedFile(null); }} variant="outline" className="flex-1" disabled={isSubmitting} aria-label="Retake photo">
                    Retake
                  </Button>
                  <Button onClick={submitPhoto} className="flex-1" disabled={isSubmitting} aria-label="Submit your photo">
                    {isSubmitting ? 'Uploading...' : 'Submit Photo'}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 space-y-4" role="status" aria-live="polite">
            <div className="text-6xl mb-4" aria-hidden="true">✅</div>
            <h3 className="text-2xl font-bold text-primary">Photo Submitted!</h3>
            <p className="text-muted-foreground">
              Watch the main screen to see what happens next
            </p>
          </div>
        )}
      </Card>
    </main>
  );
};
