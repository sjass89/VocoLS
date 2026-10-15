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

// Voice configurations
export const VOICES = {
  lucy: 'r5iFzIytiA1rzjhWFCjW', // Lucy - Ava Agent
  josh: 'ZoiZ8fuDWInAcwPXaVeq', // Josh - Male Patient (James, Robert)
  cassidy: '56AoDkrOh6qfVPDXZ7Pt', // Cassidy - Female Patient (Sarah, Maria)
};

// Voice settings for natural conversational pace and medical accuracy
const VOICE_PROFILES = {
  agent: {
    voiceId: VOICES.lucy,
    name: 'Lucy (Ava)',
    settings: {
      stability: 0.44, // Expressive, natural inflection
      similarity_boost: 0.82,
      speed: 1.14, // Brisk, natural pharmacy professional pace (fixes slow speech)
    },
  },
  patient_male: {
    voiceId: VOICES.josh,
    name: 'Josh (Male Patient)',
    settings: {
      stability: 0.50,
      similarity_boost: 0.80,
      speed: 1.05,
    },
  },
  patient_female: {
    voiceId: VOICES.cassidy,
    name: 'Cassidy (Female Patient - 56AoDkrOh6qfVPDXZ7Pt)',
    settings: {
      stability: 0.50,
      similarity_boost: 0.80,
      speed: 1.05,
    },
  },
  // Backward compatibility alias
  patient: {
    voiceId: VOICES.josh,
    name: 'Josh (Patient)',
    settings: {
      stability: 0.50,
      similarity_boost: 0.80,
      speed: 1.05,
    },
  },
};

// Scenarios with phonetic pronunciation enhancements for ElevenLabs V4
// `text`: shown on screen in the transcript
// `speechText`: sent to ElevenLabs for natural cadence & exact pronunciation
const SCENARIOS = [
  {
    id: 'ls-persistence',
    title: 'Persistent Quarterly Check-In (Attempt #7)',
    patientGender: 'female', // Evelyn M.
    lines: [
      {
        speaker: 'agent',
        text: 'Hi Evelyn, this is Ava calling on behalf of Apex Life Servicing for your quarterly policy wellness check-in. We tried reaching you earlier this week—is now a good time for a few quick questions?',
        speechText: 'Hi Evelyn! This is Ava calling on behalf of Apex Life Servicing for your quarterly policy wellness check-in. We tried reaching you earlier this week—is now a good time for a few quick questions?',
      },
      {
        speaker: 'patient',
        text: 'Oh yes, sorry I missed your earlier calls. I was visiting my daughter out of state. Go right ahead.',
        speechText: 'Oh yes, sorry I missed your earlier calls. I was visiting my daughter out of state. Go right ahead.',
      },
      {
        speaker: 'agent',
        text: 'Thank you, Evelyn! For your security, could you please confirm your date of birth and verify if you are still residing at 214 Maple Avenue?',
        speechText: 'Thank you, Evelyn! For your security, could you please confirm your date of birth, and verify if you are still residing at two fourteen Maple Avenue?',
      },
      {
        speaker: 'patient',
        text: 'Yes, March fourteenth, nineteen forty-eight, and yes, I am still at 214 Maple Avenue.',
        speechText: 'Yes, March fourteenth, nineteen forty-eight, and yes, I am still at two fourteen Maple Avenue.',
      },
      {
        speaker: 'agent',
        text: 'Wonderful. Have you had any hospital stays, new diagnoses, or changes to your primary care physician, Dr. Alan Miller, in the past ninety days? And is your daughter Rachel still the best secondary contact for your file?',
        speechText: 'Wonderful. Have you had any hospital stays, new diagnoses, or changes to your primary care physician, Doctor Alan Miller, in the past ninety days? And is your daughter Rachel still the best secondary contact for your file?',
      },
      {
        speaker: 'patient',
        text: 'No hospital visits at all, I still see Dr. Miller every six months, and yes, Rachel’s number is still the best backup.',
        speechText: 'No hospital visits at all, I still see Doctor Miller every six months, and yes, Rachel’s number is still the best backup.',
      },
    ],
  },
  {
    id: 'ls-followup',
    title: 'Hospitalization & Dynamic Follow-Up Drill',
    patientGender: 'male', // Arthur R.
    lines: [
      {
        speaker: 'agent',
        text: 'Hello Arthur, this is Ava calling from Meridian Policy Servicing for your scheduled health and wellness check-in. Have you experienced any hospital admissions, emergency room visits, or new specialist referrals since July?',
        speechText: 'Hello Arthur! This is Ava calling from Meridian Policy Servicing for your scheduled health and wellness check-in. Have you experienced any hospital admissions, emergency room visits, or new specialist referrals since July?',
      },
      {
        speaker: 'patient',
        text: 'Yeah, actually I was in the hospital for three days last month because of some shortness of breath.',
        speechText: 'Yeah, actually I was in the hospital for three days last month because of some shortness of breath.',
      },
      {
        speaker: 'agent',
        text: 'I am glad you are back home, Arthur. To make sure our records are complete, which hospital were you admitted to, and what specific diagnosis or condition did the attending doctors identify?',
        speechText: 'I am glad you are back home, Arthur. To make sure our records are complete, which hospital were you admitted to, and what specific diagnosis or condition did the attending doctors identify?',
      },
      {
        speaker: 'patient',
        text: 'It was Sarasota Memorial Hospital. They said I had mild atrial fibrillation and fluid buildup.',
        speechText: 'It was Sarasota Memorial Hospital. They said I had mild ay-tree-uhl fib-rih-LAY-shun and fluid buildup.',
      },
      {
        speaker: 'agent',
        text: 'Thank you for sharing that. One last follow-up: were you referred to a new cardiologist, and did they prescribe any new daily medications or schedule a follow-up procedure?',
        speechText: 'Thank you for sharing that. One last follow-up: were you referred to a new cardiologist, and did they prescribe any new daily medications or schedule a follow-up procedure?',
      },
      {
        speaker: 'patient',
        text: 'Yes, I am seeing Dr. Sanjay Patel at Gulf Coast Cardiology now, and he put me on Eliquis and a low-dose diuretic.',
        speechText: 'Yes, I am seeing Doctor Sanjay Patel at Gulf Coast Cardiology now, and he put me on EL-ih-kwiss and a low-dose diuretic.',
      },
    ],
  },
  {
    id: 'ls-cascade',
    title: 'Designated Contact Cascade Outreach',
    patientGender: 'female', // Claire L.
    lines: [
      {
        speaker: 'agent',
        text: 'Hello Claire, this is Ava calling from Vanguard Life Maintenance. You are listed as the authorized designated contact for your father, Walter L., and we have been unable to reach his home line. Are you able to provide a brief update on how Walter is doing?',
        speechText: 'Hello Claire! This is Ava calling from Vanguard Life Maintenance. You are listed as the authorized designated contact for your father, Walter, and we have been unable to reach his home line. Are you able to provide a brief update on how Walter is doing?',
      },
      {
        speaker: 'patient',
        text: 'Hi, yes—Dad had a hip replacement three weeks ago, so he is temporarily staying at a rehabilitation center.',
        speechText: 'Hi, yes—Dad had a hip replacement three weeks ago, so he is temporarily staying at a rehabilitation center.',
      },
      {
        speaker: 'agent',
        text: 'Thank you for letting us know, and we wish him a smooth recovery. Could you share the name and city of the rehabilitation facility, as well as the orthopedic surgeon overseeing his care?',
        speechText: 'Thank you for letting us know, and we wish him a smooth recovery. Could you share the name and city of the rehabilitation facility, as well as the orthopedic surgeon overseeing his care?',
      },
      {
        speaker: 'patient',
        text: 'He is at Pinecrest Skilled Nursing in Scottsdale, and Dr. Rebecca Vance at Mayo Clinic performed the surgery.',
        speechText: 'He is at Pinecrest Skilled Nursing in Scottsdale, and Doctor Rebecca Vance at Mayo Clinic performed the surgery.',
      },
      {
        speaker: 'agent',
        text: 'Got it—Pinecrest Skilled Nursing in Scottsdale and Dr. Rebecca Vance. Lastly, does he have an expected discharge date back to his primary residence, or should we continue checking in with you directly?',
        speechText: 'Got it—Pinecrest Skilled Nursing in Scottsdale and Doctor Rebecca Vance. Lastly, does he have an expected discharge date back to his primary residence, or should we continue checking in with you directly?',
      },
    ],
  },
  {
    id: 'ls-escalation',
    title: 'Sensitive Event & Claims Triage',
    patientGender: 'male', // David K.
    lines: [
      {
        speaker: 'agent',
        text: 'Hello, this is Ava calling from Apex Life Servicing regarding our routine policy check-in for Robert K. Am I speaking with Robert or his designated contact, David?',
        speechText: 'Hello! This is Ava calling from Apex Life Servicing regarding our routine policy check-in for Robert. Am I speaking with Robert, or his designated contact, David?',
      },
      {
        speaker: 'patient',
        text: 'This is his son, David. I am sorry to tell you this, but my father passed away last Tuesday.',
        speechText: 'This is his son, David. I am sorry to tell you this, but my father passed away last Tuesday.',
      },
      {
        speaker: 'agent',
        text: 'David, I am so very sorry for your loss, and please accept our deepest condolences. So you do not have to navigate an automated call, I am connecting you right now with our Senior Claims Specialist who will gently assist your family with the next steps.',
        speechText: 'David, I am so very sorry for your loss, and please accept our deepest condolences. So you do not have to navigate an automated call, I am connecting you right now with our Senior Claims Specialist, who will gently assist your family with the next steps.',
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
  // Parse command line arguments: --scenario <id>, --only-patient
  const targetScenarioArg = process.argv.indexOf('--scenario');
  const targetScenarioId = targetScenarioArg !== -1 ? process.argv[targetScenarioArg + 1] : null;
  const onlyPatient = process.argv.includes('--only-patient');

  console.log('--- VocoLS ElevenLabs Audio Generator (Model: eleven_v4) ---');
  console.log('Using API Key:', API_KEY ? `${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}` : 'MISSING');
  console.log(`Agent Profile: Lucy (${VOICE_PROFILES.agent.voiceId})`);
  console.log(`Male Patient Profile: Josh (${VOICE_PROFILES.patient_male.voiceId})`);
  console.log(`Female Patient Profile: Cassidy (${VOICE_PROFILES.patient_female.voiceId})`);
  if (targetScenarioId) {
    console.log(`Targeting single scenario: "${targetScenarioId}"`);
  }
  if (onlyPatient) {
    console.log(`Mode: --only-patient (regenerating patient lines only)`);
  }
  console.log('');

  const outDir = path.resolve(__dirname, '../public/audio/scenarios');
  fs.mkdirSync(outDir, { recursive: true });

  const manifestPath = path.join(outDir, 'manifest.json');
  let manifest = {};
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    } catch {
      manifest = {};
    }
  }

  const scenariosToRun = targetScenarioId
    ? SCENARIOS.filter((s) => s.id === targetScenarioId)
    : SCENARIOS;

  if (scenariosToRun.length === 0) {
    console.error(`Error: Scenario "${targetScenarioId}" not found. Available: ${SCENARIOS.map((s) => s.id).join(', ')}`);
    process.exit(1);
  }

  for (const scenario of scenariosToRun) {
    console.log(`\n▶ Generating Scenario: ${scenario.id} (${scenario.title}) - Patient Gender: ${scenario.patientGender || 'male'}`);
    const scenarioDir = path.join(outDir, scenario.id);
    fs.mkdirSync(scenarioDir, { recursive: true });

    manifest[scenario.id] = [];

    for (let i = 0; i < scenario.lines.length; i++) {
      const line = scenario.lines[i];
      const filename = `line-${i}.mp3`;
      const filePath = path.join(scenarioDir, filename);
      const publicPath = `/audio/scenarios/${scenario.id}/${filename}`;

      let profile;
      if (line.speaker === 'agent') {
        profile = VOICE_PROFILES.agent;
      } else if (scenario.patientGender === 'female') {
        profile = VOICE_PROFILES.patient_female;
      } else {
        profile = VOICE_PROFILES.patient_male;
      }

      if (onlyPatient && line.speaker !== 'patient') {
        console.log(`  [${i + 1}/${scenario.lines.length}] Skipping agent line (only-patient mode: keeping existing file)`);
        manifest[scenario.id].push({
          index: i,
          speaker: line.speaker,
          audioUrl: publicPath,
          bytes: fs.existsSync(filePath) ? fs.statSync(filePath).size : 0,
          model: 'eleven_v4',
        });
        continue;
      }

      const speechToSynthesize = line.speechText || line.text;
      console.log(`  [${i + 1}/${scenario.lines.length}] ${profile.name} (${profile.settings.speed}x): "${speechToSynthesize.slice(0, 50)}..."`);

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

        // Small pause between requests
        await new Promise((r) => setTimeout(r, 400));
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
