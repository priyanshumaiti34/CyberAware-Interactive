
"use client";

import Link from 'next/link';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { getNarrative } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';
import BinaryRain from '@/components/binary-rain';

export default function IntroPage() {
  const [narrative, setNarrative] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNarrative = async () => {
      setIsLoading(true);
      const res = await getNarrative({ topic: 'intro' });
      if (res) {
        setNarrative(res.narrative);
      } else {
        setNarrative("Welcome to an immersive demonstration of a sophisticated cyber attack. Follow along as we dissect the process, from initial compromise to final exploitation.");
      }
      setIsLoading(false);
    };
    fetchNarrative();
  }, []);

  return (
    <PageWrapper>
      <BinaryRain />
      <div className="flex-grow flex items-center justify-center">
        <div className="space-y-8 text-center max-w-4xl relative z-10 bg-background/10 backdrop-blur-sm p-8 rounded-lg border border-primary/20">
           <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-6xl lg:text-7xl font-bold text-primary font-headline tracking-tighter text-glow">CyberAware Interactive</h1>
            <p className="text-2xl text-foreground/80 font-code text-glow">The Students of Class X</p>
            <p className="text-xl text-foreground/70 text-glow">Vidyasagar Shishu Niketan</p>
            <p className="text-lg text-foreground/60 tracking-widest font-code text-glow">presents at</p>
            <h2 className="text-5xl font-bold text-primary tracking-tighter text-glow">Spark Forward 2025</h2>
          </div>

          <Card className="bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl lg:text-4xl font-bold text-primary tracking-tighter">
                Anatomy of a Cyber Heist
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-xl text-foreground/80 font-body">
                  {narrative}
                </p>
              )}
              <div className="mt-6 flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/digital-footprint">
                    Start Demo <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
