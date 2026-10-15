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

// Strictly only the 3 approved voice IDs
export const VOICES = {
  female_agent: 'OYq3gdwlWVVaI8ECjSk1', // Briseida - Clear, Warm (Ava Tracking Agent)
  male_insured: 'PXMcl9zGUnc9w7DofLWk', // Mark Vale - Male Insured / Contact
  female_insured: 'lnnkVRtB3hSBA22O4kcA', // Lina - Female Insured / Contact
};

// Voice settings for natural conversational pace, immediate 3-second hook, and clarity
const VOICE_PROFILES = {
  agent: {
    voiceId: VOICES.female_agent,
    name: 'Briseida (Ava Agent - OYq3gdwlWVVaI8ECjSk1)',
    settings: {
      stability: 0.45,
      similarity_boost: 0.82,
      speed: 1.12, // Crisp, warm, natural pace that hooks the listener immediately
    },
  },
  patient_male: {
    voiceId: VOICES.male_insured,
    name: 'Mark Vale (Male Insured/Contact - PXMcl9zGUnc9w7DofLWk)',
    settings: {
      stability: 0.50,
      similarity_boost: 0.80,
      speed: 1.06,
    },
  },
  patient_female: {
    voiceId: VOICES.female_insured,
    name: 'Lina (Female Insured/Contact - lnnkVRtB3hSBA22O4kcA)',
    settings: {
      stability: 0.50,
      similarity_boost: 0.80,
      speed: 1.06,
    },
  },
};

// Scenarios with 3-second anti-hangup hooks & concise follow-up questions for ElevenLabs V4
const SCENARIOS = [
  {
    id: 'ls-persistence',
    title: 'Persistent Quarterly Check-In (Attempt #7)',
    patientGender: 'female', // Evelyn M.
    lines: [
      {
        speaker: 'agent',
        text: 'Evelyn? Hi, it’s Ava with your 30-second policy check-in—nothing is wrong! Are you still at 214 Maple Avenue?',
        speechText: 'Evelyn? Hi! It’s Ava with your thirty-second policy check-in—nothing is wrong! Are you still at two fourteen Maple Avenue?',
      },
      {
        speaker: 'patient',
        text: 'Oh, hi Ava! Yes, sorry I missed your earlier calls. I am still at 214 Maple.',
        speechText: 'Oh, hi Ava! Yes, sorry I missed your earlier calls. I am still at two fourteen Maple.',
      },
      {
        speaker: 'agent',
        text: 'No problem at all! Just to verify for your file, can you confirm your birth date, and is Dr. Alan Miller still your primary doctor?',
        speechText: 'No problem at all! Just to verify for your file, can you confirm your birth date, and is Doctor Alan Miller still your primary doctor?',
      },
      {
        speaker: 'patient',
        text: 'March fourteenth, nineteen forty-eight. And yes, I still see Dr. Miller.',
        speechText: 'March fourteenth, nineteen forty-eight. And yes, I still see Doctor Miller.',
      },
      {
        speaker: 'agent',
        text: 'Any hospital stays in the last ninety days, and is your daughter Rachel still your best backup contact?',
        speechText: 'Any hospital stays in the last ninety days, and is your daughter Rachel still your best backup contact?',
      },
      {
        speaker: 'patient',
        text: 'No hospital visits, and yes, Rachel is still the best backup.',
        speechText: 'No hospital visits, and yes, Rachel is still the best backup.',
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
        text: 'Arthur? Hi, it’s Ava calling to keep your policy file active—it only takes 30 seconds. Have you had any hospital visits since July?',
        speechText: 'Arthur? Hi! It’s Ava calling to keep your policy file active—it only takes thirty seconds. Have you had any hospital visits since July?',
      },
      {
        speaker: 'patient',
        text: 'Yeah, actually I was in the hospital for three days last month for shortness of breath.',
        speechText: 'Yeah, actually I was in the hospital for three days last month for shortness of breath.',
      },
      {
        speaker: 'agent',
        text: 'Glad you’re home safe, Arthur. Which hospital was that, and what diagnosis did the doctors give you?',
        speechText: 'Glad you’re home safe, Arthur. Which hospital was that, and what diagnosis did the doctors give you?',
      },
      {
        speaker: 'patient',
        text: 'Sarasota Memorial. They said it was mild atrial fibrillation.',
        speechText: 'Sarasota Memorial. They said it was mild ay-tree-uhl fib-rih-LAY-shun.',
      },
      {
        speaker: 'agent',
        text: 'Got it. Did they refer you to a new cardiologist or start any new daily medications?',
        speechText: 'Got it. Did they refer you to a new cardiologist, or start any new daily medications?',
      },
      {
        speaker: 'patient',
        text: 'Yes, Dr. Sanjay Patel at Gulf Coast Cardiology, and he put me on Eliquis.',
        speechText: 'Yes, Doctor Sanjay Patel at Gulf Coast Cardiology, and he put me on EL-ih-kwiss.',
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
        text: 'Claire? Hi, it’s Ava—you’re listed as the backup contact for your dad, Walter, and we missed him at home. Is he doing okay?',
        speechText: 'Claire? Hi! It’s Ava—you’re listed as the backup contact for your dad, Walter, and we missed him at home. Is he doing okay?',
      },
      {
        speaker: 'patient',
        text: 'Hi, yes—Dad had hip surgery three weeks ago, so he is temporarily in rehab.',
        speechText: 'Hi, yes—Dad had hip surgery three weeks ago, so he is temporarily in rehab.',
      },
      {
        speaker: 'agent',
        text: 'Wishing him a fast recovery! What is the name of the rehab center, and who was his orthopedic surgeon?',
        speechText: 'Wishing him a fast recovery! What is the name of the rehab center, and who was his orthopedic surgeon?',
      },
      {
        speaker: 'patient',
        text: 'Pinecrest Skilled Nursing in Scottsdale, and Dr. Rebecca Vance at Mayo Clinic did the surgery.',
        speechText: 'Pinecrest Skilled Nursing in Scottsdale, and Doctor Rebecca Vance at Mayo Clinic did the surgery.',
      },
      {
        speaker: 'agent',
        text: 'Thanks, Claire. When is he expected back home, and should we check in with you next month?',
        speechText: 'Thanks, Claire. When is he expected back home, and should we check in with you next month?',
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
        text: 'Hi David, it’s Ava calling for a quick check-in on your father Robert’s policy. How is Robert doing?',
        speechText: 'Hi David! It’s Ava calling for a quick check-in on your father Robert’s policy. How is Robert doing?',
      },
      {
        speaker: 'patient',
        text: 'This is David. I’m sorry to tell you this, but my father passed away last Tuesday.',
        speechText: 'This is David. I’m sorry to tell you this, but my father passed away last Tuesday.',
      },
      {
        speaker: 'agent',
        text: 'David, I am so deeply sorry for your loss. Let me connect you right now with our Senior Claims Specialist to gently help your family—please hold one moment.',
        speechText: 'David, I am so deeply sorry for your loss. Let me connect you right now with our Senior Claims Specialist to gently help your family—please hold one moment.',
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
  const onlyPatient = process.argv.includes('--only-patient');

  console.log('--- VocoLS ElevenLabs Audio Generator (Model: eleven_v4) ---');
  console.log('Using API Key:', API_KEY ? `${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}` : 'MISSING');
  console.log(`Agent Profile: ${VOICE_PROFILES.agent.name}`);
  console.log(`Male Profile: ${VOICE_PROFILES.patient_male.name}`);
  console.log(`Female Profile: ${VOICE_PROFILES.patient_female.name}`);
  console.log('');

  const outDir = path.resolve(__dirname, '../public/audio/scenarios');
  fs.mkdirSync(outDir, { recursive: true });

  const manifestPath = path.join(outDir, 'manifest.json');
  let manifest = {};

  const scenariosToRun = targetScenarioId
    ? SCENARIOS.filter((s) => s.id === targetScenarioId)
    : SCENARIOS;

  if (scenariosToRun.length === 0) {
    console.error(`Error: Scenario "${targetScenarioId}" not found.`);
    process.exit(1);
  }

  for (const scenario of scenariosToRun) {
    console.log(`\n▶ Generating Scenario: ${scenario.id} (${scenario.title}) - Gender: ${scenario.patientGender}`);
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
        manifest[scenario.id].push({
          index: i,
          speaker: line.speaker,
          voiceId: profile.voiceId,
          audioUrl: publicPath,
          bytes: fs.existsSync(filePath) ? fs.statSync(filePath).size : 0,
          model: 'eleven_v4',
        });
        continue;
      }

      const speechToSynthesize = line.speechText || line.text;
      console.log(`  [${i + 1}/${scenario.lines.length}] ${profile.name}: "${speechToSynthesize.slice(0, 55)}..."`);

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
