
"use client";

import Link from 'next/link';
import PageWrapper from '@/components/page-wrapper';
import FlipCard from '@/components/flip-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const scams = [
    {
        headline: "Massive Financial Losses Reported",
        content: "Indians lost over ₹22,845 crore to cybercriminals in 2024 (a 206% increase), with over 3.6 million financial fraud incidents reported on national portals."
    },
    {
        headline: "'Digital Arrest' Scams Proliferate",
        content: "This scam remains prevalent. A doctor lost ₹19 crore, and a gang was jailed for life for a scam that defrauded 108 people of over ₹100 crore."
    },
    {
        headline: "Investment & Stock Market Fraud",
        content: "Major losses continue from fake trading apps. A Hyderabad resident lost ₹1.4 crore, and the ED attached ₹7 crore from the 'ShareHash' app scam."
    },
    {
        headline: "Cooperative Bank Loan Fraud",
        content: "The ED is investigating an alleged ₹200 crore loan fraud at the Andaman Nicobar State Cooperative Bank involving illegal loans to shell companies."
    },
    {
        headline: "Clone Trading App Scams Surge",
        content: "A significant rise in clone trading app scams in Karnataka has led to losses of ₹903 crores by mid-2024, targeting unsuspecting investors."
    }
];

export default function LatestScamsPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center w-full space-y-8">
        <Card className="w-full max-w-5xl text-center bg-card/80 border-primary/20">
            <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary tracking-tighter">Latest Scams in India</CardTitle>
                <CardDescription className="text-lg text-foreground/80 font-body">Click or tap on the cards to reveal more details about recent cybercrime events.</CardDescription>
            </CardHeader>
        </Card>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {scams.slice(0, 3).map((scam, index) => (
                <FlipCard key={index} headline={scam.headline} content={scam.content} />
            ))}
        </div>
         <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {scams.slice(3, 5).map((scam, index) => (
                <FlipCard key={index + 3} headline={scam.headline} content={scam.content} />
            ))}
        </div>

        <div className="flex justify-center mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/conclusion">
                    Next: Conclusion <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
