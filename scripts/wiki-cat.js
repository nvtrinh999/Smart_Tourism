const https = require('https');

function getCategoryImages(cat) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=' + encodeURIComponent(cat) + '&gcmtype=file&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json';
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
  console.log('Category:Bat Trang:');
  const imgs = await getCategoryImages('Category:Bat Trang');
  imgs.forEach(i => console.log(i.title, '=>', i.url));

  console.log('\nCategory:Pottery of Bat Trang:');
  const imgs2 = await getCategoryImages('Category:Pottery of Bat Trang');
  imgs2.forEach(i => console.log(i.title, '=>', i.url));
}
run();
