const https = require('https');
const fs = require('fs');
const path = require('path');

function download(urlStr, destFile) {
  return new Promise((resolve, reject) => {
    https.get(urlStr, { headers: { 'User-Agent': 'SmartTourismApp/1.0 (contact@smarttourism.vn)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, destFile).then(resolve).catch(reject);
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
  'test-bt-v3': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Bat-Trang-Ceramic-Village3.jpg/1280px-Bat-Trang-Ceramic-Village3.jpg',
  'test-bt-v4': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Bat-Trang-Ceramic-Village4.jpg/1280px-Bat-Trang-Ceramic-Village4.jpg',
  'test-bt-v5': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Bat-Trang-Ceramic-Village5.jpg/1280px-Bat-Trang-Ceramic-Village5.jpg'
};

async function run() {
  for (const [id, url] of Object.entries(map)) {
    const dest = path.join(__dirname, `../src/assets/images/${id}.jpg`);
    await download(url, dest);
    console.log(`Downloaded ${id}.jpg: ${fs.statSync(dest).size} bytes`);
  }
}
run();
