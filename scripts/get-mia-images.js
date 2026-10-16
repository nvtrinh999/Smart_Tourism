const https = require('https');

https.get('https://mia.vn/cam-nang-du-lich/khu-du-lich-sinh-thai-ban-rom-soc-son-diem-cam-trai-cuc-chill-6240', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const regex = /https:\/\/mia\.vn\/media\/uploads\/blog-du-lich\/[^"'\s>]+\.(jpg|jpeg|png|webp)/gi;
    const matches = Array.from(new Set(d.match(regex) || []));
    console.log('Matches:', matches);
  });
}).on('error', console.error);
