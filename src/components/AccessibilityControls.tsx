import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, Eye, Volume2, Keyboard, Sun, Moon } from "lucide-react";

interface AccessibilityControlsProps {
  onSettingsChange?: (settings: AccessibilitySettings) => void;
}

export interface AccessibilitySettings {
  reduceMotion: boolean;
  highContrast: boolean;
  textSize: number;
  hideParticles: boolean;
  soundEnabled: boolean;
  keyboardHintsVisible: boolean;
  darkMode: boolean;
}

const defaultSettings: AccessibilitySettings = {
  reduceMotion: false,
  highContrast: false,
  textSize: 100,
  hideParticles: false,
  soundEnabled: true,
  keyboardHintsVisible: true,
  darkMode: false,
};

export const AccessibilityControls = ({ onSettingsChange }: AccessibilityControlsProps) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
    onSettingsChange?.(newSettings);

    // Apply immediately to document
    if (key === "reduceMotion") {
      document.documentElement.classList.toggle("reduce-motion", value as boolean);
    }
    if (key === "highContrast") {
      document.documentElement.classList.toggle("high-contrast", value as boolean);
    }
    if (key === "textSize") {
      document.documentElement.style.fontSize = `${value}%`;
    }
    if (key === "darkMode") {
      document.documentElement.classList.toggle("dark", value as boolean);
    }
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("accessibility-settings");
    onSettingsChange?.(defaultSettings);
    
    // Reset document styles
    document.documentElement.classList.remove("reduce-motion", "high-contrast", "dark");
    document.documentElement.style.fontSize = "100%";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 border-primary/20 bg-background/80 backdrop-blur-xl shadow-lg"
          aria-label="Accessibility Settings"
        >
          <Settings className="h-4 w-4 mr-2" />
          Accessibility
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Accessibility Settings
          </SheetTitle>
          <SheetDescription>
            Customize your experience for comfort and accessibility. All settings are saved automatically.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Visual Settings */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Visual Settings</h3>
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Reduce Motion
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) => updateSetting("reduceMotion", checked)}
                />
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    High Contrast
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Increase color contrast for better visibility
                  </p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                />
              </div>

              {/* Hide Particles */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Hide Background Effects
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Remove particle animations
                  </p>
                </div>
                <Switch
                  checked={settings.hideParticles}
                  onCheckedChange={(checked) => updateSetting("hideParticles", checked)}
                />
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-2">
                  {settings.darkMode ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Dark Mode
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Reduce eye strain with dark theme
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                />
              </div>

              {/* Text Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Text Size: {settings.textSize}%
                  </label>
                  <Badge variant="secondary">{settings.textSize === 100 ? "Default" : settings.textSize > 100 ? "Larger" : "Smaller"}</Badge>
                </div>
                <Slider
                  value={[settings.textSize]}
                  onValueChange={(vals) => updateSetting("textSize", vals[0])}
                  min={75}
                  max={150}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Small</span>
                  <span>Default</span>
                  <span>Large</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Audio Settings */}
          <Card className="p-4 bg-gradient-to-br from-accent/5 to-primary/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Audio Settings</h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Sound Effects
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Enable audio feedback for interactions
                  </p>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
                />
              </div>
            </div>
          </Card>

          {/* Keyboard Navigation */}
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Keyboard className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Keyboard Navigation</h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Show Keyboard Hints
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Display keyboard shortcuts on screen
                  </p>
                </div>
                <Switch
                  checked={settings.keyboardHintsVisible}
                  onCheckedChange={(checked) => updateSetting("keyboardHintsVisible", checked)}
                />
              </div>

              <div className="mt-4 p-3 bg-background/50 rounded-lg space-y-2 text-xs">
                <p className="font-semibold text-foreground">Keyboard Shortcuts:</p>
                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <span><kbd className="px-2 py-1 bg-background rounded border border-border">←</kbd> Previous</span>
                  <span><kbd className="px-2 py-1 bg-background rounded border border-border">→</kbd> Next</span>
                  <span><kbd className="px-2 py-1 bg-background rounded border border-border">F</kbd> Fullscreen</span>
                  <span><kbd className="px-2 py-1 bg-background rounded border border-border">Esc</kbd> Exit</span>
                </div>
              </div>
            </div>
          </Card>

          {/* UDL Note */}
          <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Universal Design for Learning</p>
              <p className="text-xs text-muted-foreground">
                These controls implement UDL principles: <strong>multiple means of representation</strong> (visual adjustments), <strong>engagement</strong> (sensory preferences), and <strong>expression</strong> (keyboard access). Designed for neurodiversity.
              </p>
            </div>
          </Card>

          {/* Reset Button */}
          <Button 
            onClick={resetToDefaults} 
            variant="outline" 
            className="w-full"
          >
            Reset to Defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
