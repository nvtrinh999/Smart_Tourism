const https = require('https');
const fs = require('fs');
const path = require('path');

function getWikiUrl(title) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json';
    https.get(url, { headers: { 'User-Agent': 'SmartTourismApp/1.0 (contact@smarttourism.vn)' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query.pages)[0];
          resolve(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

const list = [
  'File:Thị trấn Tam Đảo - NKS.jpg',
  'File:Lâu đài Tam Đảo - NKS.jpg',
  'File:Phong cảnh Tam Đảo.JPG',
  'File:Hồ Đại Lải.jpg',
  'File:Hồ Đại Lải 3.jpg',
  'File:Bat-Trang-Ceramic-Village8.jpg',
  'File:Bat-Trang-Ceramic-Village7.jpg',
  'File:Bat-Trang-Ceramic-Village5.jpg'
];

async function check() {
  for (const t of list) {
    const u = await getWikiUrl(t);
    console.log(t, '=>', u);
  }
}
check();
