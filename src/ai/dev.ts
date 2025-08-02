import { config } from 'dotenv';
config({ path: `.env.local` });

import '@/ai/flows/steganography-flow.ts';
import '@/ai/flows/voice-cloning-flow.ts';
import '@/ai/flows/narrative-flow.ts';
