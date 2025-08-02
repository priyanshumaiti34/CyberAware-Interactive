
"use client";

import Link from 'next/link';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Repeat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { getNarrative } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  { name: 'Debargha', role: 'Presenter', avatarUrl: 'data:image/png;base64,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', hint: 'male student' },
    { name: 'Soumyak', role: 'Presenter', avatarUrl: 'data:image/png;base64,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', hint: 'male student' },
    { name: 'Priyanshu', role: 'Developer', avatarUrl: 'data:image/png;base64,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', hint: 'male student' },
    
];

export default function ConclusionPage() {
  const [narrative, setNarrative] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNarrative = async () => {
      setIsLoading(true);
      const res = await getNarrative({ topic: 'conclusion' });
      if (res) {
        setNarrative(res.narrative);
      } else {
        setNarrative("You have witnessed a simulated end-to-end cyber attack. This scenario highlights the importance of digital vigilance and robust security practices for individuals and organizations alike.");
      }
      setIsLoading(false);
    };
    fetchNarrative();
  }, []);

  return (
    <PageWrapper>
       <div className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Card className="bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle className="text-4xl lg:text-5xl font-bold text-primary tracking-tighter">
                Demonstration Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/intro">
                  <Repeat className="mr-2" />
                  Run Demo Again
                </Link>
              </Button>
            </CardContent>
          </Card>

           <Card className="bg-card/80 border-primary/20">
              <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary tracking-tighter">Team Members</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  {teamMembers.map(member => (
                      <div key={member.name}>
                          <Avatar className="w-20 h-20  mx-auto mb-2 border-2 border-primary/50">
                              <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.hint}/>
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-foreground/70">{member.role}</p>
                      </div>
                  ))}
              </CardContent>
          </Card>

        </div>
       </div>
    </PageWrapper>
  );
}
