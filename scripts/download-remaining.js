const https = require('https');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'src', 'assets', 'images');

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
    https.get(urlStr, { headers: { 'User-Agent': 'SmartTourismApp/1.0 (contact@smarttourism.vn)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destFile).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const s = fs.createWriteStream(destFile);
      res.pipe(s);
      s.on('finish', () => resolve(true));
      s.on('error', reject);
    }).on('error', reject);
  });
}

const map = {
  'kieu-ky': 'File:Boy Buddha statue, Restored Le dynasty, 17th-18th century, crimson and gilded wood - National Museum of Vietnamese History - Hanoi, Vietnam - DSC05664.JPG',
  'chang-son-moc': 'File:Jade Emperor Pagoda - Wood carving.jpg',
  'thach-xa': 'File:Chùa Tây Phương.JPG',
  'dai-bai': 'File:Dong Son bronze drum.jpg',
  'ngu-xa': 'File:Door carved with dragons, Thần-quang Pagoda, 17th-century.jpg',
  'nghia-dong': 'File:Aodai-nonla-crop.jpg'
};

async function run() {
  for (const [id, title] of Object.entries(map)) {
    const dest = path.join(imgDir, `${id}.jpg`);
    const u = await getWikiUrl(title);
    console.log(`${id} => ${u}`);
    if (u) {
      await downloadImage(u, dest);
      console.log(`✅ [${id}.jpg] downloaded: ${fs.statSync(dest).size} bytes`);
    }
  }
}

run();
