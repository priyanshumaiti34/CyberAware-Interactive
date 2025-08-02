
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TypingAnimation } from './typing-animation';
import { PlayCircle, Mic, PhoneCall, KeyRound, ArrowRight, ShieldCheck, MessageSquareMore, Eye } from 'lucide-react';
import { AttackStep } from '@/app/attack-simulation/page';
import { simulateVoiceClone } from '@/app/actions';
import Link from 'next/link';

interface HackerTerminalProps {
  currentStep: AttackStep;
  onNextStep: () => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  otp: string | null;
  setOtp: (otp: string) => void;
}

const stepsContent = {
  initial: { buttonText: "Start Attack", icon: PlayCircle },
  cloning: { command: 'python voice_clone.py --target_voice=victim_sample.wav' },
  cloned: { output: (analysis: string) => analysis, buttonText: "Request OTP", icon: MessageSquareMore },
  otp_sent: { output: 'OTP request sent to victim\'s registered number.', buttonText: "Call Victim", icon: PhoneCall },
  calling: { command: './execute_call.sh --target_number=+91-9735609436 --play_audio=cloned_voice.mp3' },
  call_sent: { output: 'Call initiated. Awaiting victim response...'},
  otp_received: { output: (otp: string) => `OTP Received: ${otp}`, buttonText: "Execute Transaction", icon: KeyRound },
  transaction_complete: { command: (otp: string) => `curl -X POST https://sbi.example.com/api/transfer -d '{"otp": "${otp}", "amount": 50000}'`, output: 'Transaction successful.'},
  end: { output: 'Attack successful. Session terminated.', buttonText: "Next: Steganography", icon: Eye },
};

export default function HackerTerminal({ currentStep, onNextStep, isTyping, setIsTyping, otp, setOtp }: HackerTerminalProps) {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [voiceCloneAnalysis, setVoiceCloneAnalysis] = useState('');
  const prompt = <span className="text-green-400">hacker@kali:~$ </span>;
  
  const handleNext = () => {
    // This button handles all manual progression.
    onNextStep();
  }

  useEffect(() => {
    if (currentStep === 'initial') {
      setLines([]);
      setVoiceCloneAnalysis('');
      setOtp('254016'); // Set the fixed OTP
      return;
    }

    if (currentStep === 'cloning' && lines.length < 1) {
      const commandText = stepsContent.cloning.command;
      const key = `cmd-cloning-${Math.random()}`;
      setIsTyping(true);
      setLines(prev => [...prev, 
        <div key={key} className="flex">
          {prompt}
          <TypingAnimation text={commandText} onCompleted={() => {
              setIsTyping(false);
              simulateVoiceClone({voiceSampleUrl: 'victim_sample.wav'}).then(res => {
                  setVoiceCloneAnalysis(res.analysis);
                  onNextStep(); // -> cloned
              });
          }} />
        </div>
      ]);
    }

    if (currentStep === 'cloned') {
        if (voiceCloneAnalysis && lines.length < 2) {
             setLines(prev => [...prev, <div key={`out-cloned-${Math.random()}`} className="text-gray-300">{voiceCloneAnalysis}</div>]);
        }
    }

    if (currentStep === 'otp_sent') {
      const outputText = stepsContent.otp_sent.output;
      const key = `out-otp_sent-${Math.random()}`;
      // Prevent adding duplicate lines if this step is revisited
      const alreadyHasLine = lines.some(line => (line as any)?.key?.startsWith('out-otp_sent-'));
      if (!alreadyHasLine) {
         setLines(prev => [...prev, <div key={key} className="text-gray-300">{outputText}</div>]);
      }
    }
    
    if (currentStep === 'calling') {
       const commandText = stepsContent.calling.command;
       const key = `cmd-calling-${Math.random()}`;
       if (lines.some(l => (l as any)?.key === key)) return;

       setIsTyping(true);
       setLines(prev => [...prev, 
         <div key={key} className="flex">
           {prompt}
           <TypingAnimation text={commandText} onCompleted={() => {
             setIsTyping(false);
           }} />
         </div>
       ]);
    }

    if(currentStep === 'call_sent') {
      const outputText = stepsContent.call_sent.output;
      const key = `out-call_sent-${Math.random()}`;
      if (lines.some(l => (l as any)?.key?.startsWith('out-call_sent'))) return;
      setLines(prev => [...prev, <div key={key} className="text-gray-300">{outputText}</div>]);
    }

    if(currentStep === 'otp_received') {
        const outputText = stepsContent.otp_received.output(otp!);
        const key = `out-otp_received-${Math.random()}`;
        if (lines.some(l => (l as any)?.key?.startsWith('out-otp_received'))) return;
        setLines(prev => [...prev, <div key={key} className="text-yellow-400 animate-pulse">{outputText}</div>]);
    }

    if(currentStep === 'transaction_complete') {
        const commandText = stepsContent.transaction_complete.command(otp!);
        const key = `cmd-transaction_complete-${Math.random()}`;
        if (lines.some(l => (l as any)?.key?.startsWith('cmd-transaction_complete'))) return;
        
        setIsTyping(true);
        setLines(prev => [...prev, 
          <div key={key} className="flex">
            {prompt}
            <TypingAnimation text={commandText} onCompleted={() => {
              const outputText = stepsContent.transaction_complete.output;
              setLines(p => [...p, <div key={`out-tx-${Math.random()}`} className="text-gray-300">{outputText}</div>]);
              setIsTyping(false);
              onNextStep(); // -> end
            }} />
          </div>
        ]);
    }
    
    if(currentStep === 'end') {
        const outputText = stepsContent.end.output;
        const key = `out-end-${Math.random()}`;
        if (lines.some(l => (l as any)?.key?.startsWith('out-end'))) return;
        setLines(prev => [...prev, <div key={key} className="text-gray-300">{outputText}</div>]);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, voiceCloneAnalysis, otp]);
  
  const stepConfig = stepsContent[currentStep as keyof typeof stepsContent] || {};
  const buttonVisible = 'buttonText' in stepConfig && stepConfig.buttonText;
  
  const isButtonDisabled = isTyping || !buttonVisible || ['cloning', 'calling', 'call_sent', 'transaction_complete'].includes(currentStep);

  return (
    <div className="w-full">
      <Card className="bg-black border-gray-700 font-code text-white shadow-lg shadow-primary/20">
        <CardHeader>
          <CardTitle className="text-gray-300">Hacker Terminal</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]  overflow-y-auto p-4 space-y-2 bg-gray-900/50 rounded-b-lg">
          {lines}
          {isTyping && <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></div>}
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-start">
        {buttonVisible && currentStep !== 'end' && (
            <Button onClick={handleNext} disabled={isButtonDisabled} className="bg-accent hover:bg-accent/90">
              <stepConfig.icon className="mr-2" />
              {stepConfig.buttonText}
            </Button>
        )}
        {buttonVisible && currentStep === 'end' && (
             <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/steganography-challenge">
                   <stepConfig.icon className="mr-2" />
                   {stepConfig.buttonText}
                </Link>
             </Button>
        )}
      </div>
    </div>
  );
}
