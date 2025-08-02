
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, User, MapPin, ShoppingCart, Lock, ShieldAlert, ArrowRight, Briefcase, Heart, Home, School, Cake } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AnalysisStep = 'initial' | 'start' | 'profile' | 'location' | 'shopping' | 'breach' | 'final';

const stepsConfig = {
    initial: {
        risk: 0,
        riskLabel: 'Minimal',
        riskColor: 'bg-green-500',
        narrator: "Every time we go online, we leave tiny digital crumbs. Alone, they seem harmless. But what happens when they're collected?",
    },
    start: {
        risk: 0,
        riskLabel: 'Minimal',
        riskColor: 'bg-green-500',
        narrator: "Let's start by analyzing a typical user's publicly available data.",
    },
    profile: {
        risk: 15,
        riskLabel: 'Low',
        riskColor: 'bg-yellow-500',
        narrator: "Just from public social media, someone can learn your basic info, who your friends are, and what you're interested in. It's the first piece of the puzzle.",
        dataPoints: { name: 'Aryan Sharma', age: '16', interests: 'Gaming, Coding, Football' }
    },
    location: {
        risk: 30,
        riskLabel: 'Moderate',
        riskColor: 'bg-orange-500',
        narrator: "Every geo-tagged photo or check-in maps your routine—your home, your school. This makes you predictable to those who want to find you, or even target you offline.",
        dataPoints: { home: 'Midnapore, West Bengal', school: 'Vidyasagar Shishu Niketan' }
    },
    shopping: {
        risk: 55,
        riskLabel: 'Elevated',
        riskColor: 'bg-red-500',
        narrator: "Your online purchases and browsing habits reveal your financial status and your desires. This is gold for targeted scams or phishing.",
        dataPoints: { recent_purchase: 'Latest Graphics Card', financial_status: 'High Purchase Intent' }
    },
    breach: {
        risk: 80,
        riskLabel: 'High Danger!',
        riskColor: 'bg-red-700',
        narrator: "If your data is part of a data breach, criminals can piece together a shockingly complete picture: your full identity, contacts, and financial details.",
        dataPoints: { email: 'aryan.s******@email.com', phone: '+91-9735609436' }
    },
    final: {
        risk: 100,
        riskLabel: 'Target Acquired',
        riskColor: 'bg-purple-700 animate-pulse',
        narrator: "See how seemingly small pieces of information, when combined, create a complete, exploitable digital identity? This is your Digital Footprint.",
        dataPoints: {}
    }
};

const interactionSteps: { id: AnalysisStep, label: string, source: string, icon: React.ElementType }[] = [
    { id: 'profile', label: 'Reveal: Social Media Profile', source: 'Accessing Public Social Media Profile...', icon: User },
    { id: 'location', label: 'Reveal: Geo-tagged Photos / Check-ins', source: 'Analyzing Location Data...', icon: MapPin },
    { id: 'shopping', label: 'Reveal: Shopping Habits / Browser History', source: 'Compiling Purchase & Browsing History...', icon: ShoppingCart },
    { id: 'breach', label: 'Reveal: Leaked Data / Public Records', source: 'Cross-referencing Data Breaches...', icon: Lock },
];

const DataPoint = ({ icon: Icon, label, value, position, delay }: { icon: React.ElementType, label: string, value: string | null, position: string, delay: number }) => (
    <AnimatePresence>
        {value && (
             <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay } }}
                className={`absolute ${position}`}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex flex-col items-center text-center cursor-pointer">
                                <div className="p-3 bg-primary/10 rounded-full border-2 border-primary/30">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <span className="mt-1 text-xs font-medium text-foreground/80">{label}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{value}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function DigitalFootprintPage() {
  const [step, setStep] = useState<AnalysisStep>('initial');
  const [profileData, setProfileData] = useState<Record<string, any>>({
    name: null, age: null, interests: null,
    home: null, school: null,
    recent_purchase: null, financial_status: null,
    email: null, phone: null
  });
  const [completedActions, setCompletedActions] = useState<AnalysisStep[]>([]);
  const [sourceText, setSourceText] = useState('');

  const handleNextStep = (nextStep: AnalysisStep) => {
    const config = stepsConfig[nextStep];
    const action = interactionSteps.find(s => s.id === nextStep);
    
    if (action) {
      setSourceText(action.source);
      setTimeout(() => {
        setStep(nextStep);
        setProfileData(prev => ({ ...prev, ...config.dataPoints }));
        setCompletedActions(prev => [...prev, nextStep]);
        setSourceText('');
      }, 1500);
    } else {
        setStep(nextStep);
    }
  };

  const currentConfig = stepsConfig[step];
  const risk = completedActions.reduce((acc, s) => Math.max(acc, stepsConfig[s]?.risk || 0), 0);
  const finalRiskConfig = Object.values(stepsConfig).slice().reverse().find(s => risk >= s.risk) || stepsConfig.initial;
  const showFinalButton = completedActions.length === interactionSteps.length;

  const renderCentralVisualization = () => (
     <div className="w-[340px] h-[340px] bg-primary/5 rounded-full relative flex items-center justify-center border-2 border-primary/10 transition-all duration-500"
        style={{
            boxShadow: `0 0 ${risk / 5}px hsl(var(--primary)), 0 0 ${risk / 2.5}px hsl(var(--primary) / 0.5) inset`,
            transition: 'box-shadow 1s ease-in-out',
        }}
     >
        <div className="text-center">
             <User className="w-20 h-20 mx-auto rounded-full bg-primary/10 text-primary p-4 border-2 border-primary/20" />
             <h3 className="text-2xl font-bold text-primary mt-2">Target</h3>
             <p className="text-sm text-foreground/70">Digital Identity</p>
        </div>

        {/* Top */}
        <DataPoint icon={User} label="Name" value={profileData.name} position="top-0 left-1/2 -translate-x-1/2 -translate-y-[20%]" delay={0.1} />
        
        {/* Top-Right */}
        <DataPoint icon={Cake} label="Age" value={profileData.age} position="top-[15%] right-[15%] translate-x-[10%] -translate-y-[10%]" delay={0.2} />

        {/* Middle-Right */}
        <DataPoint icon={Heart} label="Interests" value={profileData.interests} position="top-1/2 right-0 -translate-y-1/2 translate-x-[20%]" delay={0.3} />
        
        {/* Bottom-Right */}
        <DataPoint icon={School} label="School" value={profileData.school} position="bottom-[15%] right-[15%] translate-x-[10%] translate-y-[10%]" delay={0.4} />

        {/* Bottom */}
        <DataPoint icon={Home} label="Home" value={profileData.home} position="bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%]" delay={0.5} />

        {/* Bottom-Left */}
        <DataPoint icon={ShoppingCart} label="Purchases" value={profileData.recent_purchase} position="bottom-[15%] left-[15%] -translate-x-[10%] translate-y-[10%]" delay={0.6} />

        {/* Middle-Left */}
        <DataPoint icon={Briefcase} label="Finance" value={profileData.financial_status} position="top-1/2 left-0 -translate-y-1/2 -translate-x-[20%]" delay={0.7} />
        
        {/* Top-Left */}
        <DataPoint icon={Lock} label="Breaches" value={profileData.email} position="top-[15%] left-[15%] -translate-x-[10%] -translate-y-[10%]" delay={0.8} />


     </div>
  );

  if (step === 'initial') {
    return (
         <PageWrapper>
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8">
                <Card className="max-w-3xl bg-card/80 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-4xl lg:text-5xl font-bold text-primary tracking-tighter">The Digital Footprint Analyzer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-xl text-foreground/80 font-body">{currentConfig.narrator}</p>
                        <Button onClick={() => handleNextStep('start')} size="lg" className="bg-accent hover:bg-accent/90">Start Analyzing</Button>
                    </CardContent>
                </Card>
            </div>
         </PageWrapper>
    );
  }

  return (
    <PageWrapper>
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center space-y-6">
            <Card className="w-full text-center bg-card/80 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary tracking-tighter">Your Digital Footprint</CardTitle>
                    <CardDescription className="text-lg text-foreground/80 font-body">{stepsConfig[completedActions[completedActions.length - 1] || 'start'].narrator}</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6 w-full items-start">
                {/* Left Column - Actions & Source */}
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    <Card className="bg-card/80 border-primary/20">
                        <CardHeader>
                            <CardTitle>Data Sources</CardTitle>
                            <CardDescription>Click to reveal data from each source.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {interactionSteps.map(action => (
                                <Button
                                    key={action.id}
                                    onClick={() => handleNextStep(action.id)}
                                    disabled={completedActions.includes(action.id) || sourceText !== ''}
                                    variant="outline"
                                    className="w-full justify-start gap-3"
                                >
                                    {completedActions.includes(action.id) ? 
                                        <Check className="text-green-500" /> : 
                                        <action.icon />
                                    }
                                    {action.label}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                    <AnimatePresence>
                    {sourceText && (
                        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                            <Card className="bg-secondary/50">
                                <CardContent className="p-4 text-center">
                                    <p className="font-code animate-pulse">{sourceText}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                
                {/* Center Column - Visualization */}
                <div className="lg:col-span-1 flex justify-center items-start py-8">
                   {renderCentralVisualization()}
                </div>

                {/* Right Column - Risk Meter & Next Step */}
                <div className="lg:col-span-1 flex flex-col space-y-4">
                    <Card className="bg-card/80 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ShieldAlert />Risk Meter</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={risk} className="h-4 transition-all duration-1000" indicatorClassName={finalRiskConfig.riskColor} />
                            <div className={`text-center text-2xl font-bold tracking-tighter ${finalRiskConfig.riskColor.replace('bg-', 'text-')}`}>
                                {finalRiskConfig.riskLabel}
                            </div>
                        </CardContent>
                    </Card>
                     {showFinalButton && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
                                <Link href="/attack-simulation">
                                    Begin the Attack Simulation <ArrowRight className="ml-2" />
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    </PageWrapper>
  );
}
