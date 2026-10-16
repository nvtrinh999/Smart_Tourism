const https = require('https');

https.get('https://vietnamnet.vn/ngam-bao-tang-gom-bat-trang-doc-nhat-vo-nhi-o-ha-noi-766723.html', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const imgs = [...d.matchAll(/https:\/\/[^"'\s<>]+\.(jpg|jpeg|png|webp)/gi)].map(m => m[0]);
    console.log(Array.from(new Set(imgs)).slice(0, 20));
  });
}).on('error', console.error);
