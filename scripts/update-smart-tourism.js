const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/assets/mock-data.json');
const backupPath = path.resolve(__dirname, '../src/assets/mock-data.json.bak');

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Backup
if (!fs.existsSync(backupPath)) {
  fs.writeFileSync(backupPath, JSON.stringify(data, null, 2), 'utf8');
}

// 1. Remove dai-lai from tab1_locations
if (data.tab1_locations && data.tab1_locations['dai-lai']) {
  delete data.tab1_locations['dai-lai'];
}

// 2. Update lang-bac videoUrl
if (data.tab1_locations && data.tab1_locations['lang-bac']) {
  data.tab1_locations['lang-bac'].videoUrl = 'https://www.youtube.com/watch?v=uPHK-wj6wIo';
}

// 3. Update flycam_locations
if (data.flycam_locations) {
  data.flycam_locations = data.flycam_locations.filter(l => l.id !== 'dai-lai');
  data.flycam_locations.forEach(l => {
    if (l.id === 'lang-bac') {
      l.videoUrl = 'https://www.youtube.com/watch?v=uPHK-wj6wIo';
    }
  });
}

// 4. Update tab2_suburbs.surroundingDestinations
const cuDaSurrounding = {
  id: 'cu-da',
  name: 'Làng cổ Cự Đà',
  region: 'south',
  regionLabel: 'Phía Nam • Thanh Oai',
  category: 'Làng cổ & Làng nghề tương miến',
  location: 'Xã Cự Khê, huyện Thanh Oai, Hà Nội',
  distance: 'Nằm cách trung tâm thủ đô Hà Nội khoảng 20 km về phía Tây Nam ven sông Nhuệ.',
  shortDistance: '20km • Phía Nam',
  description: 'Làng cổ ven sông Nhuệ với sự giao thoa độc đáo giữa kiến trúc nhà gỗ 3 gian Bắc Bộ và biệt thự Pháp cổ đầu thế kỷ XX. Nổi danh với nghề làm tương nếp gia truyền thơm ngọt và những giàn phơi miến dong vàng óng trải khắp ngõ xóm.',
  tags: [
    'Làng cổ sông Nhuệ',
    'Biệt thự Pháp cổ',
    'Tương nếp Cự Đà',
    'Miến dong vàng óng'
  ],
  image: 'assets/images/cu-da.jpg',
  watermark: 'CỰ ĐÀ',
  mapQuery: 'Lang+co+Cu+Da+Cu+Khe+Thanh+Oai+Ha+Noi',
  busRoute: 'Đi xe buýt tuyến 85 hoặc 103A/103B đến gần khu vực Cự Khê (hoặc KĐT Thanh Hà) rồi di chuyển xe ôm/taxi khoảng 1.5 - 2 km vào làng.',
  bestTime: 'Quanh năm, đặc biệt những ngày nắng ráo để chiêm ngưỡng những giàn miến dong phơi vàng óng và các chum tương nếp tỏa hương thơm nồng.',
  highlights: [
    'Chiêm ngưỡng cổng làng cổ với tháp đồng hồ kiểu phương Tây độc nhất vô nhị',
    'Khám phá những ngôi nhà gỗ truyền thống xen lẫn biệt thự kiến trúc Pháp cổ kính bên sông Nhuệ',
    'Tận mắt ngắm nhìn những giàn phơi miến dong vàng ruộm và thưởng thức hương vị tương nếp Cự Đà nức tiếng'
  ],
  history: 'Làng cổ Cự Đà nằm ven dòng sông Nhuệ thuộc xã Cự Khê, huyện Thanh Oai, Hà Nội. Từng là một thương cảng sầm uất trên bến dưới thuyền thời phong kiến, Cự Đà là làng đầu tiên ở nông thôn Việt Nam được đánh số nhà, đặt tên ngõ và có hệ thống cột cờ, đường lát gạch nghiêng kiên cố. Trải qua hàng trăm năm thăng trầm, làng vẫn lưu giữ quần thể di tích đình, chùa Thọ Thánh xếp hạng di tích quốc gia cùng nghề truyền thống làm tương nếp và miến dong nức tiếng gần xa.',
  transportDetail: {
    motorcycle: 'Từ trung tâm Hà Nội theo đường Nguyễn Trãi - Trần Phú (Hà Đông) - rẽ Phùng Hưng qua KĐT Xa La rồi theo đường trục phía Nam (Cienco 5) khoảng 4km đến cầu Cự Đà rẽ vào xã Cự Khê. Hoặc đi men theo đường đê sông Nhuệ thơ mộng.',
    bus: 'Xe buýt tuyến 85 (Công viên Nghĩa Đô - KĐT Thanh Hà) hoặc buýt 103A/103B, sau đó đi taxi hoặc xe ôm khoảng 1.5km vào làng cổ Cự Đà.',
    parking: 'Gửi xe máy và ô tô tại khu vực sân Đình Cự Đà, Chùa Cự Đà hoặc các bãi đỗ trước cổng làng.'
  },
  experiences: [
    'Dạo bước trên ngõ lát gạch nghiêng: Khám phá những con ngõ nhỏ rêu phong lát gạch nghiêng đặc trưng, hai bên là những bức tường đá ong và nhà cổ hàng trăm năm tuổi.',
    'Tìm hiểu nghề làm tương nếp & miến dong: Ghé thăm các hộ gia đình làm tương truyền thống với hàng trăm chum sành ủ tương ngoài sân và xem thợ làm miến tráng bột phơi bánh.',
    'Chiêm ngưỡng kiến trúc Đông - Tây hòa hợp: Thưởng ngoạn nét giao thoa kỳ diệu giữa nhà 5 gian truyền thống của đồng bằng Bắc Bộ và biệt thự kiểu Pháp thời thuộc địa.'
  ],
  checkInSpots: [
    'Cổng làng Cự Đà: Chiếc cổng làng cổ kính rêu phong có gắn tháp chuông đồng hồ kiểu phương Tây vô cùng độc đáo bên bờ sông Nhuệ.',
    'Giàn phơi miến dong vàng óng: Những hàng miến dong vàng rực trải dài dọc triền sông và sân đình tạo nên phông nền chụp ảnh tuyệt đẹp dưới nắng.',
    'Đình làng và Chùa Cự Đà (Thọ Thánh): Quần thể di tích quốc gia cổ kính rợp bóng cây cổ thụ thanh tịnh và trầm mặc.'
  ],
  source: 'hanoitourist.gov.vn',
  audioUrl: 'assets/audio/cu-da.mp3',
  audioDuration: '01:22',
  audioTitle: 'Không Gian Di Sản Làng Cổ Cự Đà Bên Dòng Sông Nhuệ'
};

if (data.tab2_suburbs && data.tab2_suburbs.surroundingDestinations) {
  data.tab2_suburbs.surroundingDestinations = data.tab2_suburbs.surroundingDestinations
    .filter(d => d.id !== 'tam-dao' && d.id !== 'dai-lai')
    .map(d => d.id === 'dai-bai' ? cuDaSurrounding : d);
}

// 5. Update tab3_heritage.audios
const cuDaHeritage = {
  id: 'cu-da',
  slug: 'cu-da',
  title: 'Nét Cổ Kính Ven Sông Nhuệ & Tương Nếp Làng Cổ Cự Đà',
  heritageSite: 'Làng cổ Cự Đà, Xã Cự Khê, huyện Thanh Oai, Hà Nội (ven sông Nhuệ)',
  narrator: 'Nhóm nghiên cứu Di sản Trẻ Hà Nội',
  durationFormatted: '01:22',
  durationSeconds: 82,
  audioUrl: 'assets/audio/cu-da.mp3',
  coverImage: 'assets/images/cu-da.jpg',
  qrCodeLabel: 'Mã QR Di tích #06 — Làng cổ Cự Đà',
  summary: 'Làng cổ ven sông Nhuệ với sự giao thoa độc đáo giữa kiến trúc nhà gỗ 3 gian Bắc Bộ và biệt thự Pháp cổ đầu thế kỷ XX. Nổi danh với nghề làm tương nếp gia truyền thơm ngọt và những giàn phơi miến dong vàng óng trải khắp ngõ xóm.',
  article: {
    lead: 'Nằm uốn mình bên bờ sông Nhuệ hiền hòa, làng cổ Cự Đà (xã Cự Khê, huyện Thanh Oai, Hà Nội) là một trong những ngôi làng cổ độc đáo bậc nhất đồng bằng Bắc Bộ. Nơi đây không chỉ nức tiếng gần xa với nghề làm tương nếp gia truyền và miến dong vàng óng, mà còn ghi dấu ấn lịch sử như ngôi làng đầu tiên ở nông thôn Việt Nam có nhà đánh số, ngõ gắn tên và những biệt thự phong cách Pháp cổ kính tọa lạc thanh bình giữa làng quê.',
    sections: [
      {
        heading: '1. Lịch sử hình thành & Giá trị kiến trúc độc bản',
        content: 'Cự Đà xưa kia là một thương cảng sầm uất trên bến dưới thuyền bên dòng sông Nhuệ. Nhờ giao thương hưng thịnh vào cuối thế kỷ XIX – đầu thế kỷ XX, các bậc phú thương trong làng đã xây dựng những ngôi biệt thự hai tầng mang phong cách kiến trúc Pháp cổ kết hợp tinh hoa mỹ nghệ gỗ truyền thống Việt Nam. Đến nay, làng vẫn bảo tồn được cổng làng cổ với ngọn tháp chuông đồng hồ kiểu phương Tây độc nhất vô nhị, đường làng lát gạch nghiêng kiên cố cùng quần thể Đình và Chùa Thọ Thánh đã được xếp hạng Di tích lịch sử văn hóa quốc gia.'
      },
      {
        heading: '2. Tinh hoa ẩm thực: Tương nếp & Miến dong gia truyền',
        content: 'Tương nếp Cự Đà từ lâu đã đi vào ca dao tục ngữ "tương Cự Đà, cà làng Láng". Tương được làm từ gạo nếp cái hoa vàng chọn lọc kỹ lưỡng, đỗ tương rang thơm vàng và ủ kỹ trong các chum sành da lươn phơi nắng tự nhiên suốt nhiều tháng để tạo vị ngọt đậm đà, màu cánh gián sóng sánh đặc trưng. Bên cạnh nghề tương, Cự Đà còn là vựa miến dong trứ danh. Những sợi miến làm từ củ dong riềng nguyên chất, phơi thủ công trên các phên nứa tre vàng óng dưới ánh nắng tạo nên thương hiệu miến dai giòn, nấu lâu không bị nát.'
      },
      {
        heading: '3. Hướng dẫn trải nghiệm & Góc check-in di sản',
        content: 'Phương tiện di chuyển: Từ trung tâm Hà Nội theo trục Nguyễn Trãi – Hà Đông – đường Cienco 5 hướng Thanh Oai chừng 4km qua KĐT Thanh Hà là tới làng. Hoặc đi tuyến xe buýt 85, 103A/103B kết hợp taxi/xe ôm ngắn.\nGóc check-in tuyệt đẹp: Cổng làng Cự Đà với tháp chuông đồng hồ cổ kính bên triền sông Nhuệ; các ngõ nhỏ rêu phong lát gạch nghiêng với những cánh cổng gỗ và tường gạch cổ; giàn phơi miến dong vàng óng trải dài dưới nắng rực rỡ; sân đình Cự Đà rợp bóng cây cổ thụ trầm mặc.'
      }
    ]
  }
};

if (data.tab3_heritage && data.tab3_heritage.audios) {
  data.tab3_heritage.audios = data.tab3_heritage.audios.map(a => a.id === 'dai-bai' ? cuDaHeritage : a);

  // Synchronize all 20 qrCodeLabels
  const labels = [
    'Mã QR Di tích #01 — Lò Bầu Bát Tràng',
    'Mã QR Di tích #02 — Đá Ong Đường Lâm',
    'Mã QR Di tích #03 — Làng hương Quảng Phú Cầu',
    'Mã QR Di tích #04 — Làng nón Chuông',
    'Mã QR Di tích #05 — Làng mây tre đan Phú Vinh',
    'Mã QR Di tích #06 — Làng cổ Cự Đà',
    'Mã QR Di tích #07 — Làng chuồn chuồn tre Thạch Xá',
    'Mã QR Di tích #08 — Làng quạt Chàng Sơn',
    'Mã QR Di tích #09 — Làng quạt lá châm nón Nghĩa Đồng',
    'Mã QR Di tích #10 — Làng đúc đồng Ngũ Xã',
    'Mã QR Di tích #11 — Làng làm diều sáo Hồng Hà',
    'Mã QR Di tích #12 — Làng may áo dài Trạch Xá',
    'Mã QR Di tích #13 — Làng khảm trai Chuôn Ngọ',
    'Mã QR Di tích #14 — Làng làm tò he Xuân La',
    'Mã QR Di tích #15 — Làng thêu ren Quất Động',
    'Mã QR Di tích #16 — Làng làm bánh chưng Tranh Khúc',
    'Mã QR Di tích #17 — Làng mộc mỹ nghệ Chàng Sơn',
    'Mã QR Di tích #18 — Làng rèn Dao Dẫy Đa Sỹ',
    'Mã QR Di tích #19 — Làng cốm Vòng',
    'Mã QR Di tích #20 — Làng dát vàng Kiêu Kỵ'
  ];

  data.tab3_heritage.audios.forEach((audio, idx) => {
    if (labels[idx]) {
      audio.qrCodeLabel = labels[idx];
    }
  });
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated mock-data.json!');
