const https = require('https');

function searchCommons(q) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=30&gsrsearch=' + encodeURIComponent(q) + '&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json';
    https.get(url, { headers: { 'User-Agent': 'SmartTourismApp/1.0 (contact@smarttourism.vn)' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query.pages);
          resolve(p.map(x => ({ title: x.title, url: x.imageinfo?.[0]?.thumburl || x.imageinfo?.[0]?.url })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const imgs = await searchCommons('Bat Trang');
  imgs.forEach(i => console.log(i.title, '=>', i.url));
}
run();
