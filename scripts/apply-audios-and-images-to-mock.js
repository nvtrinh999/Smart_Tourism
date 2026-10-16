const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'assets', 'mock-data.json');
const data = JSON.parse(fs.readFileSync(mockPath, 'utf8'));

// Audio duration map based on generated mp3 file size (at 48kbps / 6KB/s)
const audioDurations = {
  'bat-trang': { formatted: '01:25', seconds: 85 },
  'duong-lam': { formatted: '01:22', seconds: 82 },
  'quang-phu-cau': { formatted: '01:25', seconds: 85 },
  'non-chuong': { formatted: '01:26', seconds: 86 },
  'lang-chuong': { formatted: '01:26', seconds: 86 },
  'phu-vinh': { formatted: '01:23', seconds: 83 },
  'dai-bai': { formatted: '01:18', seconds: 78 },
  'thach-xa': { formatted: '01:15', seconds: 75 },
  'chang-son-quat': { formatted: '01:15', seconds: 75 },
  'nghia-dong': { formatted: '01:17', seconds: 77 },
  'ngu-xa': { formatted: '01:15', seconds: 75 },
  'hong-ha': { formatted: '01:16', seconds: 76 },
  'trach-xa': { formatted: '01:17', seconds: 77 },
  'chuon-ngo': { formatted: '01:18', seconds: 78 },
  'xuan-la': { formatted: '01:16', seconds: 76 },
  'quat-dong': { formatted: '01:17', seconds: 77 },
  'tranh-khuc': { formatted: '01:19', seconds: 79 },
  'chang-son-moc': { formatted: '01:16', seconds: 76 },
  'da-sy': { formatted: '01:18', seconds: 78 },
  'com-vong': { formatted: '01:20', seconds: 80 },
  'lang-vong': { formatted: '01:20', seconds: 80 },
  'kieu-ky': { formatted: '01:20', seconds: 80 }
};

const audioTitles = {
  'bat-trang': 'Lịch sử 700 năm Lò Bầu và Tinh hoa Gốm Bát Tràng',
  'duong-lam': 'Không gian Nhà cổ Đá ong và Đất Hai Vua Đường Lâm',
  'quang-phu-cau': 'Sắc đỏ Tăm hương Trăm năm Làng nghề Quảng Phú Cầu',
  'non-chuong': 'Hồn Nón lá Mười sáu Vành bên Dòng sông Đáy Làng Chuông',
  'lang-chuong': 'Hồn Nón lá Mười sáu Vành bên Dòng sông Đáy Làng Chuông',
  'phu-vinh': 'Nghệ thuật Mây tre đan Đỉnh cao Làng Phú Vinh',
  'dai-bai': 'Âm vang Nghệ thuật Gò Đúc Đồng Chín Trăm Năm Đại Bái',
  'thach-xa': 'Ký ức Tuổi thơ với Chuồn chuồn Tre Thạch Xá',
  'chang-son-quat': 'Hồn Gió Quạt Giấy Trăm Năm Xứ Đoài Chàng Sơn',
  'nghia-dong': 'Nét Mộc mạc Quạt Lá và Nón Chằm Nghĩa Đồng',
  'ngu-xa': 'Tinh hoa Đúc Đồng và Ẩm thực Bán đảo Ngũ Xã',
  'hong-ha': 'Di sản Văn hóa Phi vật thể Diều Sáo Bá Dương Nội',
  'trach-xa': 'Ngàn năm Kỹ nghệ Khâu tay Áo dài Trạch Xá',
  'chuon-ngo': 'Kiệt tác Cẩn Ốc Khảm Trai Xà cừ Chuôn Ngọ',
  'xuan-la': 'Sắc màu Dân gian Nghệ thuật Tò he Xuân La',
  'quat-dong': 'Đường Kim Mũi Chỉ Dệt Tranh Thêu Quất Động',
  'tranh-khuc': 'Hương Vị Tết Cổ Truyền Bánh Chưng Tranh Khúc',
  'chang-son-moc': 'Bàn Tay Vàng Điêu Khắc Mộc Mỹ Nghệ Chàng Sơn',
  'da-sy': 'Ngọn Lửa Lò Rèn Nửa Thiên Niên Kỷ Đa Sỹ',
  'com-vong': 'Hồn Thu Hà Nội trong Từng Hạt Cốm Làng Vòng',
  'lang-vong': 'Hồn Thu Hà Nội trong Từng Hạt Cốm Làng Vòng',
  'kieu-ky': 'Kỹ Thuật Đập Quỳ Vàng Ba Trăm Năm Kiêu Kỵ'
};

// 1. Update Tab 2 surroundingDestinations with local image & audio files
for (const dest of data.tab2_suburbs.surroundingDestinations) {
  if (audioDurations[dest.id]) {
    dest.image = `assets/images/${dest.id}.jpg`;
    dest.audioUrl = `assets/audio/${dest.id}.mp3`;
    dest.audioDuration = audioDurations[dest.id].formatted;
    dest.audioTitle = audioTitles[dest.id];
  }
}

// 2. Expand Tab 3 audios to include all 20 craft villages + Van Phuc
const existingAudioMap = new Map();
for (const a of data.tab3_heritage.audios) {
  existingAudioMap.set(a.id, a);
}

const newAudiosList = [];
let qrIndex = 1;

for (const dest of data.tab2_suburbs.surroundingDestinations) {
  if (!audioDurations[dest.id]) continue; // only craft villages

  const dur = audioDurations[dest.id];
  const title = audioTitles[dest.id];
  const paddedIndex = qrIndex.toString().padStart(2, '0');

  const existing = existingAudioMap.get(dest.id);
  if (existing) {
    existing.audioUrl = `assets/audio/${dest.id}.mp3`;
    existing.coverImage = `assets/images/${dest.id}.jpg`;
    existing.durationFormatted = dur.formatted;
    existing.durationSeconds = dur.seconds;
    existing.title = title;
    newAudiosList.push(existing);
  } else {
    newAudiosList.push({
      id: dest.id,
      slug: dest.id,
      title: title,
      heritageSite: `${dest.name}, ${dest.location}`,
      narrator: 'Nhóm nghiên cứu Di sản Trẻ Hà Nội',
      durationFormatted: dur.formatted,
      durationSeconds: dur.seconds,
      audioUrl: `assets/audio/${dest.id}.mp3`,
      coverImage: `assets/images/${dest.id}.jpg`,
      qrCodeLabel: `Mã QR Di tích #${paddedIndex} — ${dest.name}`,
      summary: dest.description || dest.history?.slice(0, 150) + '...',
      article: {
        lead: dest.history || dest.description,
        sections: [
          {
            heading: '1. Lịch sử hình thành & Giá trị văn hóa',
            content: dest.history || dest.description
          },
          {
            heading: '2. Kỹ nghệ truyền thống & Trải nghiệm thực tế',
            content: Array.isArray(dest.experiences) ? dest.experiences.join('\n\n') : (dest.highlights?.join('. ') || '')
          },
          {
            heading: '3. Hướng dẫn di chuyển & Góc check-in',
            content: `Phương tiện cá nhân: ${dest.transportDetail?.motorcycle || 'Di chuyển theo quốc lộ thuận tiện.'}\nXe buýt: ${dest.transportDetail?.bus || dest.busRoute || 'Tuyến buýt thuận lợi.'}\nGóc check-in đẹp: ${Array.isArray(dest.checkInSpots) ? dest.checkInSpots.join(', ') : 'Khuôn viên làng nghề cổ kính.'}`
          }
        ]
      }
    });
  }
  qrIndex++;
}

// Ensure Van Phuc is also preserved in Tab 3 audios
const vanPhucAudio = existingAudioMap.get('van-phuc');
if (vanPhucAudio) {
  newAudiosList.push(vanPhucAudio);
}

data.tab3_heritage.audios = newAudiosList;

// Write updated mock-data.json
fs.writeFileSync(mockPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ mock-data.json updated successfully!`);
console.log(`- Tab 2 surroundingDestinations: ${data.tab2_suburbs.surroundingDestinations.length} items with local images & audios`);
console.log(`- Tab 3 audios: ${data.tab3_heritage.audios.length} craft villages with full audio guides & QR codes!`);
