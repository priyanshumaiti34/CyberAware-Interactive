
"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Wand2, Loader2, Image as ImageIcon, Info, ArrowRight } from 'lucide-react';
import { generateInitialImage } from '@/app/actions';
import { Skeleton } from './ui/skeleton';
import { embedMessageIntoImageUrl } from '@/lib/steganography-utils';
import { useToast } from '@/hooks/use-toast';

export default function SteganographyChallengeUi() {
  const [text, setText] = useState('');
  const [isGenerating, startTransition] = useTransition();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cipheredImageUrl, setCipheredImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setIsLoadingImage(true);
    setCipheredImageUrl(null);
    setText('');
    const res = await generateInitialImage();
    if (res) {
        setImageUrl(res.imageUrl);
    }
    setIsLoadingImage(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !imageUrl) return;
    
    setCipheredImageUrl(null);
    
    startTransition(async () => {
      try {
        const stegoImage = await embedMessageIntoImageUrl(imageUrl, text);
        
        if (stegoImage) {
          setCipheredImageUrl(stegoImage);
        }
      } catch (error: any) {
        console.error("Error during steganography generation:", error);
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: "Could not embed message. The image may be too small or the message too long.",
        });
      }
    });
  };

  const showResults = imageUrl && cipheredImageUrl;

  return (
    <div className="grid lg:grid-cols-1 gap-8 w-full max-w-6xl">
      <div className="space-y-8">
        <Card className="bg-card/80 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary"><Eye /> Steganography Generator</CardTitle>
            <CardDescription>Generate an image, then enter a secret message to see how it's "hidden" in plain sight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleGenerateImage} disabled={isLoadingImage || isGenerating} className="bg-primary hover:bg-primary/90">
                    {isLoadingImage ? <Loader2 className="animate-spin mr-2" /> : <ImageIcon />}
                    {isLoadingImage ? 'Generating Image...' : 'Generate New Image'}
                </Button>
             </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your secret message..."
                className="flex-grow"
                disabled={isGenerating || isLoadingImage || !imageUrl}
              />
              <Button type="submit" disabled={isGenerating || isLoadingImage || !text || !imageUrl} className="bg-accent hover:bg-accent/90">
                {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Wand2 />}
                {isGenerating ? 'Generating...' : 'Embed Secret'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {(isLoadingImage || isGenerating) && (
          <div className="grid md:grid-cols-1 gap-8">
            <Card className="bg-card/80 border-primary/20">
              <CardHeader><CardTitle className="flex items-center gap-2">
                {isLoadingImage ? 'Generating Image...' : 'Embedding Secret...'}
              </CardTitle></CardHeader>
              <CardContent className="flex justify-center">
                  <Skeleton className="w-full h-[400px] max-w-lg rounded-lg" />
              </CardContent>
            </Card>
          </div>
        )}

        {!isLoadingImage && !isGenerating && !showResults && imageUrl && (
           <Card className="bg-card/80 border-primary/20">
              <CardHeader><CardTitle>Generated Image</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center justify-center text-foreground/50">
                 <Image
                    src={imageUrl}
                    alt="AI-generated image for steganography"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full max-w-lg h-auto shadow-lg"
                 />
              </CardContent>
           </Card>
        )}

        {showResults && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                <Card className="bg-card/80 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">Original Image</CardTitle>
                        <CardDescription>A standard AI-generated image.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Image
                            src={imageUrl}
                            alt="Original image for steganography"
                            width={400}
                            height={400}
                            className="rounded-lg object-cover w-full h-auto shadow-lg"
                        />
                    </CardContent>
                </Card>
                 <Card className="bg-card/80 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">Ciphered Image</CardTitle>
                        <CardDescription>The same image, now "hiding" your secret. Can you spot the difference?</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Image
                            src={cipheredImageUrl}
                            alt="Ciphered image for steganography"
                            width={400}
                            height={400}
                            className="rounded-lg object-cover w-full h-auto shadow-lg"
                        />
                    </CardContent>
                </Card>
            </div>
             <Card className="bg-secondary/50 border-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-secondary-foreground"><Info/>Real-World Context</CardTitle>
                </CardHeader>
                <CardContent className="text-secondary-foreground/80 space-y-2">
                    <p>Steganography is the art of hiding information in plain sight. While it has legitimate uses in secure communications, it is also a technique exploited by cybercriminals.</p>
                    <p>Attackers can embed malicious code (malware) within seemingly harmless image files. When an unsuspecting user downloads or opens the image, the hidden code can execute, compromising their system. This makes it a stealthy method for distributing malware and launching attacks.</p>
                </CardContent>
            </Card>
             <div className="flex justify-center">
                 <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                     <Link href="/latest-scams">
                         Next: Latest Scams <ArrowRight className="ml-2" />
                     </Link>
                 </Button>
            </div>
          </div>
        )}

        {!isLoadingImage && !isGenerating && !imageUrl && (
            <div className="text-center text-foreground/60 py-12">
                <p>Click "Generate New Image" to start the steganography challenge.</p>
            </div>
        )}
      </div>
    </div>
  );
}
