const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function download(urlStr, destFile) {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(urlStr);
      const mod = u.protocol === 'https:' ? https : http;
      mod.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = new URL(res.headers.location, urlStr).href;
          return download(nextUrl, destFile).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${urlStr}`));
        }
        const stream = fs.createWriteStream(destFile);
        res.pipe(stream);
        stream.on('finish', () => resolve(true));
        stream.on('error', reject);
      }).on('error', reject);
    } catch (e) { reject(e); }
  });
}

async function checkBatTrang() {
  const candidates = [
    { name: 'vnet', url: 'https://2sao.vietnamnetjsc.vn/images/2021/08/17/12/54/anh-chup-man-hinh-2021-08-17-luc-001416-1629137129528645375542.png' },
    { name: 'wiki10', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Bat-Trang-Ceramic-Village10.jpg/1280px-Bat-Trang-Ceramic-Village10.jpg' },
    { name: 'wiki8', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Bat-Trang-Ceramic-Village8.jpg/1280px-Bat-Trang-Ceramic-Village8.jpg' },
    { name: 'wiki7', url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Bat-Trang-Ceramic-Village7.jpg/1280px-Bat-Trang-Ceramic-Village7.jpg' }
  ];

  for (const c of candidates) {
    const f = path.join(__dirname, `../src/assets/images/test-bat-trang-${c.name}.jpg`);
    try {
      await download(c.url, f);
      console.log(`✅ ${c.name}: ${fs.statSync(f).size} bytes`);
    } catch(e) {
      console.log(`❌ ${c.name}: ${e.message}`);
    }
  }
}
checkBatTrang();
