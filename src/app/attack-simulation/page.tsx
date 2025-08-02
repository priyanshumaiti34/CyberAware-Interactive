
"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from "@/components/page-wrapper";
import HackerTerminal from "@/components/hacker-terminal";
import VictimPhone from "@/components/victim-phone";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = ['initial', 'cloning', 'cloned', 'otp_sent', 'calling', 'call_sent', 'otp_received', 'transaction_complete', 'end'] as const;
export type AttackStep = typeof steps[number];

const narrativeContext = {
    initial: "The simulation is ready. The attacker has gathered the victim's information and is prepared to launch the attack.",
    cloning: "First, the attacker uses a public voice sample from digital-footprints to create an AI-powered clone of a trusted person's voice—in this case, the victim's father.",
    cloned: "The voice model is ready. The AI has analyzed the pitch, tone, and speech patterns to create a realistic digital copy of the target's voice.",
    otp_sent: "To initiate the fraudulent transaction, the attacker first triggers an OTP request from the bank's system, which is sent to the victim's phone.",
    calling: "Now that the OTP is on the victim's phone, the attacker spoofs the father's number and initiates the call to create urgency and manipulate the victim into revealing the code.",
    call_sent: "The call is now ringing on the victim's phone. Seeing 'Papa' calling, the victim is much more likely to trust the scammer.",
    otp_received: "The victim, believing their father is in trouble, has been manipulated into sharing the One-Time Password (OTP) sent by the bank.",
    transaction_complete: "With the OTP, the attacker can now authorize a fraudulent transaction from the victim's bank account. This is the final step.",
    end: "The attack is complete. The funds have been transferred, and the attacker will now cover their tracks. The simulation is over."
};


export default function AttackSimulationPage() {
    const [currentStep, setCurrentStep] = useState<AttackStep>('initial');
    const [isTyping, setIsTyping] = useState(false);
    const [otp, setOtp] = useState<string | null>(null);
    const router = useRouter();

    const handleNextStep = useCallback(() => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            const nextStep = steps[currentIndex + 1];
            setCurrentStep(nextStep);
        } else {
            router.push('/cyber-cell');
        }
    }, [currentStep, router]);
    
    const onCallAccepted = () => {
        // When the user accepts the call on the phone
        if (currentStep === 'calling') {
            setCurrentStep('call_sent');
        }
    }

    const onCallEnded = () => {
        // When the call audio finishes or user hangs up
        if(currentStep === 'call_sent') {
             setCurrentStep('otp_received');
        }
    }

    return (
        <PageWrapper>
            <div className="grid xl:grid-cols-5 gap-8 items-start justify-center">
                <div className="space-y-4 xl:col-span-3">
                    <HackerTerminal 
                        currentStep={currentStep} 
                        onNextStep={handleNextStep}
                        isTyping={isTyping}
                        setIsTyping={setIsTyping}
                        otp={otp}
                        setOtp={setOtp}
                    />
                    <Card className="bg-secondary/50 border-secondary mt-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-secondary-foreground"><Bot/>Narrator's Context</CardTitle>
                        </CardHeader>
                        <CardContent className="text-secondary-foreground/80">
                            <p>{narrativeContext[currentStep]}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-4 xl:col-span-2">
                     <VictimPhone 
                        currentStep={currentStep}
                        onCallAccepted={onCallAccepted}
                        onCallEnded={onCallEnded}
                        otp={otp}
                        isHackerTyping={isTyping}
                    />
                     
                     
                </div>
            </div>
        </PageWrapper>
    )
}
