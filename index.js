const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const SEARCH_TERM = 'RADIO%202003';

const URLS = [
  { url: `https://pronoob-drive.vercel.app/?name=${SEARCH_TERM}`, type: 'vercel' },
  { url: `https://pronoobdrive.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' },
  { url: `https://pronoobdrive-piya-ja-c-ky-j-a-sp-e-r-9.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' },
  { url: `https://pronoobdrive-7w2p.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' },
  { url: `https://pronoobdrive-swaraj.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' }
];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function runCheckerLoop() {
  while (true) {
    console.log(`\n🔍 [${new Date().toLocaleString()}] Starting round of checks...`);

    for (const { url, type } of URLS) {
      try {
        const response = await axios.get(url);
        const result = response.data;

        if (type === 'render' && response.status === 200) {
          console.log(`✅ [${new Date().toLocaleString()}] 200 OK from: ${url}`);
        }

        if (
          type === 'vercel' &&
          result &&
          result.data &&
          Array.isArray(result.data.data) &&
          result.data.data.length > 0
        ) {
          console.log(`✅ [${new Date().toLocaleString()}] Result from: ${url}`);
          console.log(JSON.stringify(result.data.data, null, 2));
        } else if (type === 'vercel') {
          console.log(`❌ [${new Date().toLocaleString()}] No result from: ${url}`);
        }

      } catch (err) {
        console.error(`⚠️ [${new Date().toLocaleString()}] Error at ${url}:`, err.message);
      }

      await sleep(1000); // small delay between requests
    }

    console.log(`⏳ Waiting 5 minutes before next round...\n`);
    await sleep(3 * 60 * 1000); // 5 minutes delay
  }
}

// Express server to keep Render app alive
app.get('/', (req, res) => {
  res.send('✅ Pinger app is running!');
});

app.listen(PORT, () => {
  console.log(`🌐 Express server live at http://localhost:${PORT}`);
});

// Start the background checker
runCheckerLoop();
