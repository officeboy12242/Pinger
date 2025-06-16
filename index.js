const axios = require('axios');

const SEARCH_TERM = 'RADIO%202003';
const URLS = [
  { url: `https://pronoob-drive.vercel.app/?name=${SEARCH_TERM}`, type: 'vercel' },
  { url: `https://pronoobdrive.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' },
  { url: `https://pronoobdrive-piya-ja-c-ky-j-a-sp-e-r-9.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' },
  { url: `https://pronoobdrive-7w2p.onrender.com/Sct?search=${SEARCH_TERM}`, type: 'render' }
];

// Delay utility
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function checkSequentially() {
  console.log(`\n🔍 [${new Date().toLocaleString()}] Checking mirrors...\n`);

  for (const { url, type } of URLS) {
    try {
      const res = await axios.get(url);
      const result = res.data;

      if (type === 'render') {
        if (res.status === 200) {
          console.log(`✅ [${new Date().toLocaleString()}] 200 OK from: ${url}`);
        }
      } else if (type === 'vercel') {
        if (
          result &&
          result.data &&
          Array.isArray(result.data.data) &&
          result.data.data.length > 0
        ) {
          console.log(`✅ [${new Date().toLocaleString()}] Found result from: ${url}`);
          console.log(JSON.stringify(result.data.data, null, 2));
        } else {
          console.log(`❌ [${new Date().toLocaleString()}] No result from: ${url}`);
        }
      }

    } catch (err) {
      console.error(`⚠️ [${new Date().toLocaleString()}] Error at ${url}:`, err.message);
    }

    await sleep(1000); // Optional delay between requests
  }

  console.log(`\n⏳ Waiting 5 minutes for next round...\n`);
  setTimeout(checkSequentially, 5 * 60 * 1000);
}

// Start the checker
checkSequentially();
