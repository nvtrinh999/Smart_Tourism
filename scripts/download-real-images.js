const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'src', 'assets', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function getWikiUrl(title) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json';
    https.get(url, { headers: { 'User-Agent': 'SmartTourismApp/1.0 (contact@smarttourism.vn)' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query.pages)[0];
          resolve(p.imageinfo[0].thumburl || p.imageinfo[0].url);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(urlStr, destFile) {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(urlStr);
      const mod = u.protocol === 'https:' ? https : http;
      mod.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = new URL(res.headers.location, urlStr).href;
          return downloadImage(nextUrl, destFile).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${urlStr}`));
        }
        const stream = fs.createWriteStream(destFile);
        res.pipe(stream);
        stream.on('finish', () => resolve(true));
        stream.on('error', reject);
      }).on('error', reject);
    } catch (e) {
      reject(e);
    }
  });
}

// Map of real images from Wikimedia Commons & verified tourism sources
const wikiFiles = {
  'xuan-la': 'File:Making a "tò he".JPG',
  'tranh-khuc': 'File:Banh Chung in Vietnam.jpg',
  'hong-ha': 'File:Flute Kite.jpg',
  'chuon-ngo': 'File:Screen, Nguyen dynasty, 1890, wood with mother of pearl inlay, view 1 - National Museum of Vietnamese History - Hanoi, Vietnam - DSC05606.JPG',
  'quat-dong': 'File:Silk embroidery with Tree of Life motif from Vietnam.JPG'
};

async function run() {
  console.log('Downloading real images for craft villages...');

  for (const [id, wikiTitle] of Object.entries(wikiFiles)) {
    const dest = path.join(imgDir, `${id}.jpg`);
    try {
      const url = await getWikiUrl(wikiTitle);
      if (url) {
        await downloadImage(url, dest);
        console.log(`✅ [${id}.jpg] downloaded from Wikimedia: ${fs.statSync(dest).size} bytes`);
      }
    } catch (e) {
      console.warn(`⚠️ Error for ${id}:`, e.message);
    }
  }

  console.log('\nFinished initial Wikimedia downloads.');
}

run();
