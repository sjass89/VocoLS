import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow local system CA certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Load environment variables from .env.local or .env if present
function loadEnv() {
  for (const envFile of ['.env.local', '.env']) {
    const fullPath = path.resolve(__dirname, '..', envFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const line of content.split('\n')) {
        const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)?\s*$/);
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = (match[2] || '').trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }
}
loadEnv();

// API Key (from env or CLI argument)
const API_KEY = process.env.ELEVENLABS_API_KEY || process.argv[2];

// Strictly only the 2 approved voice IDs (Female Agent + Male Insured/Contact)
export const VOICES = {
  female_agent: 'OYq3gdwlWVVaI8ECjSk1', // Briseida - Clear, Warm (Ava Tracking Agent)
  male_insured: 'PXMcl9zGUnc9w7DofLWk', // Mark Vale - Male Insured / Contact
};

// Voice settings tuned for smooth, natural, conversational cadence with zero exclamation-point spikes
const VOICE_PROFILES = {
  agent: {
    voiceId: VOICES.female_agent,
    name: 'Briseida (Ava Agent - OYq3gdwlWVVaI8ECjSk1)',
    settings: {
      stability: 0.55,
      similarity_boost: 0.80,
      speed: 1.08,
    },
  },
  patient: {
    voiceId: VOICES.male_insured,
    name: 'Mark Vale (Male Insured/Contact - PXMcl9zGUnc9w7DofLWk)',
    settings: {
      stability: 0.55,
      similarity_boost: 0.80,
      speed: 1.05,
    },
  },
};

// Smooth, natural scripts that roll off the tongue — no exclamation points, woman agent + man insured/contact every time
const SCENARIOS = [
  {
    id: 'ls-persistence',
    title: 'Persistent Quarterly Check-In (Attempt #7)',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi Walter, this is Ava calling with a quick check-in on your policy. Are you still living on Maple Avenue?',
        speechText: 'Hi Walter, this is Ava calling with a quick check-in on your policy. Are you still living on Maple Avenue?',
      },
      {
        speaker: 'patient',
        text: 'Oh, hi Ava. Yes, sorry I missed your earlier calls, I am still at two fourteen Maple.',
        speechText: 'Oh, hi Ava. Yes, sorry I missed your earlier calls, I am still at two fourteen Maple.',
      },
      {
        speaker: 'agent',
        text: 'No problem at all. Just to keep your file current, could you confirm your date of birth, and are you still seeing Dr. Alan Miller?',
        speechText: 'No problem at all. Just to keep your file current, could you confirm your date of birth, and are you still seeing Doctor Alan Miller?',
      },
      {
        speaker: 'patient',
        text: 'It is March fourteenth, nineteen forty-eight, and yes, Dr. Miller is still my regular doctor.',
        speechText: 'It is March fourteenth, nineteen forty-eight, and yes, Doctor Miller is still my regular doctor.',
      },
      {
        speaker: 'agent',
        text: 'Thank you. Have you had any hospital stays in the last three months, and is your son Mark still your best backup contact?',
        speechText: 'Thank you. Have you had any hospital stays in the last three months, and is your son Mark still your best backup contact?',
      },
      {
        speaker: 'patient',
        text: 'No hospital visits at all, and yes, Mark is still the best backup.',
        speechText: 'No hospital visits at all, and yes, Mark is still the best backup.',
      },
    ],
  },
  {
    id: 'ls-followup',
    title: 'Hospitalization & Dynamic Follow-Up Drill',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi Arthur, this is Ava calling for your quarterly policy update. Have you had any hospital visits or seen any new doctors since July?',
        speechText: 'Hi Arthur, this is Ava calling for your quarterly policy update. Have you had any hospital visits, or seen any new doctors since July?',
      },
      {
        speaker: 'patient',
        text: 'Yeah, I actually spent three days in the hospital last month because I was short of breath.',
        speechText: 'Yeah, I actually spent three days in the hospital last month because I was short of breath.',
      },
      {
        speaker: 'agent',
        text: 'I am glad you are back home and doing better. Which hospital did you go to, and what did the doctors say caused it?',
        speechText: 'I am glad you are back home and doing better. Which hospital did you go to, and what did the doctors say caused it?',
      },
      {
        speaker: 'patient',
        text: 'I went to Sarasota Memorial, and they told me it was mild atrial fibrillation.',
        speechText: 'I went to Sarasota Memorial, and they told me it was mild atrial fibrillation.',
      },
      {
        speaker: 'agent',
        text: 'Thank you for sharing that. Did they set you up with a new cardiologist, or put you on any new daily medications?',
        speechText: 'Thank you for sharing that. Did they set you up with a new cardiologist, or put you on any new daily medications?',
      },
      {
        speaker: 'patient',
        text: 'Yes, I am seeing Dr. Sanjay Patel at Gulf Coast Cardiology now, and he started me on Eliquis.',
        speechText: 'Yes, I am seeing Doctor Sanjay Patel at Gulf Coast Cardiology now, and he started me on Eliquis.',
      },
    ],
  },
  {
    id: 'ls-cascade',
    title: 'Designated Contact Cascade Outreach',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi Michael, this is Ava calling because you are listed as the backup contact for your dad, Richard, and we could not reach his home line. How is he doing?',
        speechText: 'Hi Michael, this is Ava calling because you are listed as the backup contact for your dad, Richard, and we could not reach his home line. How is he doing?',
      },
      {
        speaker: 'patient',
        text: 'Hi Ava, Dad had hip surgery three weeks ago, so he is staying at a rehab center right now.',
        speechText: 'Hi Ava, Dad had hip surgery three weeks ago, so he is staying at a rehab center right now.',
      },
      {
        speaker: 'agent',
        text: 'We hope his recovery goes smoothly. What is the name of the rehab center, and which surgeon did the procedure?',
        speechText: 'We hope his recovery goes smoothly. What is the name of the rehab center, and which surgeon did the procedure?',
      },
      {
        speaker: 'patient',
        text: 'He is at Pinecrest Skilled Nursing in Scottsdale, and Dr. Rebecca Vance at the Mayo Clinic did the surgery.',
        speechText: 'He is at Pinecrest Skilled Nursing in Scottsdale, and Doctor Rebecca Vance at the Mayo Clinic did the surgery.',
      },
      {
        speaker: 'agent',
        text: 'Got it, thank you. Do you know when he will be heading back home, or should we check in with you again next month?',
        speechText: 'Got it, thank you. Do you know when he will be heading back home, or should we check in with you again next month?',
      },
    ],
  },
  {
    id: 'ls-escalation',
    title: 'Sensitive Event & Claims Triage',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi David, this is Ava calling for a quick check-in on your father Robert’s policy. How has Robert been doing?',
        speechText: 'Hi David, this is Ava calling for a quick check-in on your father Robert’s policy. How has Robert been doing?',
      },
      {
        speaker: 'patient',
        text: 'Hi, this is David. I am sorry to tell you this, but my father passed away last Tuesday.',
        speechText: 'Hi, this is David. I am sorry to tell you this, but my father passed away last Tuesday.',
      },
      {
        speaker: 'agent',
        text: 'David, I am so sorry for your loss. Let me connect you right now with our senior claims specialist who can gently walk your family through the next steps.',
        speechText: 'David, I am so sorry for your loss. Let me connect you right now with our senior claims specialist, who can gently walk your family through the next steps.',
      },
    ],
  },
];

function fetchTTS(text, voiceProfile, modelId = 'eleven_v4') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: voiceProfile.settings.stability,
        similarity_boost: voiceProfile.settings.similarity_boost,
        speed: voiceProfile.settings.speed,
        style: 0.0,
        use_speaker_boost: true,
      },
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${voiceProfile.voiceId}`,
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(buffer);
        } else {
          try {
            const errJson = JSON.parse(buffer.toString('utf-8'));
            reject(new Error(`ElevenLabs API Error (${res.statusCode}): ${errJson.detail?.message || JSON.stringify(errJson)}`));
          } catch {
            reject(new Error(`ElevenLabs API Error (${res.statusCode}): ${buffer.toString('utf-8')}`));
          }
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const targetScenarioArg = process.argv.indexOf('--scenario');
  const targetScenarioId = targetScenarioArg !== -1 ? process.argv[targetScenarioArg + 1] : null;

  console.log('--- VocoLS ElevenLabs Audio Generator (Model: eleven_v4) ---');
  console.log('Using API Key:', API_KEY ? `${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}` : 'MISSING');
  console.log(`Agent Profile: ${VOICE_PROFILES.agent.name}`);
  console.log(`Insured/Contact Profile: ${VOICE_PROFILES.patient.name}`);
  console.log('');

  const outDir = path.resolve(__dirname, '../public/audio/scenarios');
  fs.mkdirSync(outDir, { recursive: true });

  const manifestPath = path.join(outDir, 'manifest.json');
  let manifest = {};

  const scenariosToRun = targetScenarioId
    ? SCENARIOS.filter((s) => s.id === targetScenarioId)
    : SCENARIOS;

  for (const scenario of scenariosToRun) {
    console.log(`\n▶ Generating Scenario: ${scenario.id} (${scenario.title})`);
    const scenarioDir = path.join(outDir, scenario.id);
    fs.mkdirSync(scenarioDir, { recursive: true });

    manifest[scenario.id] = [];

    for (let i = 0; i < scenario.lines.length; i++) {
      const line = scenario.lines[i];
      const filename = `line-${i}.mp3`;
      const filePath = path.join(scenarioDir, filename);
      const publicPath = `/audio/scenarios/${scenario.id}/${filename}`;

      const profile = line.speaker === 'agent' ? VOICE_PROFILES.agent : VOICE_PROFILES.patient;
      const speechToSynthesize = line.speechText || line.text;
      console.log(`  [${i + 1}/${scenario.lines.length}] ${profile.name}: "${speechToSynthesize.slice(0, 58)}..."`);

      try {
        const audioBuffer = await fetchTTS(speechToSynthesize, profile, 'eleven_v4');
        fs.writeFileSync(filePath, audioBuffer);
        console.log(`     ✓ Saved ${filePath} (${audioBuffer.length} bytes) using voice ${profile.voiceId}`);

        manifest[scenario.id].push({
          index: i,
          speaker: line.speaker,
          voiceId: profile.voiceId,
          audioUrl: publicPath,
          bytes: audioBuffer.length,
          model: 'eleven_v4',
        });

        await new Promise((r) => setTimeout(r, 350));
      } catch (err) {
        console.error(`     ✗ Failed: ${err.message}`);
        throw err;
      }
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nAll done! Manifest updated at ${manifestPath}`);
}

main().catch((err) => {
  console.error('\nGeneration aborted:', err.message);
  process.exit(1);
});
