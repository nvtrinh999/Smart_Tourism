const fs = require('fs');

const css = fs.readFileSync('src/app/pages/home/home.component.css', 'utf8');

const regex = /@media[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  if (m[0].includes('merc-')) {
    console.log('--- Media query touching merc- ---');
    console.log(m[0].slice(0, 500));
  }
}
