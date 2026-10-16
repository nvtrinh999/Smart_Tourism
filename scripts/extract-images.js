const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'src', 'assets', 'images');

function getOgImage(urlStr) {
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const mod = u.protocol === 'https:' ? https : http;
      mod.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return getOgImage(new URL(res.headers.location, urlStr).href).then(resolve);
        }
        let html = '';
        res.on('data', c => { if (html.length < 150000) html += c; });
        res.on('end', () => {
          const m1 = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
          const m2 = html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
          const found = m1 ? m1[1] : (m2 ? m2[1] : null);
          resolve(found);
        });
      }).on('error', () => resolve(null));
    } catch(e) { resolve(null); }
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
    } catch (e) { reject(e); }
  });
}

const targetSites = [
  ['thach-xa', 'https://www.vietnamplus.vn/chuon-chuon-tre-thach-xa-mon-qua-doc-dao-cua-lang-que-viet-nam-post976994.vnp'],
  ['kieu-ky', 'https://www.vietnamplus.vn/lang-nghe-kieu-ky-giu-lua-nghe-quy-vang-bac-truyen-thong-post936081.vnp'],
  ['dai-bai', 'https://vietnamplus.vn/lang-nghe-duc-dong-dai-bai-net-tinh-hoa-tram-nam-cua-xu-kinh-bac-post934448.vnp'],
  ['chang-son-moc', 'https://vietnamplus.vn/ve-chang-son-tim-hieu-nghe-lam-ra-gio-hon-200-nam-post976993.vnp'],
  ['trach-xa', 'https://vietnamnet.vn/tham-ngoi-lang-toan-dan-ong-may-ao-dai-729761.html']
];

async function main() {
  for (const [id, url] of targetSites) {
    const og = await getOgImage(url);
    console.log(`${id} -> ${og}`);
    if (og) {
      const dest = path.join(imgDir, `${id}.jpg`);
      try {
        await downloadImage(og, dest);
        console.log(`✅ Downloaded ${id}.jpg: ${fs.statSync(dest).size} bytes`);
      } catch (err) {
        console.warn(`Failed downloading ${id}: ${err.message}`);
      }
    }
  }
}

main();
