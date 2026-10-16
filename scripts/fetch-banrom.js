const https = require('https');

https.get('https://banrom.com/', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const imgs = [...d.matchAll(/https:\/\/banrom\.com\/wp-content\/uploads\/[^"'\s>]+\.(jpg|jpeg|png)/gi)].map(m => m[0]);
    console.log(Array.from(new Set(imgs)));
  });
}).on('error', console.error);
