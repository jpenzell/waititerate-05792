import { useMemo } from "react";
import { Card } from "@/components/ui/card";

interface WordCloudDisplayProps {
  words: string[];
}

export const WordCloudDisplay = ({ words }: WordCloudDisplayProps) => {
  // Count word frequency
  const wordFrequency = useMemo(() => {
    const freq = new Map<string, number>();
    words.forEach(word => {
      const normalized = word.toLowerCase().trim();
      if (normalized) {
        freq.set(normalized, (freq.get(normalized) || 0) + 1);
      }
    });
    return Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30); // Top 30 words
  }, [words]);

  const maxCount = Math.max(...wordFrequency.map(([_, count]) => count), 1);

  const getFontSize = (count: number) => {
    const minSize = 0.875; // text-sm
    const maxSize = 3; // text-5xl
    return minSize + ((count / maxCount) * (maxSize - minSize));
  };

  const getColor = (count: number) => {
    const intensity = count / maxCount;
    if (intensity > 0.7) return 'text-primary';
    if (intensity > 0.4) return 'text-primary/70';
    return 'text-primary/40';
  };

  return (
    <Card className="p-6 bg-muted/30">
      <div className="flex flex-wrap gap-3 items-center justify-center min-h-[200px]">
        {wordFrequency.map(([word, count], index) => (
          <span
            key={index}
            className={`font-bold ${getColor(count)} transition-all hover:scale-110 cursor-default`}
            style={{ fontSize: `${getFontSize(count)}rem` }}
            title={`${count} mention${count > 1 ? 's' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>
    </Card>
  );
};
