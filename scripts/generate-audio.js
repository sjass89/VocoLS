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
  josh: 'ZoiZ8fuDWInAcwPXaVeq', // Josh - Patient
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
// `speechText`: sent to ElevenLabs for natural cadence & exact medical phonetic pronunciation
const SCENARIOS = [
  {
    id: 'medsync',
    title: 'MedSync Batch Call',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi Sarah, this is Ava calling from Main Street Pharmacy to confirm your thirty-day refill. For your privacy, can you confirm your date of birth?',
        speechText: 'Hi Sarah! This is Ava calling from Main Street Pharmacy to confirm your thirty-day refill. For your privacy, can you please confirm your date of birth?',
      },
      {
        speaker: 'patient',
        text: 'Sure, it is March fourteenth, nineteen sixty-two.',
        speechText: 'Sure, it is March fourteenth, nineteen sixty-two.',
      },
      {
        speaker: 'agent',
        text: 'Thank you. Your lisinopril and atorvastatin are both due. I can also sync your metformin so all three are ready on Thursday, October twenty-fourth. Does that work?',
        // Phonetic respelling ensures medical perfection: lye-SIN-oh-pril and uh-TOR-va-stat-in
        speechText: 'Thank you. Your lye-SIN-oh-pril and uh-TOR-va-stat-in are both due. I can also sync your met-FOR-min, so all three are ready on Thursday, October twenty-fourth. Does that work?',
      },
      {
        speaker: 'patient',
        text: 'Oh, that would be so much easier. Can I pick up after five?',
        speechText: 'Oh, that would be so much easier! Can I pick up after five?',
      },
      {
        speaker: 'agent',
        text: 'Absolutely. Pickup is set for five thirty on Thursday, and I just texted you a confirmation. Anything else I can help with?',
        speechText: 'Absolutely! Pickup is set for five thirty on Thursday, and I just texted you a confirmation. Anything else I can help with today?',
      },
      {
        speaker: 'patient',
        text: 'No, that is everything. Thank you!',
        speechText: 'No, that is everything. Thank you!',
      },
    ],
  },
  {
    id: 'chronic',
    title: 'Chronic Care Check-in',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi James, this is Ava from Riverside Health Pharmacy with your monthly check-in. Is now a good time?',
        speechText: 'Hi James! This is Ava from Riverside Health Pharmacy with your monthly check-in. Is now a good time?',
      },
      {
        speaker: 'patient',
        text: 'Yeah, I have a minute.',
        speechText: 'Yeah, I have a minute.',
      },
      {
        speaker: 'agent',
        text: 'Great. Our records show your Jardiance refill is about ten days overdue. Have you been able to take it as prescribed?',
        // JAR-dee-anss for Jardiance
        speechText: 'Great. Our records show your JAR-dee-anss refill is about ten days overdue. Have you been able to take it as prescribed?',
      },
      {
        speaker: 'patient',
        text: 'Honestly, I have been stretching it out. It got expensive this year.',
        speechText: 'Honestly, I have been stretching it out. It got expensive this year.',
      },
      {
        speaker: 'agent',
        text: 'I understand, and thank you for telling me. You may qualify for a manufacturer copay card that could lower your cost significantly. Would you like me to apply it and have your pharmacist follow up?',
        speechText: 'I understand, and thank you for telling me. You may qualify for a manufacturer co-pay card that could lower your cost significantly. Would you like me to apply it and have your pharmacist follow up?',
      },
      {
        speaker: 'patient',
        text: 'Yes, please. That would really help.',
        speechText: 'Yes, please. That would really help!',
      },
    ],
  },
  {
    id: 'specialty',
    title: 'Specialty Refill Confirmation',
    lines: [
      {
        speaker: 'agent',
        text: 'Hello Maria, this is Ava from Apex Specialty Pharmacy. Your next Humira shipment is ready to schedule. First, have you had any new infections, fevers, or hospital visits since your last dose?',
        // hyoo-MEER-uh for Humira
        speechText: 'Hello Maria! This is Ava from Apex Specialty Pharmacy. Your next hyoo-MEER-uh shipment is ready to schedule. First, have you had any new infections, fevers, or hospital visits since your last dose?',
      },
      {
        speaker: 'patient',
        text: 'No, nothing like that. I have been feeling good.',
        speechText: 'No, nothing like that. I have been feeling good.',
      },
      {
        speaker: 'agent',
        text: 'Wonderful. It ships cold-chain and needs a signature. Can someone be home this Wednesday between ten and two?',
        speechText: 'Wonderful! It ships cold-chain and needs a signature. Can someone be home this Wednesday between ten and two?',
      },
      {
        speaker: 'patient',
        text: 'Wednesday works. I work from home.',
        speechText: 'Wednesday works. I work from home.',
      },
      {
        speaker: 'agent',
        text: 'Perfect. Your delivery is confirmed for Wednesday, with a twenty-five dollar copay on file. You will get a tracking text this evening.',
        speechText: 'Perfect! Your delivery is confirmed for Wednesday, with a twenty-five dollar co-pay on file. You will get a tracking text this evening.',
      },
    ],
  },
  {
    id: 'escalation',
    title: 'Clinical Escalation Triage',
    lines: [
      {
        speaker: 'agent',
        text: 'Hi Robert, this is Ava from Main Street Pharmacy. Your warfarin refill is ready for pickup today.',
        // WAR-fer-in for Warfarin
        speechText: 'Hi Robert! This is Ava from Main Street Pharmacy. Your WAR-fer-in refill is ready for pickup today.',
      },
      {
        speaker: 'patient',
        text: 'Thanks. Quick question though, my dentist just prescribed me ibuprofen. Is that okay to take with it?',
        // eye-byoo-PRO-fen for Ibuprofen
        speechText: 'Thanks. Quick question though, my dentist just prescribed me eye-byoo-PRO-fen. Is that okay to take with it?',
      },
      {
        speaker: 'agent',
        text: 'That is an important question, and our pharmacist should answer it directly. I am transferring you now and sharing a summary so you will not need to repeat yourself.',
        speechText: 'That is an important question, and our pharmacist should answer it directly. I am transferring you now and sharing a summary so you will not need to repeat yourself.',
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
  // Parse command line arguments: --scenario <id>
  const targetScenarioArg = process.argv.indexOf('--scenario');
  const targetScenarioId = targetScenarioArg !== -1 ? process.argv[targetScenarioArg + 1] : null;

  console.log('--- VocoRx ElevenLabs Audio Generator (Model: eleven_v4) ---');
  console.log('Using API Key:', API_KEY ? `${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}` : 'MISSING');
  console.log(`Agent Profile: Lucy (speed: ${VOICE_PROFILES.agent.settings.speed}x, stability: ${VOICE_PROFILES.agent.settings.stability})`);
  console.log(`Patient Profile: Josh (speed: ${VOICE_PROFILES.patient.settings.speed}x, stability: ${VOICE_PROFILES.patient.settings.stability})`);
  if (targetScenarioId) {
    console.log(`Targeting single scenario: "${targetScenarioId}"`);
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

      console.log(`  [${i + 1}/${scenario.lines.length}] ${profile.name} (${profile.settings.speed}x): "${speechToSynthesize.slice(0, 50)}..."`);

      try {
        const audioBuffer = await fetchTTS(speechToSynthesize, profile, 'eleven_v4');
        fs.writeFileSync(filePath, audioBuffer);
        console.log(`     ✓ Saved ${filePath} (${audioBuffer.length} bytes)`);

        manifest[scenario.id].push({
          index: i,
          speaker: line.speaker,
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
