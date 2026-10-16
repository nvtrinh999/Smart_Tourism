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
  'test-bt-market': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Bat_Trang_porcelain_marketplace_in_2014.jpg/1280px-Bat_Trang_porcelain_marketplace_in_2014.jpg',
  'test-bt-v1': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Bat-Trang-Ceramic-Village1.jpg/1280px-Bat-Trang-Ceramic-Village1.jpg',
  'test-bt-v2': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Bat-Trang-Ceramic-Village2.jpg/1280px-Bat-Trang-Ceramic-Village2.jpg',
  'test-bt-v16': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Bat-Trang-Ceramic-Village16.jpg/1280px-Bat-Trang-Ceramic-Village16.jpg',
  'test-bt-communal': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Bat_Trang_communal_house_%282018%29_02.jpg/1280px-Bat_Trang_communal_house_%282018%29_02.jpg'
};

async function run() {
  for (const [id, url] of Object.entries(map)) {
    const dest = path.join(__dirname, `../src/assets/images/${id}.jpg`);
    await download(url, dest);
    console.log(`Downloaded ${id}.jpg: ${fs.statSync(dest).size} bytes`);
  }
}
run();
