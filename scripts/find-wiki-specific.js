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
  console.log('--- Nha tho Tam Dao ---');
  (await findWikiFiles('Nha tho Tam Dao')).slice(0, 5).forEach(f => console.log(f.title, '->', f.url));
  console.log('--- Bat Trang ---');
  (await findWikiFiles('Bat Trang')).slice(0, 5).forEach(f => console.log(f.title, '->', f.url));
  console.log('--- Flamingo Dai Lai ---');
  (await findWikiFiles('Flamingo Dai Lai')).slice(0, 5).forEach(f => console.log(f.title, '->', f.url));
  console.log('--- Soc Son pine forest ---');
  (await findWikiFiles('Soc Son forest')).slice(0, 5).forEach(f => console.log(f.title, '->', f.url));
}
run();
