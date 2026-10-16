const https = require('https');
const http = require('http');

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
        res.on('data', c => { if (html.length < 200000) html += c; });
        res.on('end', () => {
          const m1 = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
          const m2 = html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
          resolve(m1 ? m1[1] : (m2 ? m2[1] : null));
        });
      }).on('error', () => resolve(null));
    } catch(e) { resolve(null); }
  });
}

async function test() {
  const urls = [
    'https://vnexpress.net/cam-nang-du-lich-tam-dao-4475510.html',
    'https://vnexpress.net/cam-nang-du-lich-dai-lai-4467140.html',
    'https://vietnamnet.vn/ngam-bao-tang-gom-bat-trang-doc-nhat-vo-nhi-o-ha-noi-766723.html',
    'https://vinwonders.com/vi/bai-viet-du-lich/ban-rom-soc-son/',
    'https://mia.vn/cam-nang-du-lich/khu-du-lich-sinh-thai-ban-rom-soc-son-diem-cam-trai-cuc-chill-6240'
  ];
  for (const u of urls) {
    const og = await getOgImage(u);
    console.log(u, '->', og);
  }
}
test();
