const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'src', 'assets', 'images');

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
    } catch (e) {
      reject(e);
    }
  });
}

const targets = [
  {
    id: 'tam-dao',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Th%E1%BB%8B_tr%E1%BA%A5n_Tam_%C4%90%E1%BA%A3o_-_NKS.jpg/1280px-Th%E1%BB%8B_tr%E1%BA%A5n_Tam_%C4%90%E1%BA%A3o_-_NKS.jpg'
  },
  {
    id: 'dai-lai',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/H%E1%BB%93_%C4%90%E1%BA%A1i_L%E1%BA%A3i.jpg/1280px-H%E1%BB%93_%C4%90%E1%BA%A1i_L%E1%BA%A3i.jpg'
  },
  {
    id: 'ban-rom',
    url: 'https://banrom.com/wp-content/uploads/2022/10/home3.jpg'
  },
  {
    id: 'ba-vi',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Ba_V%C3%AC_National_Park%2C_foggy_road.jpg/1280px-Ba_V%C3%AC_National_Park%2C_foggy_road.jpg'
  },
  {
    id: 'bat-trang-lo-bau',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Bat-Trang-Ceramic-Village7.jpg/1280px-Bat-Trang-Ceramic-Village7.jpg'
  },
  {
    id: 'bat-trang-ngo-co',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Bat-Trang-Ceramic-Village8.jpg/1280px-Bat-Trang-Ceramic-Village8.jpg'
  }
];

async function main() {
  console.log('Downloading targeted real photos...');
  for (const t of targets) {
    const dest = path.join(imgDir, `${t.id}.jpg`);
    try {
      await download(t.url, dest);
      const sz = fs.statSync(dest).size;
      console.log(`✅ [${t.id}.jpg] (${sz} bytes) downloaded from: ${t.url}`);
    } catch (e) {
      console.warn(`❌ Failed ${t.id}: ${e.message}`);
    }
  }
}
main();
