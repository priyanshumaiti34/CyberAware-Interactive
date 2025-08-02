
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';

interface FlipCardProps {
    headline: string;
    content: string;
}

const FlipCard = ({ headline, content }: FlipCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="perspective-1000 w-full h-64" onClick={() => setIsFlipped(!isFlipped)}>
            <div
                className={cn(
                    'relative w-full h-full transform-style-3d transition-transform duration-700',
                    isFlipped ? 'rotate-y-180' : ''
                )}
            >
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden">
                    <Card className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-secondary/30 backdrop-blur-sm border-secondary-foreground/20 shadow-lg hover:shadow-primary/30 transition-shadow rounded-xl">
                        <CardContent className="space-y-4">
                            <h3 className="text-xl font-bold text-secondary-foreground" style={{ textShadow: '0 0 5px rgba(255,255,255,0.7)' }}>{headline}</h3>
                            <div className="flex items-center justify-center text-sm text-secondary-foreground/70" style={{ textShadow: '0 0 5px rgba(255,255,255,0.7)' }}>
                                <RefreshCcw className="w-4 h-4 mr-2 animate-spin [animation-duration:3s]" />
                                Click to flip
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <Card className="w-full h-full flex flex-col justify-center p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg rounded-xl">
                        <CardContent>
                            <p className="text-sm md:text-base text-foreground/90 font-body" style={{ textShadow: '0 0 3px rgba(255,255,255,0.5)' }}>{content}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
