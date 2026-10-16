const https = require('https');

function findWikiFiles(query) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(query) + '&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json';
    https.get(url, { headers: { 'User-Agent': 'SmartTourismApp/1.0 (contact@smarttourism.vn)' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const pages = Object.values(j.query.pages);
          resolve(pages.map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url
          })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  console.log('--- Dong Do ---');
  (await findWikiFiles('Dong Do Hanoi')).forEach(f => console.log(f.title, '=>', f.url));
  console.log('--- Ham Lon ---');
  (await findWikiFiles('Ham Lon')).forEach(f => console.log(f.title, '=>', f.url));
  console.log('--- Soc Son ---');
  (await findWikiFiles('Soc Son')).slice(0, 10).forEach(f => console.log(f.title, '=>', f.url));
}
run();
