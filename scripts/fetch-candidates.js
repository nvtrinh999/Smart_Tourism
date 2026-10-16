const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchPage(urlStr) {
  return new Promise((resolve) => {
    try {
      const u = new URL(urlStr);
      const mod = u.protocol === 'https:' ? https : http;
      mod.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchPage(new URL(res.headers.location, urlStr).href).then(resolve);
        }
        let html = '';
        res.on('data', c => { if (html.length < 300000) html += c; });
        res.on('end', () => resolve(html));
      }).on('error', () => resolve(''));
    } catch(e) { resolve(''); }
  });
}

async function findImages() {
  const urls = [
    'https://thanhnien.vn/ve-dep-co-kinh-cua-nha-tho-da-tam-dao-1851457814.htm',
    'https://dulich.laodong.vn/kham-pha/ngam-nha-tho-da-tam-dao-co-kinh-giua-may-troi-1199342.html',
    'https://dulich.laodong.vn/kham-pha/ve-dep-ho-dai-lai-vung-nuoc-biec-non-xanh-o-vinh-phuc-1212879.html',
    'https://dulich.laodong.vn/kham-pha/kham-pha-khu-du-lich-sinh-thai-ban-rom-soc-son-1224856.html',
    'https://mia.vn/cam-nang-du-lich/khu-du-lich-sinh-thai-ban-rom-soc-son-diem-cam-trai-cuc-chill-6240'
  ];

  for (const u of urls) {
    const html = await fetchPage(u);
    const ogMatch = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                    html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    console.log(u);
    console.log(' -> OG:', ogMatch ? ogMatch[1] : 'none');
  }
}
findImages();
