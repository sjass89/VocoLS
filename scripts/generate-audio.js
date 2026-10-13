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
  // Provided by user
  lucy: 'r5iFzIytiA1rzjhWFCjW', // Lucy - Friendly, Relaxed & Thoughtful
  josh: 'ZoiZ8fuDWInAcwPXaVeq', // Josh - Warm, Smooth and Steady

  // Premade fallbacks (in case account is on Free tier where Library voices require Starter/credits)
  sarah: 'EXAVITQu4vr4xnSDxMaL', // Sarah - Mature, Reassuring, Professional
  will: 'bIHbv24MWmeRgasZH58o',  // Will - Relaxed Optimist
  eric: 'cjVigY5qzO86Huf0OWal',  // Eric - Smooth, Trustworthy
};

// Scenario script data
const SCENARIOS = [
  {
    id: 'medsync',
    lines: [
      { speaker: 'agent', text: 'Hi Sarah, this is Ava calling from Main Street Pharmacy to confirm your thirty-day refill. For your privacy, can you confirm your date of birth?' },
      { speaker: 'patient', text: 'Sure, it is March fourteenth, nineteen sixty-two.' },
      { speaker: 'agent', text: 'Thank you. Your lisinopril and atorvastatin are both due. I can also sync your metformin so all three are ready on Thursday, October twenty-fourth. Does that work?' },
      { speaker: 'patient', text: 'Oh, that would be so much easier. Can I pick up after five?' },
      { speaker: 'agent', text: 'Absolutely. Pickup is set for five thirty on Thursday, and I just texted you a confirmation. Anything else I can help with?' },
      { speaker: 'patient', text: 'No, that is everything. Thank you!' },
    ],
  },
  {
    id: 'chronic',
    lines: [
      { speaker: 'agent', text: 'Hi James, this is Ava from Riverside Health Pharmacy with your monthly check-in. Is now a good time?' },
      { speaker: 'patient', text: 'Yeah, I have a minute.' },
      { speaker: 'agent', text: 'Great. Our records show your Jardiance refill is about ten days overdue. Have you been able to take it as prescribed?' },
      { speaker: 'patient', text: 'Honestly, I have been stretching it out. It got expensive this year.' },
      { speaker: 'agent', text: 'I understand, and thank you for telling me. You may qualify for a manufacturer copay card that could lower your cost significantly. Would you like me to apply it and have your pharmacist follow up?' },
      { speaker: 'patient', text: 'Yes, please. That would really help.' },
    ],
  },
  {
    id: 'specialty',
    lines: [
      { speaker: 'agent', text: 'Hello Maria, this is Ava from Apex Specialty Pharmacy. Your next Humira shipment is ready to schedule. First, have you had any new infections, fevers, or hospital visits since your last dose?' },
      { speaker: 'patient', text: 'No, nothing like that. I have been feeling good.' },
      { speaker: 'agent', text: 'Wonderful. It ships cold-chain and needs a signature. Can someone be home this Wednesday between ten and two?' },
      { speaker: 'patient', text: 'Wednesday works. I work from home.' },
      { speaker: 'agent', text: 'Perfect. Your delivery is confirmed for Wednesday, with a twenty-five dollar copay on file. You will get a tracking text this evening.' },
    ],
  },
  {
    id: 'escalation',
    lines: [
      { speaker: 'agent', text: 'Hi Robert, this is Ava from Main Street Pharmacy. Your warfarin refill is ready for pickup today.' },
      { speaker: 'patient', text: 'Thanks. Quick question though, my dentist just prescribed me ibuprofen. Is that okay to take with it?' },
      { speaker: 'agent', text: 'That is an important question, and our pharmacist should answer it directly. I am transferring you now and sharing a summary so you will not need to repeat yourself.' },
    ],
  },
];

function fetchTTS(text, voiceId, modelId = 'eleven_multilingual_v2') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${voiceId}`,
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
  console.log('--- VocoRx ElevenLabs Audio Generator ---');
  console.log('Using API Key:', API_KEY ? `${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}` : 'MISSING');
  console.log(`Voices: Agent=Lucy (${VOICES.lucy}), Patient=Josh (${VOICES.josh})\n`);

  const outDir = path.resolve(__dirname, '../public/audio/scenarios');
  fs.mkdirSync(outDir, { recursive: true });

  const manifest = {};

  for (const scenario of SCENARIOS) {
    console.log(`\n▶ Generating Scenario: ${scenario.id}`);
    const scenarioDir = path.join(outDir, scenario.id);
    fs.mkdirSync(scenarioDir, { recursive: true });

    manifest[scenario.id] = [];

    for (let i = 0; i < scenario.lines.length; i++) {
      const line = scenario.lines[i];
      const filename = `line-${i}.mp3`;
      const filePath = path.join(scenarioDir, filename);
      const publicPath = `/audio/scenarios/${scenario.id}/${filename}`;

      const voiceId = line.speaker === 'agent' ? VOICES.lucy : VOICES.josh;
      const speakerName = line.speaker === 'agent' ? 'Lucy (Ava)' : 'Josh (Patient)';

      console.log(`  [${i + 1}/${scenario.lines.length}] ${speakerName}: "${line.text.slice(0, 45)}..."`);

      try {
        const audioBuffer = await fetchTTS(line.text, voiceId);
        fs.writeFileSync(filePath, audioBuffer);
        console.log(`     ✓ Saved ${filePath} (${audioBuffer.length} bytes)`);

        manifest[scenario.id].push({
          index: i,
          speaker: line.speaker,
          audioUrl: publicPath,
          bytes: audioBuffer.length,
        });

        // Small pause between requests to prevent rate limit spikes
        await new Promise((r) => setTimeout(r, 350));
      } catch (err) {
        console.error(`     ✗ Failed: ${err.message}`);
        throw err;
      }
    }
  }

  const manifestPath = path.join(outDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nAll done! Manifest written to ${manifestPath}`);
}

main().catch((err) => {
  console.error('\nGeneration aborted:', err.message);
  process.exit(1);
});
