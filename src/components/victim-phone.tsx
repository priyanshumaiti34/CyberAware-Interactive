
"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AttackStep } from '@/app/attack-simulation/page';
import { cn } from '@/lib/utils';


interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface VictimPhoneProps {
    currentStep: AttackStep;
    onCallAccepted: () => void;
    onCallEnded: () => void;
    otp: string | null;
    isHackerTyping: boolean;
}

export default function VictimPhone({ currentStep, onCallAccepted, onCallEnded, otp, isHackerTyping }: VictimPhoneProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [callTime, setCallTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout>();
  const [isCallActive, setIsCallActive] = useState(false);

  const handleAcceptCall = () => {
    onCallAccepted(); // This will advance the app step
    setIsCallActive(true);
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const handleEndCall = () => {
    // Prevent multiple triggers
    if (!isCallActive && currentStep !== 'calling') return;
    
    setIsCallActive(false);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    // Only trigger the next step if the call was active
    if (currentStep === 'call_sent' || currentStep === 'calling') {
      onCallEnded();
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (isCallActive) {
      callTimerRef.current = setInterval(() => {
        setCallTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      setCallTime(0);
      clearInterval(callTimerRef.current);
    }
    return () => clearInterval(callTimerRef.current);
  }, [isCallActive]);

  // Audio ended effect
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleAudioEnd = () => {
        if(isCallActive || currentStep === 'calling' || currentStep === 'call_sent') {
            handleEndCall();
        }
    };
    
    audioElement.addEventListener('ended', handleAudioEnd);
    return () => {
        audioElement.removeEventListener('ended', handleAudioEnd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallActive, currentStep]); 
  
  useEffect(() => {
    if (currentStep === 'otp_sent' && otp && messages.length === 0) {
      setMessages([
          { id: 1, sender: 'VM-SBIOTP', text: `OTP for transaction is ${otp}. Do not share this with anyone for security reasons. - SBI`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }
    if (currentStep === 'end' && messages.length === 1) {
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'DM-SBIBNK',
                text: 'A/c XX121 debited for INR 50,000.00 on 30-Jul-24. Avl Bal: INR 23,192.15. Not you? Call 1800-11-2211. -SBI',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 500);
    }
     if (currentStep === 'initial') {
      setMessages([]);
      setIsCallActive(false);
    }
    if (currentStep !== 'calling' && currentStep !== 'call_sent') {
        setIsCallActive(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isHackerTyping, otp]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(1, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  
  const renderScreen = () => {
    const isRinging = currentStep === 'calling';
    const isInCall = isCallActive && currentStep === 'call_sent';

    if (isRinging) {
      // Incoming call screen
      return (
          <div className="bg-gray-800 text-white w-full h-full rounded-[24px] flex flex-col items-center justify-center p-6 space-y-6">
              <p className="text-lg animate-pulse">Incoming Call...</p>
              <Avatar className="w-24 h-24 border-4 border-white/50">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90njWYMRazQv6EQ7b_xjSllRudrXQK9817A&s" alt="Papa" data-ai-hint="older man portrait"/>
                  <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-bold">Papa</h2>
              <div className="flex w-full justify-around pt-12">
                  <Button onClick={handleAcceptCall} size="icon" className="bg-green-500 hover:bg-green-600 rounded-full w-16 h-16">
                      <Phone className="w-8 h-8" />
                  </Button>
                  <Button onClick={handleEndCall} size="icon" className="bg-red-500 hover:bg-red-600 rounded-full w-16 h-16">
                      <PhoneOff className="w-8 h-8" />
                  </Button>
              </div>
          </div>
      )
    }

    if(isInCall) {
      // Active call screen with transcript
      return (
           <div className="bg-gray-800 text-white w-full h-full rounded-[24px] flex flex-col p-4 space-y-4">
              <div className="flex flex-col items-center pt-4">
                  <Avatar className="w-16 h-16 border-2 border-green-500/80">
                      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90njWYMRazQv6EQ7b_xjSllRudrXQK9817A&s" alt="Papa" data-ai-hint="older man portrait"/>
                      <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mt-2">Papa</h2>
                  <p className="text-sm text-green-400">{formatTime(callTime)}</p>
              </div>
              <div className={cn("flex-grow p-3 space-y-3 text-sm overflow-y-auto", 
                "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]")}>
                  <div>
                      <p className="font-bold text-blue-400">Papa:</p>
                      <p>"Aryan? Listen carefully, very urgent! I'm stuck with a payment, bank app glitched. It sent an OTP to your phone by mistake, I need it now!"</p>
                  </div>
                  <div>
                      <p className="font-bold text-gray-300">Aryan:</p>
                      <p>"Papa? What happened? My phone? Uh, wait, okay..."</p>
                  </div>
                   <div>
                      <p className="font-bold text-blue-400">Papa:</p>
                      <p>"Yes! Check your messages! It's from SBI. Quick, the payment is timing out! Just tell me the code, fast!"</p>
                  </div>
                   <div>
                      <p className="font-bold text-gray-300">Aryan:</p>
                      <p>"Okay, okay... It's 254016. Two-five-four-zero-one-six."</p>
                  </div>
              </div>
              <div className="flex w-full justify-center pt-2">
                   <Button onClick={handleEndCall} size="icon" className="bg-red-500 hover:bg-red-600 rounded-full w-16 h-16">
                       <PhoneOff className="w-8 h-8" />
                   </Button>
               </div>
           </div>
      )
    }

    // Default view: Messages
    return (
        <div className="bg-gray-900 w-full h-full rounded-[24px] flex flex-col">
            <div className="bg-gray-950 p-3 rounded-t-[24px] text-center text-white">
                <p className="font-bold">Messages</p>
            </div>
            <CardContent className="p-2 flex-grow overflow-y-auto space-y-3">
            {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col items-start">
                     <div className="bg-gray-800 p-3 rounded-lg max-w-[85%] self-start shadow">
                         <p className="text-sm font-bold text-primary mb-1">{msg.sender}</p>
                         <p className="text-sm text-gray-200">{msg.text}</p>
                         <p className="text-xs text-gray-400 text-right mt-1">{msg.time}</p>
                     </div>
                 </div>
            ))}
            </CardContent>
            <div className="p-2 border-t border-gray-700">
                <input type="text" placeholder="iMessage" className="w-full bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"/>
            </div>
        </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full max-w-[320px] mx-auto">
        <Card className="aspect-[9/19.5] bg-gray-900 border-8 border-gray-700 rounded-[40px] p-2 shadow-2xl shadow-primary/20">
          {renderScreen()}
        </Card>
      </div>
      <audio ref={audioRef} src="/audio/conversation.wav" preload="auto" />
    </div>
  );
}
