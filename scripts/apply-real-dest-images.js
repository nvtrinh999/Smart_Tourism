const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'assets', 'mock-data.json');
const data = JSON.parse(fs.readFileSync(mockPath, 'utf8'));

// 1. Update surroundingDestinations
if (data.tab2_suburbs && data.tab2_suburbs.surroundingDestinations) {
  data.tab2_suburbs.surroundingDestinations.forEach(d => {
    if (d.id === 'bat-trang') d.image = 'assets/images/bat-trang.jpg';
    if (d.id === 'tam-dao') d.image = 'assets/images/tam-dao.jpg';
    if (d.id === 'dai-lai') d.image = 'assets/images/dai-lai.jpg';
    if (d.id === 'ban-rom') d.image = 'assets/images/ban-rom.jpg';
    if (d.id === 'ba-vi') d.image = 'assets/images/ba-vi.jpg';
    if (d.id === 'ecopark') d.image = 'assets/images/ecopark.jpg';
  });
}

// 2. Update destinations in tab2_suburbs
if (data.tab2_suburbs && data.tab2_suburbs.destinations) {
  data.tab2_suburbs.destinations.forEach(d => {
    if (d.id === 'bat-trang') d.image = 'assets/images/bat-trang.jpg';
    if (d.id === 'van-phuc') d.image = 'assets/images/van-phuc.jpg';
    if (d.id === 'duong-lam') d.image = 'assets/images/duong-lam.jpg';
  });
}

// 3. Update check-in spots in busGuide
if (data.tab2_suburbs && data.tab2_suburbs.busGuide && data.tab2_suburbs.busGuide.checkInSpots) {
  const spots = data.tab2_suburbs.busGuide.checkInSpots;
  if (spots[0]) spots[0].image = 'assets/images/bat-trang.jpg';
  if (spots[1]) spots[1].image = 'assets/images/bat-trang-lo-bau.jpg';
  if (spots[2]) spots[2].image = 'assets/images/bat-trang-ngo-co.jpg';
}

fs.writeFileSync(mockPath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Updated mock-data.json successfully!');

// Verify all images exist on disk
const imgDir = path.join(__dirname, '..', 'src', 'assets', 'images');
const list = data.tab2_suburbs.surroundingDestinations;
console.log('\n--- Verification of surroundingDestinations ---');
list.forEach(d => {
  const localFile = path.join(imgDir, path.basename(d.image));
  const exists = fs.existsSync(localFile);
  const size = exists ? fs.statSync(localFile).size : 0;
  console.log(`${d.id.padEnd(16)} | ${d.image.padEnd(30)} | ${exists ? `EXISTS (${size} B)` : 'MISSING'}`);
});
