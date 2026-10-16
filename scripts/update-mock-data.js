const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '..', 'src', 'assets', 'mock-data.json');
const data = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

// 20 Craft Villages + Cultural destinations from User Request
const craftVillages = [
  {
    id: "bat-trang",
    name: "Làng gốm Bát Tràng",
    region: "east",
    regionLabel: "Đông Nam • Gia Lâm",
    category: "Làng nghề gốm sứ truyền thống",
    location: "Xã Bát Tràng, huyện Gia Lâm, Hà Nội",
    distance: "Ven tả ngạn sông Hồng, cách trung tâm hồ Hoàn Kiếm khoảng 13 – 15 km về phía Đông Nam.",
    shortDistance: "14km • Đông Nam",
    description: "Cái nôi gốm sứ truyền thống trên 500 năm từ thời nhà Lý bên dòng sông Hồng. Nổi tiếng với Bảo tàng gốm Bát Tràng 7 bàn xoay khổng lồ độc bản, chợ gốm sầm uất và trải nghiệm tự tay vuốt nặn gốm nghệ thuật cùng nghệ nhân lành nghề.",
    tags: ["Gốm sứ thủ công", "Bảo tàng gốm Bát Tràng", "Nhà cổ Vạn Vân", "Tự nặn gốm"],
    image: "assets/images/bat-trang.jpg",
    watermark: "BÁT TRÀNG",
    mapQuery: "Lang+gom+Bat+Trang+Gia+Lam",
    busRoute: "Tuyến xe buýt số 47A từ Long Biên đi thẳng đến cổng làng gốm Bát Tràng (9.000đ/lượt).",
    bestTime: "Quanh năm, đặc biệt dịp Lễ hội Bát Tràng (14 và 15 tháng 2 âm lịch).",
    highlights: [
      "Bảo tàng gốm Bát Tràng kiến trúc 7 bàn xoay độc bản",
      "Nhà cổ Vạn Vân hơn 200 năm lưu giữ hơn 300 cổ vật quý",
      "Tự tay vuốt nặn, vẽ và nung sản phẩm gốm cá nhân"
    ],
    history: "Làng gốm Bát Tràng có lịch sử trên 500 năm từ thời nhà Lý, nổi tiếng với các sản phẩm gốm sứ tinh xảo và hoạt động trải nghiệm nặn gốm.",
    transportDetail: {
      motorcycle: "Xe máy / ô tô: Qua cầu Long Biên, Chương Dương, Vĩnh Tuy hoặc Thanh Trì rồi chạy dọc theo đê sông Hồng.",
      bus: "Xe buýt: Bắt tuyến xe buýt số 47A từ Long Biên đi thẳng đến cổng làng gốm.",
      parking: "Bãi đỗ xe chợ gốm Bát Tràng hoặc khuôn viên Bảo tàng gốm Bát Tràng."
    },
    experiences: [
      "Tham quan Chợ gốm: 1 số mặt hàng phổ biến như đồ gốm sứ sử dụng hàng ngày (bát, đĩa, cốc và bộ ấm trà), đồ vẽ tay (bình hoa, tượng và các vật phẩm trang trí), gốm sứ đặt làm theo yêu cầu.",
      "Tham quan Làng cổ: Đình làng Bát Tràng và Bảo tàng gốm Bát Tràng.",
      "Tự làm gốm: Tham gia các buổi học làm gốm thực hành với các nghệ nhân lành nghề, trải nghiệm cho phép bạn tự tay sáng tạo và cá nhân hóa mang đến một món quà lưu niệm độc đáo.",
      "Tham gia lễ hội Bát Tràng: Vào ngày 14 và 15 tháng 2 âm lịch, lễ hội tôn vinh nghề gốm truyền thống tượng trưng cho hy vọng về sự thịnh vượng và hạnh phúc, nhắc nhở người tham gia trân trọng nguồn cội."
    ],
    checkInSpots: [
      "Nhà cổ Vạn Vân: Nơi lưu giữ hàng trăm năm tuổi với hơn 300 cổ vật quý, mang đậm dấu ấn kiến trúc nhà cổ đồng bằng Bắc Bộ.",
      "Bảo tàng gốm Bát Tràng: Không gian bên trong với ánh sáng tự nhiên và các khối hình học mềm mại uốn lượn."
    ],
    source: "vnexpress.net, vinwonders.com"
  },
  {
    id: "duong-lam",
    name: "Làng cổ Đường Lâm",
    region: "west",
    regionLabel: "Phía Tây • Sơn Tây",
    category: "Di tích quốc gia làng cổ",
    location: "Thị xã Sơn Tây, thành phố Hà Nội",
    distance: "Cách trung tâm hồ Hoàn Kiếm khoảng 45–50 km về phía Tây.",
    shortDistance: "45km • Phía Tây",
    description: "Một trong những ngôi làng cổ tiêu biểu của vùng đồng bằng Bắc Bộ, nổi bật với những ngôi nhà đá ong, đường làng quanh co và không gian làng quê yên bình. Nơi đất hai vua Phùng Hưng và Ngô Quyền, làng cổ đầu tiên được xếp hạng Di tích quốc gia.",
    tags: ["Nhà đá ong", "Một ấp hai vua", "Cổng làng Mông Phụ", "Chè lam & Tương nếp"],
    image: "assets/images/duong-lam.jpg",
    watermark: "ĐƯỜNG LÂM",
    mapQuery: "Lang+co+Duong+Lam+Son+Tay",
    busRoute: "Tuyến buýt số 70A (BX Mỹ Đình – Trung Hà) xuống bến phà Đường Lâm. Hoặc bus 20B, 67, 89 đi BX Sơn Tây nối bus 118 hoặc 126.",
    bestTime: "Mùa thu mát mẻ hoặc dịp lễ hội đầu xuân (tháng Giêng đến tháng 3 âm lịch).",
    highlights: [
      "Cổng làng Mông Phụ cổ kính & cây đa lâu năm",
      "Những ngôi nhà đá ong niên đại hơn 300 - 400 năm",
      "Đình Mông Phụ, Đền Phùng Hưng & Lăng Ngô Quyền"
    ],
    history: "Làng cổ Đường Lâm có lịch sử lâu đời, gắn liền với văn hóa truyền thống vùng Bắc Bộ. Nơi đây được biết đến là quê hương của hai vị anh hùng dân tộc Phùng Hưng và Ngô Quyền. Năm 2006, Đường Lâm trở thành làng cổ đầu tiên ở Việt Nam được Nhà nước xếp hạng Di tích lịch sử văn hóa quốc gia theo mô hình bảo tồn một không gian làng cổ truyền thống.",
    transportDetail: {
      motorcycle: "Phương tiện cá nhân (Ô tô / Xe máy): Theo Đại lộ Thăng Long rẽ phải tại ngã ba Hòa Lạc vào QL21 lên thị xã Sơn Tây, đi thêm khoảng 4,5 km là đến làng. Hoặc theo Quốc lộ 32 qua thị xã Sơn Tây rồi rẽ theo biển chỉ dẫn cầu Trung Hà / Vĩnh Thịnh.",
      bus: "Xe buýt: Tuyến buýt số 70A (BX Mỹ Đình – Trung Hà) xuống tại điểm vào bến phà Đường Lâm rồi đi bộ sang đường. Hoặc các tuyến đi BX Sơn Tây (20B, 67, 89) chuyển tiếp xe 118 (đi Tòng Bạt) hoặc 126 (đi cầu Trung Hà).",
      parking: "Gửi xe và tham quan: Bạn có thể đi bộ tham quan hoặc thuê xe đạp ngay tại khu vực cổng bán vé."
    },
    experiences: [
      "Khám phá nhà cổ: Tham quan những ngôi nhà hàng trăm năm tuổi với tường đá ong, mái ngói đỏ và kiến trúc truyền thống Bắc Bộ.",
      "Tìm hiểu văn hóa, lịch sử: Ghé đình Mông Phụ, đền thờ Phùng Hưng và lăng Ngô Quyền để tìm hiểu về lịch sử dân tộc.",
      "Trải nghiệm làm bánh truyền thống: Thử làm bánh trôi, bánh chay hoặc tìm hiểu cách làm các món ăn đặc sản địa phương.",
      "Thưởng thức đặc sản: Nếm thử chè lam, kẹo dồi, tương truyền thống và các món ăn dân dã của vùng xứ Đoài.",
      "Đạp xe khám phá làng: Đi qua những con ngõ nhỏ, ngắm cảnh đồng quê và tận hưởng không khí yên bình, khác biệt với sự nhộn nhịp của thành phố."
    ],
    checkInSpots: [
      "Cổng làng Mông Phụ: Địa điểm nổi bật với kiến trúc cổ kính, mái ngói rêu phong và cây đa lâu năm, rất phù hợp để chụp ảnh mang phong cách hoài cổ.",
      "Đình làng Mông Phụ: Không gian đậm nét kiến trúc truyền thống, thích hợp để chụp ảnh áo dài hoặc trang phục vintage.",
      "Những con ngõ tường đá ong: Các bức tường vàng nâu, cửa gỗ và mái ngói tạo nên khung hình đậm chất làng quê Bắc Bộ.",
      "Những ngôi nhà cổ: Hiên nhà, sân gạch, chum nước và cánh cửa gỗ là những góc chụp độc đáo dành cho các bạn trẻ yêu thích phong cách cổ điển.",
      "Chùa Mía: Không gian cổ kính với kiến trúc chùa truyền thống, phù hợp để tham quan và chụp ảnh lưu niệm đúng nơi quy định."
    ],
    source: "vov.vn, vntrip.vn, ivivu.com"
  },
  {
    id: "quang-phu-cau",
    name: "Làng hương Quảng Phú Cầu",
    region: "south",
    regionLabel: "Phía Nam • Ứng Hòa",
    category: "Làng nghề hương truyền thống",
    location: "Xã Quảng Phú Cầu, huyện Ứng Hòa, Hà Nội",
    distance: "Ngoại ô thành phố Hà Nội, cách trung tâm thành phố khoảng 35 km về phía Nam.",
    shortDistance: "35km • Phía Nam",
    description: "Làng nghề tăm hương hơn một thế kỷ nổi tiếng với những khoảng sân rộng phơi đầy những bó hương xòe tròn như đóa hoa khổng lồ rực rỡ dưới nắng vàng. Nơi sản xuất các loại hương nén, hương vòng đạt chuẩn OCOP 3-4 sao nức tiếng muôn phương.",
    tags: ["Sân phơi hương đỏ", "Tăm hương OCOP", "Hoa hương khổng lồ", "Check-in rực rỡ"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Quang_Phu_Cau_Incense_Village.jpg/1200px-Quang_Phu_Cau_Incense_Village.jpg",
    watermark: "QUẢNG PHÚ CẦU",
    mapQuery: "Lang+huong+Quang+Phu+Cau+Ung+Hoa",
    busRoute: "Xe buýt số 91 đi từ bến xe Yên Nghĩa đến thẳng ngôi làng tuyệt đẹp này.",
    bestTime: "Các ngày nắng ráo quanh năm, đặc biệt dịp cận Tết Nguyên đán.",
    highlights: [
      "Sân phơi hàng vạn bó hương bung xòe như đóa hoa khổng lồ",
      "Tham quan các cơ sở sản xuất tăm hương lâu đời nghe chuyện làng",
      "Tự tay làm một số công đoạn tăm hương cùng thợ lão luyện"
    ],
    history: "Vào đầu thế kỉ XX, người dân Quảng Phú Cầu chủ yếu mưu sinh với nghề đan lát rổ rá, quạt, cót… Trong một lần, ông Lê Xuân Vịnh thôn Phú Lương Thượng đi mua tre về chẻ nan gặp một vị thương lái đi mua tăm hương, ông đã đặt vấn đề nhận chẻ tăm bán cho thương lái. Những mô hình chẻ tăm hương nhỏ lẻ từ thôn Phú Lương Thượng dần phát triển mạnh mẽ, lan rộng ra 6 thôn trong toàn xã với hàng ngàn lao động, trở thành nghề thu nhập chính của người dân.",
    transportDetail: {
      motorcycle: "Bằng xe máy: Quốc lộ 21B, Tỉnh lộ 429.",
      bus: "Bằng xe buýt: Xe buýt số 91 đi từ bến xe Yên Nghĩa đến thẳng ngôi làng tuyệt đẹp này.",
      parking: "Gửi xe tại các sân xưởng phơi hương lớn hoặc nhà văn hóa xã."
    },
    experiences: [
      "Dạo quanh làng hương Quảng Phú Cầu: Tận hưởng không khí nhịp sống tất bật với công việc làm hương. Khắp nơi là những khoảng sân rộng phơi đầy những bó hương đỏ như những đóa hoa khổng lồ dưới ánh nắng vàng rực rỡ.",
      "Tham quan các cơ sở sản xuất tăm hương lâu đời: Lắng nghe về những câu chuyện về làng theo dòng lịch sử.",
      "Trải nghiệm thực tế: Tự tay làm một số công đoạn tăm hương cùng người dân địa phương những người lão luyện.",
      "Mua một số đồ lưu niệm: Mua các loại hương nén, hương vòng đạt chuẩn OCOP 3-4 sao về sử dụng và làm quà giá trị."
    ],
    checkInSpots: [
      "Sân phơi bó hương xòe tròn: Check-in với những bó hương sau khi nhuộm đỏ hoặc vàng được dựng đứng thành hình chóp, xòe tròn như những bông hoa khổng lồ trải dài trên sân."
    ],
    source: "vinpearl.com"
  },
  {
    id: "non-chuong",
    name: "Làng nón Chuông",
    region: "south",
    regionLabel: "Tây Nam • Thanh Oai",
    category: "Làng nghề nón lá thủ công",
    location: "Bờ phía bắc sông Đáy, thuộc xã Phương Trung, huyện Thanh Oai, Hà Nội",
    distance: "Cách trung tâm thủ đô Hà Nội khoảng 30km về phía Tây Nam, diện tích trên 481 ha gồm 8 thôn.",
    shortDistance: "30km • Tây Nam",
    description: "Cái nôi nón lá thủ công hàng trăm năm tuổi bên bờ sông Đáy, từng làm nên nón quai thao, nón ba tầm tiến cống hoàng hậu công chúa. Nổi tiếng với kỹ thuật khâu nón 16 vòng nan tre tỉ mỉ và phiên chợ nón rạng sáng độc đáo.",
    tags: ["Nón lá 16 vòng", "Chợ nón sớm", "Đình Chuông 1894", "Bánh cuốn làng Chuông"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Making_conical_hats_in_Chuong_village.jpg/1200px-Making_conical_hats_in_Chuong_village.jpg",
    watermark: "LÀNG CHUÔNG",
    mapQuery: "Lang+non+Chuong+Phuong+Trung+Thanh+Oai",
    busRoute: "Bắt tuyến buýt 78 (Mỹ Đình – Tế Tiêu), 103A/103B (Mỹ Đình – Hương Sơn) hoặc 91 (Yên Nghĩa – Phú Túc) xuống trạm Phương Trung.",
    bestTime: "Các ngày họp chợ nón âm lịch (mùng 4, 10, 14, 20, 24, 30 hàng tháng từ 5h00 sáng).",
    highlights: [
      "Chợ nón Chuông rộn ràng từ 5h00 sáng họp 6 phiên mỗi tháng",
      "Xem nghệ nhân làm khung 16 vòng nan tre lá cọ hơ diêm tạo độ trắng sáng",
      "Thưởng thức bánh cuốn làng Chuông và bánh đúc lạc dân dã"
    ],
    history: "Nghề làm nón lá tại đây đã có lịch sử hàng trăm năm từ thời phong kiến (thậm chí có cội nguồn từ thế kỷ thứ 8 hoặc khoảng thế kỷ XVII với tên gọi cũ là Trang Thì Trung). Thời xưa nón làng Chuông nổi tiếng độ tinh xảo cao, từng dùng làm vật phẩm tiến cống hoàng cung. Làng cung cấp nón quai thao cho các cụ đi chùa, nón ba tầm, nón lá già ghép sống... biến nón Chuông thành biểu tượng văn hóa tiêu biểu Bắc Bộ.",
    transportDetail: {
      motorcycle: "Đi bằng phương tiện cá nhân: Theo Quốc lộ 6 và QL21B qua Ba La (Hà Đông) đi thẳng qua thị trấn Kim Bài 2km rẽ phải theo đường đê sông Đáy. Hoặc theo đường Trục phía Nam (Cienco 5).",
      bus: "Đi bằng xe buýt: Tuyến 78 (BX Mỹ Đình – Tế Tiêu), 103A/103B (BX Mỹ Đình – Hương Sơn) hoặc tuyến 91 (BX Yên Nghĩa – Phú Túc) xuống trạm Cửa Hàng Xăng Dầu Phương Trung, đi bộ 200m - 500m vào làng.",
      parking: "Gửi xe tại Nhà văn hóa hoặc khu vực Đình làng Chuông."
    },
    experiences: [
      "Khám phá Chợ nón Chuông độc đáo: Họp vào các ngày mùng 4, 10, 14, 20, 24 và 30 âm lịch từ 5h00 sáng trong vài tiếng, cảnh mua bán tấp nập vòng nón, lá cọ, nan tre, chỉ khâu đậm chất chợ quê xưa.",
      "Trải nghiệm quy trình làm nón thủ công: Chứng kiến nghệ nhân làm khung nan tre đủ 16 vòng, khâu lá cọ, chằm nón và hơ diêm tạo độ trắng sáng; tự tay thử một số công đoạn.",
      "Thưởng thức ẩm thực địa phương: Bánh cuốn làng Chuông mềm thơm, bánh đúc lạc giòn bùi tại phiên chợ.",
      "Mua nón lá làm quà: Mang về những chiếc nón thủ công tinh xảo, bền đẹp làm quà lưu niệm."
    ],
    checkInSpots: [
      "Cổng làng và con đường làng thanh bình: Những con ngõ nhỏ yên ả rợp bóng cây xanh hoặc bức tường rêu phong hoài cổ.",
      "Khu vực Đình làng Chuông: Xây dựng từ năm 1894 (thời vua Thành Thái) kiến trúc 'nội công ngoại quốc', Đại Bái uy nghiêm chạm khắc tứ linh gỗ lim.",
      "Khung cảnh phơi lá cọ & làm nón: Khoảnh sân ngập tràn lá cọ phơi nắng cùng hình ảnh người thợ miệt mài khâu nón dưới hiên nhà."
    ],
    source: "vietnamtourism.gov.vn"
  },
  {
    id: "phu-vinh",
    name: "Làng mây tre đan Phú Vinh",
    region: "south",
    regionLabel: "Tây Nam • Chương Mỹ",
    category: "Làng nghề mây tre mỹ nghệ",
    location: "Thôn Phú Vinh, xã Phú Nghĩa, huyện Chương Mỹ, Hà Nội",
    distance: "Cách trung tâm Hà Nội khoảng 25 – 30 km về phía Tây Nam (nằm ngay ven Quốc lộ 6).",
    shortDistance: "28km • Tây Nam",
    description: "Làng nghề mây tre đan hơn 400 năm tuổi với danh xưng xưa 'Phú Hoa Trang' (trời phú cho dân bàn tay tài hoa). Đỉnh cao kỹ thuật biến mây tre thô cứng thành tranh chân dung, đèn lồng và đồ mỹ nghệ xuất khẩu toàn cầu.",
    tags: ["Mây tre đan nghệ thuật", "Phú Hoa Trang 400 năm", "Đồ decor mây tre", "Tranh mây chân dung"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bamboo_and_rattan_weaving_Phu_Vinh.jpg/1200px-Bamboo_and_rattan_weaving_Phu_Vinh.jpg",
    watermark: "PHÚ VINH",
    mapQuery: "Lang+may+tre+dan+Phu+Vinh+Phu+Nghia+Chuong+My",
    busRoute: "Tuyến buýt 72 (BX Yên Nghĩa – BX Xuân Mai), hoặc kết hợp Metro Cát Linh - Hà Đông tới ga Yên Nghĩa nối buýt 72 xuống Xã Phú Nghĩa.",
    bestTime: "Quanh năm, các ngày nắng đẹp phơi mây tre rực vàng khắp ngõ xóm.",
    highlights: [
      "Kỹ thuật đan tranh chân dung và phong cảnh từ sợi mây tơ",
      "Tham quan quy trình tuốt, chẻ nan, phơi sấy và hun khói thủ công",
      "Tự tay đan đĩa mây, rổ nhỏ hoặc lót ly mang về làm kỷ niệm"
    ],
    history: "Làng nghề có lịch sử hình thành hơn 400 năm. Tương truyền vào khoảng năm 1700 làng có tên gọi ban đầu là Phú Hoa Trang ('trời phú cho dân bàn tay tài hoa'). Đến khoảng năm 1800 làng đổi tên thành Phú Vinh mong ước làng nghề luôn phú quý và vinh hiển. Kỹ thuật đỉnh cao biến sợi mây nan tre thành tranh chân dung, đồ decor xuất khẩu đi nhiều nước trên thế giới.",
    transportDetail: {
      motorcycle: "Phương tiện cá nhân: Theo Quốc lộ 6 qua Hà Đông về hướng Hòa Bình, qua Chúc Sơn vài km đến xã Phú Nghĩa thấy biển rẽ vào làng. Hoặc đi Đại lộ Thăng Long rẽ Tỉnh lộ 419 sang QL6.",
      bus: "Xe buýt trực tiếp: Buýt 72 (BX Yên Nghĩa – BX Xuân Mai). Hoặc kết hợp Tàu điện trên cao Metro Cát Linh - Hà Đông đến ga cuối Yên Nghĩa bắt buýt 72 xuống trạm Xã Phú Nghĩa, đi bộ 300m - 500m vào làng.",
      parking: "Gửi xe tại bãi xe các xưởng lớn, Nhà văn hóa thôn Phú Vinh hoặc khu vực Đình làng."
    },
    experiences: [
      "Tham quan các xưởng đan lát & nhà nghệ nhân: Chứng kiến quy trình biến tre mây thô thành sản phẩm: tuốt, chẻ nan, phơi, sấy/hun khói và đan thủ công.",
      "Tự tay làm sản phẩm mây tre: Dưới sự hướng dẫn của thợ giỏi, tự tay đan chiếc đĩa mây, rổ nhỏ hoặc lót ly mang về.",
      "Mua sắm đồ thủ công độc đáo: Ghé phòng trưng bày mua đồ decor nội thất (đèn mây, khay trà, túi xách, hộp quà) giá gốc tại xưởng."
    ],
    checkInSpots: [
      "Không gian phơi mây tre ngập sắc vàng: Những con ngõ quê hay khoảng sân nhà ngập tràn bó mây, nan tre xòe rộng phơi dưới nắng rực rỡ.",
      "Khu trưng bày sản phẩm mỹ nghệ: Bức tường xếp đầy các loại đèn mây tre đan, lồng đèn decor hoặc tranh mây tỉ mỉ.",
      "Đình, chùa cổ kính của làng: Đình - Quán thôn Phú Vinh hoặc chùa cổ Chùa Cổ Ngỗng yên bình rêu phong."
    ],
    source: "Google Maps, vietnamtourism"
  },
  {
    id: "dai-bai",
    name: "Làng đúc đồng nghệ thuật Đại Bái",
    region: "east",
    regionLabel: "Đông Bắc • Bắc Ninh",
    category: "Làng nghề gò đúc đồng",
    location: "Xã Đại Bái, huyện Gia Bình, tỉnh Bắc Ninh",
    distance: "Nằm cách trung tâm thủ đô Hà Nội khoảng 35 – 40 km về phía Đông Bắc.",
    shortDistance: "38km • Đông Bắc",
    description: "Làng nghề gò đúc đồng trên 900 năm tuổi thờ tổ nghề Nguyễn Công Triều từ thời nhà Lý. Nơi vang vọng tiếng búa gò đồng lách cách rộn ràng, làm nên những bức tranh đồng chạm nổi và vật phẩm phong thủy lộng lẫy.",
    tags: ["Đúc đồng 900 năm", "Tổ nghề Lý triều", "Tranh đồng chạm nổi", "Âm thanh búa gò"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dong_Dai_Bai_Bronze_Casting.jpg/1200px-Dong_Dai_Bai_Bronze_Casting.jpg",
    watermark: "ĐẠI BÁI",
    mapQuery: "Lang+duc+dong+Dai+Bai+Gia+Binh+Bac+Ninh",
    busRoute: "Bắt các tuyến xe buýt liên tỉnh từ Hà Nội đi Bắc Ninh / Hải Dương có lộ trình qua Thuận Thành/Gia Bình rồi đi taxi/xe ôm vào làng.",
    bestTime: "Quanh năm, các dịp chuẩn bị đồ đồng thờ cúng và lễ hội truyền thống tháng 4 âm lịch.",
    highlights: [
      "Tiếng búa đục gò đồng lách cách vang rộn suốt các con ngõ làng",
      "Tận mắt chứng kiến kỹ thuật nung đồng, đổ khuôn và gò chạm nổi hoa văn",
      "Chiêm ngưỡng showroom tranh đồng và đồ phong thủy lấp lánh ánh kim"
    ],
    history: "Làng Đại Bái (xưa tên làng Bưởi hay Hạm Sảnh) có lịch sử trên 900 năm. Tương truyền ông tổ nghề đúc và gò đồng của làng là cụ Nguyễn Công Triều (thời nhà Lý, thế kỷ XI), cụ là người truyền dạy nghề gò đúc đồng cho dân làng, từ đó nghề lan rộng khắp vùng và phát triển qua nhiều thế hệ.",
    transportDetail: {
      motorcycle: "Theo Quốc lộ 1A và Quốc lộ 38: Từ Hà Nội qua cầu Thanh Trì hoặc Vĩnh Tuy ra QL1A/cao tốc HN - Bắc Giang. Đến nút giao Bắc Ninh rẽ QL38 đi thị trấn Hồ (Thuận Thành), đi tiếp sang huyện Gia Bình tới xã Đại Bái.",
      bus: "Xe buýt: Bắt các tuyến xe buýt liên tỉnh từ Hà Nội đi Bắc Ninh có lộ trình qua Thuận Thành/Gia Bình, kết hợp xe ôm/taxi ngắn vào làng.",
      parking: "Gửi xe tại các cửa hàng, xưởng sản xuất lớn hoặc xung quanh Đình làng Đại Bái."
    },
    experiences: [
      "Lắng nghe âm thanh gò đúc đặc trưng: Tiếng búa gò đồng lách cách, tiếng đục, tiếng khò lửa vang lên từ các xưởng sản xuất tạo bầu không khí nhộn nhịp đậm chất nghệ nhân.",
      "Khám phá quy trình nghệ thuật thủ công: Xem nghệ nhân nung đồng, đổ khuôn, kỹ thuật gò chạm nổi tỉ mỉ trên tấm kim loại phẳng biến chúng thành tác phẩm đường nét uyển chuyển.",
      "Mua sắm đồ đồng nghệ thuật & phong thủy: Chiêm ngưỡng và chọn mua tranh đồng chạm khắc thủ công, đồ decor, vật phẩm phong thủy tinh xảo trực tiếp từ xưởng."
    ],
    checkInSpots: [
      "Khu vực xưởng gò đúc nghệ thuật: Khoảnh khắc thợ thủ công bên ánh lửa lò đúc hoặc miệt mài chạm trổ chi tiết hoa văn dưới ánh sáng tự nhiên.",
      "Khu trưng bày sản phẩm đồng lấp lánh: Showroom với vô vàn sắc màu ánh đồng (đồng đỏ, đồng vàng, đồng giả cổ) lung linh dưới ánh đèn.",
      "Đình làng Đại Bái: Ngôi đình cổ kính nơi thờ tổ nghề Nguyễn Công Triều và các thành hoàng làng, không gian thanh tịnh trầm mặc."
    ],
    source: "ivivu.com"
  },
  {
    id: "thach-xa",
    name: "Làng chuồn chuồn tre Thạch Xá",
    region: "west",
    regionLabel: "Phía Tây • Thạch Thất",
    category: "Đồ chơi tre thủ công nghệ thuật",
    location: "Xã Thạch Xá, huyện Thạch Thất, Hà Nội (dưới chân Chùa Tây Phương)",
    distance: "Cách trung tâm thủ đô Hà Nội khoảng 35 – 40 km về phía Tây.",
    shortDistance: "36km • Phía Tây",
    description: "Làng nghề độc đáo dưới chân Chùa Tây Phương sáng tạo nên những chú chuồn chuồn tre tự thăng bằng trên đầu ngón tay. Món quà lưu niệm đậm hồn quê Việt Nam, gắn liền với ký ức tuổi thơ đã xuất khẩu đi nhiều nước.",
    tags: ["Chuồn chuồn thăng bằng", "Chân chùa Tây Phương", "Nghệ thuật tre trúc", "Ký ức tuổi thơ"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Thach_Xa_bamboo_dragonflies.jpg/1200px-Thach_Xa_bamboo_dragonflies.jpg",
    watermark: "THẠCH XÁ",
    mapQuery: "Lang+chuon+chuon+tre+Thach+Xa+Thach+That",
    busRoute: "Bắt tuyến buýt số 89 (BX Yên Nghĩa – BX Sơn Tây) chạy qua khu vực Chùa Tây Phương, xuống trạm đi bộ 500m.",
    bestTime: "Quanh năm, kết hợp trẩy hội danh thắng Chùa Tây Phương mùa xuân.",
    highlights: [
      "Kỹ thuật gọt thân tạo trọng tâm thăng bằng kỳ diệu trên đầu ngón tay",
      "Hàng trăm chú chuồn chuồn tre ngũ sắc rực rỡ phơi trên giàn tre",
      "Trải nghiệm tự tay tô màu, trang trí họa tiết chuồn chuồn mang về"
    ],
    history: "Nghề làm chuồn chuồn tre tại Thạch Xá đã có lịch sử phát triển hơn 20 năm. Ban đầu làm đồ chơi truyền thống bằng tre nứa, sau đó chuyên sâu chế tác chuồn chuồn tre và trở thành thương hiệu độc đáo có một không hai, gắn liền với ký ức tuổi thơ và xuất khẩu đi nhiều quốc gia.",
    transportDetail: {
      motorcycle: "Đi bằng phương tiện cá nhân: Theo Đại lộ Thăng Long khoảng 25 km, đến nút giao Hòa Lạc/Thạch Thất rẽ phải theo biển chỉ dẫn Chùa Tây Phương, làng nằm ngay dưới chân núi.",
      bus: "Đi bằng xe buýt: Tuyến buýt số 89 (BX Yên Nghĩa – BX Sơn Tây) qua khu vực gần Chùa Tây Phương, xuống trạm đi bộ 500m vào làng.",
      parking: "Gửi xe tại các hộ làm nghề hoặc khu vực gửi xe Chùa Tây Phương."
    },
    experiences: [
      "Khám phá quy trình làm chuồn chuồn thủ công: Xem nghệ nhân chọn tre già (Hòa Bình, Vĩnh Phúc), chẻ nan, cạo gọt thân, làm cánh, phơi khô và vẽ hoa văn sặc sỡ.",
      "Tự tay tô màu/lắp ráp chuồn chuồn: Tự mình tô vẽ họa tiết lên chú chuồn chuồn tre theo sở thích dưới sự hướng dẫn của nghệ nhân.",
      "Mua quà lưu niệm độc đáo: Chọn mua các bộ chuồn chuồn tre đủ kích cỡ, màu sắc rực rỡ mang về làm quà hoặc trang trí góc học tập."
    ],
    checkInSpots: [
      "Khu vực phơi và trưng bày chuồn chuồn rực rỡ: Hàng trăm con chuồn chuồn đủ sắc màu cầu vồng xếp đàn hoặc phơi trên giàn tre cực kỳ bắt mắt.",
      "Không gian các xưởng thủ công mộc mạc: Hình ảnh nghệ nhân miệt mài bên đống nan tre, cọ vẽ dưới hiên nhà đậm chất làng nghề Bắc Bộ.",
      "Khu vực đường lên Chùa Tây Phương: Bậc đá ong cổ kính rêu phong và không gian thanh tịnh dưới chân núi."
    ],
    source: "Google Maps"
  },
  {
    id: "chang-son-quat",
    name: "Làng quạt Chàng Sơn",
    region: "west",
    regionLabel: "Phía Tây • Thạch Thất",
    category: "Làng nghề quạt thủ công",
    location: "Xã Chàng Sơn, huyện Thạch Thất, Hà Nội",
    distance: "Nằm cách trung tâm thủ đô Hà Nội khoảng 30 – 35 km về phía Tây.",
    shortDistance: "32km • Phía Tây",
    description: "Cái nôi sản xuất quạt thủ công lâu đời và nổi tiếng nhất xứ Đoài từ thế kỷ XIX, từng tham gia triển lãm tại Paris thời Pháp thuộc. Đa dạng từ quạt giấy, quạt vải, quạt tranh mỹ nghệ đến quạt phong thủy và quạt khổng lồ decor.",
    tags: ["Quạt giấy xứ Đoài", "Triển lãm Paris", "Quạt tranh thủy mặc", "Sân phơi nan quạt"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Traditional_hand_fans_Chang_Son.jpg/1200px-Traditional_hand_fans_Chang_Son.jpg",
    watermark: "CHÀNG SƠN",
    mapQuery: "Lang+quat+Chang+Son+Thach+That",
    busRoute: "Tuyến buýt 89 hoặc 107 xuống trạm Tỉnh lộ 419 (gần ngã ba rẽ vào Chàng Sơn) bắt xe ôm/taxi 1-2km.",
    bestTime: "Mùa hè và thu nắng ráo, sân phơi quạt rực rỡ sắc màu.",
    highlights: [
      "Quy trình chẻ vót nan, bấm lỗ, dán giấy/vải và vẽ hoa văn tỉ mỉ",
      "Chiêm ngưỡng quạt tranh thủy mặc, thư pháp và quạt đại cảnh khổng lồ",
      "Tự tay dán giấy và vẽ họa tiết lên chiếc quạt lưu niệm cá nhân"
    ],
    history: "Nghề làm quạt giấy ở Chàng Sơn có lịch sử hàng trăm năm từ thế kỷ XIX, là một trong những cái nôi sản xuất quạt thủ công lâu đời và nổi tiếng nhất xứ Đoài. Quạt Chàng Sơn từng nổi tiếng khắp Nam Bắc và được mang đi triển lãm tại Pháp thời thuộc địa. Sản phẩm phong phú từ quạt giấy, vải, quạt tranh mỹ nghệ đến quạt decor khổng lồ.",
    transportDetail: {
      motorcycle: "Theo Đại lộ Thăng Long 20 - 25 km, rẽ phải vào Tỉnh lộ 419 hướng Thạch Thất/Chùa Tây Phương. Chạy thẳng qua huyện vài km thấy biển chỉ dẫn rẽ vào Chàng Sơn.",
      bus: "Đi tuyến buýt 89 hoặc 107 có lộ trình qua huyện Thạch Thất, xuống điểm dừng Tỉnh lộ 419 đi xe ôm/taxi 1-2km vào làng.",
      parking: "Gửi xe tại Nhà văn hóa xã, sân Đình Chàng Sơn hoặc xưởng quạt lớn."
    },
    experiences: [
      "Khám phá quy trình làm quạt tỉ mỉ: Quan sát chọn tre, ngâm tre, chẻ nan, vót nan, bấm lỗ, xâu nan, dán giấy/vải, vẽ hoa văn và phơi quạt.",
      "Chiêm ngưỡng quạt tranh nghệ thuật: Ghé thăm nhà nghệ nhân ngắm nhìn chiếc quạt vẽ thư pháp, tranh thủy mặc hoặc đục lỗ hoa văn cầu kỳ.",
      "Tự tay làm chiếc quạt lưu niệm: Tự tay dán giấy, chọn nan và vẽ họa tiết đơn giản lên chiếc quạt mang về làm quà kỷ niệm."
    ],
    checkInSpots: [
      "Sân phơi quạt rực rỡ sắc màu: Khoảng sân nhà hay ven đường ngập tràn nan quạt, xòe quạt phơi nắng đỏ, vàng, xanh bắt mắt.",
      "Không gian xưởng thủ công quạt: Các mảng tường treo đầy quạt các cỡ từ tí hon đến quạt treo tường khổng lồ mang màu sắc dân gian.",
      "Đình làng Chàng Sơn: Ngôi đình cổ mang nét kiến trúc truyền thống trầm mặc xứ Đoài."
    ],
    source: "Google Maps"
  },
  {
    id: "nghia-dong",
    name: "Làng quạt lá châm nón Nghĩa Đồng",
    region: "south",
    regionLabel: "Tây Nam • Chương Mỹ",
    category: "Quạt lá cọ & Nón chằm thủ công",
    location: "Thôn Nghĩa Đồng, xã Đại Yên, huyện Chương Mỹ, Hà Nội",
    distance: "Nằm cách trung tâm thủ đô Hà Nội khoảng 30 – 35 km về phía Tây Nam.",
    shortDistance: "32km • Tây Nam",
    description: "Làng nghề chằm nón lá và đan quạt lá cọ hàng trăm năm. Bằng đôi bàn tay khéo léo cùng kim chỉ cước, người dân chằm cẩn thận từng lá cọ vào nan tre tạo nên sản phẩm quạt lá mát rượi, mộc mạc, siêu bền và thân thiện môi trường.",
    tags: ["Quạt lá cọ", "Kỹ thuật chằm tay", "Thân thiện môi trường", "Bình yên xứ quê"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Palm_leaf_fans_Nghia_Dong.jpg/1200px-Palm_leaf_fans_Nghia_Dong.jpg",
    watermark: "NGHĨA ĐỒNG",
    mapQuery: "Thon+Nghia+Dong+Dai+Yen+Chuong+My",
    busRoute: "Bắt tuyến buýt 72 hoặc 114 trên Quốc lộ 6 xuống ngã rẽ Đại Yên, bắt xe ôm/taxi 2-3km vào thôn Nghĩa Đồng.",
    bestTime: "Các tháng hè thu nắng ráo khi sân phơi lá cọ ngập sắc vàng ươm.",
    highlights: [
      "Kỹ thuật chằm (khâu) lá cọ thủ công bằng kim cước chắc chắn và tỉ mỉ",
      "Sân phơi lá cọ vàng óng rực nắng đậm chất làng quê đồng bằng Bắc Bộ",
      "Thử cầm kim chằm quạt lá và mua sản phẩm mộc mạc giá gốc tại xưởng"
    ],
    history: "Nghề chằm nón và đan quạt lá ở Nghĩa Đồng xuất hiện từ hàng trăm năm trước, truyền qua nhiều thế hệ. Sản phẩm chính là quạt lá và nón lá chằm thủ công từ lá cọ, lá gòn, lá buông. Người dân dùng kim chỉ khâu cẩn thận từng lá cọ vào khung nan tre chắc chắn. Dù qua thời hiện đại hóa, sản phẩm vẫn được ưa chuộng nhờ độ bền, mát, mộc mạc và thân thiện môi trường.",
    transportDetail: {
      motorcycle: "Theo Quốc lộ 6 qua thị trấn Chúc Sơn, đến gần ngã ba Cồng Bộc/Chùa Trầm rẽ theo đường tỉnh đi xã Đại Yên để vào thôn Nghĩa Đồng.",
      bus: "Bắt buýt 72 (BX Yên Nghĩa – Xuân Mai) hoặc 114 (BX Yên Nghĩa – Miếu Môn) xuống ngã rẽ xã Đại Yên trên QL6, đi xe ôm/taxi 2-3km vào làng.",
      parking: "Gửi xe tại sân Nhà văn hóa thôn Nghĩa Đồng hoặc nhà các hộ làm nghề."
    },
    experiences: [
      "Khám phá kỹ thuật chằm nón & làm quạt lá: Quan sát chọn lá, phơi lá, phẳng lá bằng bàn là nóng, vót nan tre, chằm lá cọ bằng chỉ cước và viền mép quạt/nón.",
      "Trải nghiệm tự tay chằm lá: Nhờ các cụ, các chị trong làng hướng dẫn cách cầm kim chằm thử những đường chỉ đầu tiên trên chiếc quạt lá cọ.",
      "Mua quà lưu niệm đậm chất mộc mạc: Chọn mua chiếc quạt lá cọ mát rượi, nón lá bài thơ, nón quai thao với giá rất rẻ tại xưởng."
    ],
    checkInSpots: [
      "Không gian phơi lá cọ rực nắng: Khoảng sân nhà rợp sắc vàng nhạt của lá cọ xòe rộng phơi nắng tạo khung cảnh yên bình đậm chất quê.",
      "Góc sản xuất thủ công dưới hiên nhà: Các cụ bà, chị em ngồi quây quần khâu nón, làm quạt dưới hiên nhà cổ hay mái sân gạch đỏ rêu phong.",
      "Cảnh quan làng quê Chương Mỹ: Con đường làng yên ả, bờ ao, rặng tre cùng các nếp nhà truyền thống quanh xã Đại Yên."
    ],
    source: "ivivu.com, traveloka.com"
  },
  {
    id: "ngu-xa",
    name: "Làng đúc đồng Ngũ Xã",
    region: "north",
    regionLabel: "Nội đô • Ba Đình",
    category: "Làng nghề & Phố ẩm thực di sản",
    location: "Bán đảo Ngũ Xã, phường Trúc Bạch, quận Ba Đình, Hà Nội",
    distance: "Ngay trung tâm Hà Nội ven hồ Trúc Bạch, cách Hồ Hoàn Kiếm chỉ khoảng 3 km.",
    shortDistance: "3km • Trung tâm",
    description: "Làng đúc đồng cổ kính hình thành từ thời nhà Lê tụ hội thợ giỏi của 5 làng nghề danh tiếng. Nơi sở hữu pho tượng Phật Thích Ca Mâu Ni bằng đồng nguyên khối 12,3 tấn tại Chùa Thần Quang, nay phát triển thành phố đi bộ - ẩm thực phở cuốn nức tiếng.",
    tags: ["Đúc đồng Thăng Long", "Tượng Phật 12.3 tấn", "Phở cuốn Ngũ Xã", "Phố đi bộ Đảo Ngọc"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ngu_Xa_bronze_casting_pagoda.jpg/1200px-Ngu_Xa_bronze_casting_pagoda.jpg",
    watermark: "NGŨ XÃ",
    mapQuery: "Pho+Ngu+Xa+Truc+Bach+Ba+Dinh",
    busRoute: "Bắt các tuyến buýt 31, 50, 55A, 55B, 86, E05, E09 dừng tại đường Yên Phụ hoặc Quán Thánh, đi bộ 300m - 500m.",
    bestTime: "Chiều tà và buổi tối cuối tuần khi phố ẩm thực lên đèn rực rỡ.",
    highlights: [
      "Pho tượng Phật Thích Ca Mâu Ni bằng đồng nguyên khối 12,3 tấn tại Chùa Thần Quang",
      "Thưởng thức phở cuốn & phở chiên phồng chính gốc Ngũ Xã nức tiếng",
      "Dạo phố ẩm thực kết hợp đi bộ Đảo Ngọc - Ngũ Xã ven hồ Trúc Bạch lộng gió"
    ],
    history: "Làng hình thành từ thời nhà Lê (thế kỷ XVII). Khi đó thợ giỏi từ 5 làng đúc đồng nổi tiếng vùng Đông Cùng (Bắc Ninh) và Hải Dương (Đông Mai, Châu Mỹ, Long Mai, Đào Viên, Điện Tiền) tụ họp về đây lập xưởng, tạo nên tên gọi Ngũ Xã (5 làng). Kỹ thuật đúc đồng nguyên khối tinh xảo làm nên tượng Phật Thích Ca Mâu Ni 12,3 tấn tại chùa Thần Quang (1952). Ngày nay nơi đây vừa duy trì nghề vừa là tuyến phố ẩm thực - đi bộ sầm uất.",
    transportDetail: {
      motorcycle: "Từ Hoàn Kiếm/Phố Cổ đi theo Trần Nhật Duật/Yên Phụ hoặc Quán Thánh/Phan Đình Phùng, rẽ vào Nguyễn Trường Tộ rồi rẽ vào bán đảo Ngũ Xã.",
      bus: "Đi tuyến buýt 31, 50, 55A/B, 86, E05, E09 xuống trạm Yên Phụ hoặc Quán Thánh rồi đi bộ 300m - 500m qua hồ Trúc Bạch vào phố Ngũ Xã.",
      parking: "Gửi xe quanh khu vực phố đi bộ Ngũ Xã, phố Trúc Bạch hoặc các quán ăn trong làng."
    },
    experiences: [
      "Chiêm ngưỡng kiệt tác tượng Phật tại Chùa Thần Quang: Ghé Chùa Ngũ Xã tận mắt chiêm ngưỡng pho tượng Phật Thích Ca Mâu Ni đúc đồng nguyên khối cao gần 4m, nặng hơn 12 tấn từ năm 1952.",
      "Tìm hiểu lịch sử đúc đồng: Ghé thăm xưởng trưng bày đồ đồng mỹ nghệ Ngũ Xã tìm hiểu quy trình làm khuôn đất, nấu đồng và chạm khắc.",
      "Thưởng thức ẩm thực Ngũ Xã danh tiếng: Ăn phở cuốn và phở chiên phồng chính gốc, lẩu ếch Trúc Bạch và cà phê ngắm cảnh hồ.",
      "Dạo phố đi bộ đêm Ngũ Xã: Tham gia hoạt động văn hóa ngoài trời vào buổi tối cuối tuần tại Phố ẩm thực kết hợp đi bộ Đảo Ngọc - Ngũ Xã."
    ],
    checkInSpots: [
      "Góc phố ven hồ Trúc Bạch: Khung cảnh thơ mộng bên bờ hồ với hàng cây rợp bóng và các quán cà phê vintage.",
      "Kiến trúc Chùa Thần Quang & Đình Ngũ Xã: Công trình Phật giáo cổ kính uy nghiêm nằm êm đềm giữa lòng phố thị náo nhiệt.",
      "Phố ẩm thực Đảo Ngọc rực rỡ đèn lồng: Buổi tối con phố thắp sáng lung linh, thích hợp dạo phố chụp ảnh đời sống sôi động."
    ],
    source: "Google Maps"
  },
  {
    id: "hong-ha",
    name: "Làng làm diều sáo Hồng Hà",
    region: "west",
    regionLabel: "Tây Bắc • Đan Phượng",
    category: "Di sản văn hóa phi vật thể",
    location: "Thôn Bá Dương Nội, xã Hồng Hà, huyện Đan Phượng, Hà Nội",
    distance: "Ven bờ bắc sông Hồng, cách trung tâm thủ đô Hà Nội khoảng 20 – 25 km về phía Tây Bắc.",
    shortDistance: "22km • Tây Bắc",
    description: "Ngôi làng ven sông Hồng nghìn năm lưu giữ thú chơi diều sáo tâm linh gắn với Miếu Diều cổ kính. Lễ hội diều truyền thống được vinh danh là Di sản văn hóa phi vật thể quốc gia (2024), nổi tiếng với kỹ thuật làm sáo diều gỗ vàng tâm âm vang ngân nga hàng cây số.",
    tags: ["Di sản phi vật thể 2024", "Miếu Diều cổ kính", "Sáo diều vàng tâm", "Thả diều triền đê"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ba_Duong_Noi_flute_kites.jpg/1200px-Ba_Duong_Noi_flute_kites.jpg",
    watermark: "HỒNG HÀ",
    mapQuery: "Thon+Ba+Duong+Noi+Hong+Ha+Dan+Phuong",
    busRoute: "Bắt tuyến buýt 20A, 29, 117 chạy qua QL32 xuống khu vực Nhổn/Trôi rồi đi taxi/xe ôm vào xã Hồng Hà.",
    bestTime: "Dịp Lễ hội thả diều truyền thống ngày 15 tháng 3 âm lịch hoặc những buổi chiều hè thu lộng gió.",
    highlights: [
      "Lễ hội diều Bá Dương Nội Di sản văn hóa phi vật thể quốc gia",
      "Kỹ thuật khoét sáo diều gỗ vàng tâm ngân vang trầm bổng hàng cây số",
      "Trải nghiệm thả diều sáo trên triền đê sông Hồng cỏ xanh lộng gió"
    ],
    history: "Làng Bá Dương Nội có lịch sử gắn liền với nền văn minh lúa nước và tín ngưỡng thờ Thần Giao Châu tại ngôi Miếu Diều cổ kính. Thú chơi và làm diều sáo nơi đây đã có từ hàng trăm năm. Đầu năm 2024, 'Hội Diều làng Bá Dương Nội' chính thức được Bộ VHTTDL đưa vào Danh mục Di sản văn hóa phi vật thể quốc gia. Nghệ nhân nổi tiếng với kỹ thuật chế tác sáo diều thủ công bịt gỗ vàng tâm tạo âm thanh ngân vang đặc trưng.",
    transportDetail: {
      motorcycle: "Từ trung tâm theo Quốc lộ 32 qua Nhổn - Hoài Đức, rẽ hướng đê sông Hồng sang huyện Đan Phượng để đến xã Hồng Hà và vào thôn Bá Dương Nội.",
      bus: "Đi tuyến buýt 20A (Cầu Giấy – Sơn Tây), 29 (Giáp Bát – Tân Lập) hoặc 117 (Hòa Lạc – Nhổn) xuống gần Trôi / Nhổn rồi đi taxi/xe ôm vào xã.",
      parking: "Gửi xe tại Nhà văn hóa thôn, quanh Miếu Diều hoặc tại nhà nghệ nhân."
    },
    experiences: [
      "Tham gia Lễ hội thả diều truyền thống: Ghé thăm dịp 15 tháng 3 âm lịch hằng năm, hòa mình vào Hội thi thả diều lớn nhất vùng tại Miếu Diều với hàng trăm cánh diều sáo tranh tài.",
      "Tìm hiểu quy trình chế tác diều và sáo: Xem nghệ nhân chọn tre già 'mép voi', vót khung, đan lưới phất giấy dó quét nhựa tự nhiên chống thấm và lắng nghe bí quyết khoét sáo chỉnh âm.",
      "Trải nghiệm thả diều trên triền đê sông Hồng: Ngắm không gian đồng cỏ xanh ngát lộng gió ven sông Hồng và thả cánh diều sáo bay cao."
    ],
    checkInSpots: [
      "Khu vực Miếu Diều linh thiêng: Ngôi miếu cổ kính mang kiến trúc truyền thống di tích cấp Thành phố nơi lưu giữ hồn cốt văn hóa diều làng.",
      "Triền đê sông Hồng lộng gió: Cung đường đê ngút ngàn tầm mắt với khung cảnh đồng quê thanh bình, lý tưởng chụp ảnh cùng cánh diều no gió.",
      "Không gian xưởng thủ công nghệ nhân: Góc làm việc mộc mạc ngập tràn nan tre, giấy dó và bộ sáo diều tinh xảo."
    ],
    source: "thanglong.chinhphu.vn, danviet.vn"
  },
  {
    id: "trach-xa",
    name: "Làng may áo dài Trạch Xá",
    region: "south",
    regionLabel: "Phía Nam • Ứng Hòa",
    category: "Nghề may áo dài thủ công gia truyền",
    location: "Thôn Trạch Xá, xã Hòa Lâm, huyện Ứng Hòa, Hà Nội",
    distance: "Ven bờ sông Đáy, cách trung tâm thủ đô Hà Nội khoảng 40 – 45 km về phía Nam.",
    shortDistance: "42km • Phía Nam",
    description: "Cái nôi ngàn năm may áo dài truyền thống từ thời nhà Đinh thờ Đức thánh tổ Nguyễn Thị Sen. Nơi lưu giữ kỹ thuật khâu tay 'năm mũi một' độc nhất vô nhị, từng tà áo dài thướt tha, mềm mại ôm dáng mà không hề lộ đường kim mũi chỉ.",
    tags: ["May áo dài ngàn năm", "Bà tổ Nguyễn Thị Sen", "Khâu tay giấu chỉ", "Làng thợ may phố cổ"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Trach_Xa_Ao_Dai_Tailoring.jpg/1200px-Trach_Xa_Ao_Dai_Tailoring.jpg",
    watermark: "TRẠCH XÁ",
    mapQuery: "Lang+may+ao+dai+Trach+Xa+Hoa+Lam+Ung+Hoa",
    busRoute: "Bắt tuyến buýt 78 (Mỹ Đình – Tế Tiêu) hoặc 103A/103B (Mỹ Đình – Hương Sơn) xuống ngã ba Vân Đình, bắt xe ôm vào làng.",
    bestTime: "Quanh năm, các dịp lễ tết và mùa cưới, mùa kỷ yếu thu đông.",
    highlights: [
      "Kỹ thuật khâu tay 'năm mũi một' giấu đường chỉ tinh tế tuyệt đối",
      "Đền thờ Đức thánh tổ nghề may Áo dài Nguyễn Thị Sen ngàn năm",
      "Trải nghiệm may đo hoặc thuê áo dài lụa truyền thống chuẩn phom dáng"
    ],
    history: "Tương truyền nghề may áo dài tại Trạch Xá có lịch sử từ thời nhà Đinh (thế kỷ X). Người có công truyền dạy nghề là Đức thánh tổ Nguyễn Thị Sen – vương phi vua Đinh Tiên Hoàng. Những người thợ tài hoa Trạch Xá đã lập nên các 'phố thợ may' nổi tiếng tại Hà Nội (Cầu Gỗ, Hàng Bông...). Kỹ thuật khâu tay 'năm mũi một' làm cho tà áo mềm mại, ôm dáng, không lộ đường chỉ mà bền chắc tuyệt đối.",
    transportDetail: {
      motorcycle: "Từ trung tâm theo đường Nguyễn Trãi qua Ba La (Hà Đông), đi thẳng Quốc lộ 21B qua Thanh Oai xuống thị trấn Vân Đình (Ứng Hòa), tiếp tục đi về xã Hòa Lâm vào thôn Trạch Xá.",
      bus: "Đi tuyến buýt 78 hoặc 103A/103B xuống trạm gần thị trấn Vân Đình hoặc ngã ba Hòa Lâm, đi xe ôm/taxi ngắn vào làng Trạch Xá.",
      parking: "Gửi xe tại sân Đình làng Trạch Xá hoặc tại nhà các nghệ nhân, nhà may lớn."
    },
    experiences: [
      "Chiêm ngưỡng quy trình may áo dài thủ công: Tận mắt xem nghệ nhân bên thước dây, phấn vẽ, đặc biệt kỹ thuật cầm kim khâu tay thoăn thoắt tạo tà áo dài thướt tha.",
      "Đặt may hoặc thử áo dài truyền thống: Trực tiếp lựa chọn những thước vải lụa cao cấp và đặt may chiếc áo dài chuẩn dáng truyền thống.",
      "Thăm nơi thờ Tổ nghề: Ghé thăm Đình làng Trạch Xá thờ bà tổ nghề Nguyễn Thị Sen, tìm hiểu đạo lý uống nước nhớ nguồn."
    ],
    checkInSpots: [
      "Không gian phơi lụa & trưng bày áo dài: Hàng loạt tà áo dài đủ màu sắc rực rỡ treo trang trọng, hoặc thợ may ngồi bên khung thêu dưới hiên nhà cổ.",
      "Đình làng Trạch Xá thanh tịnh: Kiến trúc truyền thống mang dấu ấn làng quê Bắc Bộ yên bình hoài cổ.",
      "Con đường làng ven sông Đáy: Cảnh sắc mộc mạc cây đa, bến nước, ngõ nhỏ yên ả, rất hợp thực hiện bộ ảnh áo dài truyền thống."
    ],
    source: "doanhnghieptiepthi.vn, vietnamnet.vn"
  },
  {
    id: "chuon-ngo",
    name: "Làng khảm trai Chuôn Ngọ",
    region: "south",
    regionLabel: "Phía Nam • Phú Xuyên",
    category: "Nghệ thuật khảm trai ốc xà cừ",
    location: "Thôn Chuôn Ngọ (Ngọ Xá), xã Chuyên Mỹ, huyện Phú Xuyên, Hà Nội",
    distance: "Ven bờ sông Nhuệ, cách trung tâm thủ đô Hà Nội khoảng 35 – 40 km về phía Nam.",
    shortDistance: "38km • Phía Nam",
    description: "Cái nôi nghệ thuật khảm xà cừ nghìn năm từ thời nhà Lý do danh tướng Trương Công Thành truyền dạy. Nơi những mảnh vỏ trai, vỏ ốc xà cừ ngũ sắc qua tài hoa cưa, đục, mài của nghệ nhân biến thành các tác phẩm tranh phong cảnh, sập gụ tủ chè lấp lánh ánh quang phổ sang trọng.",
    tags: ["Khảm xà cừ ngàn năm", "Vỏ ốc ngũ sắc", "Tổ nghề Trương Công Thành", "Đồ gỗ ngự dụng"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Chuon_Ngo_mother_of_pearl_inlay.jpg/1200px-Chuon_Ngo_mother_of_pearl_inlay.jpg",
    watermark: "CHUÔN NGỌ",
    mapQuery: "Lang+kham+trai+Chuon+Ngo+Chuyen+My+Phu+Xuyen",
    busRoute: "Bắt tuyến buýt 06A (BX Giáp Bát – Cầu Giẽ) xuống điểm dừng thị trấn Phú Xuyên rồi đi taxi/xe ôm ngắn vào xã Chuyên Mỹ.",
    bestTime: "Quanh năm, các tháng cuối năm làng nghề rộn ràng chuẩn bị đồ thờ và nội thất Tết.",
    highlights: [
      "Kỹ thuật cưa lọng, đục gỗ và khảm ốc xà cừ ngũ sắc tỉ mỉ từng milimet",
      "Chiêm ngưỡng kiệt tác hoành phi câu đối, sập gụ tủ chè và tranh khảm trai",
      "Đình làng Chuôn Ngọ cổ kính thờ Thành hoàng và tổ nghề Trương Công Thành"
    ],
    history: "Nghề khảm trai tại Chuôn Ngọ có lịch sử lâu đời từ thời nhà Lý (thế kỷ XI). Ông tổ nghề là danh tướng Trương Công Thành sau khi cáo quan về quê đã dạy nghề cho dân làng. Xưa kia sản phẩm khảm trai Chuôn Ngọ thường được tiến cống triều đình ngự dụng, nay xuất khẩu nhiều nước. Vỏ trai, vỏ ốc xà cừ được chọn lọc kỹ lưỡng, mài mỏng dính rồi đục khắc gắn lên gỗ sưa, gụ, trắc tạo tác phẩm lấp lánh bền bỉ.",
    transportDetail: {
      motorcycle: "Từ trung tâm theo đường Giải Phóng / QL1A cũ hoặc cao tốc Pháp Vân – Cầu Giẽ xuống nút Thường Tín, đi theo tỉnh lộ về huyện Phú Xuyên rẽ vào xã Chuyên Mỹ đến thôn Chuôn Ngọ.",
      bus: "Đi tuyến buýt 06A (BX Giáp Bát – Cầu Giẽ) xuống trạm thị trấn Phú Xuyên rồi bắt xe ôm/taxi ngắn vào làng.",
      parking: "Gửi xe tại Nhà văn hóa thôn, sân đình làng Chuôn Ngọ hoặc các xưởng lớn."
    },
    experiences: [
      "Khám phá quy trình khảm trai công phu: Xem vẽ mẫu giấy, mài mảnh trai mỏng tang, đục gỗ theo nét vẽ, gắn keo (sơn ta), mài nhẵn và đánh bóng để bức tranh hiện lên óng ánh sắc xà cừ.",
      "Chiêm ngưỡng kiệt tác đồ gỗ khảm trai: Ghé phòng trưng bày ngắm sập gụ tủ chè, bức hoành phi câu đối, tranh treo tường, hộp đựng trà tinh xảo.",
      "Thăm nơi thờ Tổ nghề: Ghé Đình làng Chuôn Ngọ thờ Thành hoàng và ông tổ nghề Trương Công Thành tìm hiểu văn hóa tâm linh làng nghề."
    ],
    checkInSpots: [
      "Không gian xưởng sản xuất thủ công: Hình ảnh nghệ nhân miệt mài bên bàn cưa tay, chăm chú đục đẽo từng mảnh vỏ trai dưới ánh sáng tự nhiên.",
      "Khu vực trưng bày sản phẩm lấp lánh ánh xà cừ: Các gian phòng phản chiếu ánh sáng ngũ sắc lấp lánh sang trọng.",
      "Cổng làng và đường làng Chuôn Ngọ: Cổng làng cổ kính cùng những ngõ xóm yên bình bên bờ sông Nhuệ mang đậm nét hoài niệm."
    ],
    source: "nhandan.vn, vietnam.vnanet.vn"
  },
  {
    id: "xuan-la",
    name: "Làng làm tò he Xuân La",
    region: "south",
    regionLabel: "Phía Nam • Phú Xuyên",
    category: "Nghệ thuật nặn tò he dân gian",
    location: "Thôn Xuân La, xã Phượng Dực, huyện Phú Xuyên, Hà Nội",
    distance: "Cách trung tâm thủ đô Hà Nội khoảng 40km về phía Nam.",
    shortDistance: "40km • Phía Nam",
    description: "Ngôi làng duy nhất gìn giữ nghề nặn tò he bằng bột gạo nếp hơn 3 thế kỷ. Nơi những nắm bột màu chiết xuất từ hoa quả tự nhiên (gấc đỏ, nghệ vàng, lá nếp xanh) qua bàn tay điêu luyện 3-5 phút biến hóa thành nhân vật cổ tích và linh vật sống động.",
    tags: ["Tò he 300 năm", "Bột gạo nếp tự nhiên", "Nghệ nhân nặn thần tốc", "Ký ức dân gian"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Xuan_La_To_He_craft_village.jpg/1200px-Xuan_La_To_He_craft_village.jpg",
    watermark: "XUÂN LA",
    mapQuery: "Thon+Xuan+La+Phuong+Duc+Phu+Xuyen",
    busRoute: "Bắt tuyến buýt 06A (BX Giáp Bát – Cầu Giẽ) hoặc 108 xuống gần nút giao Đỗ Xá / Tỉnh lộ 429, đi xe ôm 3-5km vào Xuân La.",
    bestTime: "Dịp lễ hội đầu xuân, Tết Trung thu và Tết Thiếu nhi khi khắp làng rộn rã tiếng còi tò he.",
    highlights: [
      "Bí quyết luộc bột nếp dẻo mịn phối màu tự nhiên từ gấc, lá nếp, củ nghệ",
      "Tận mắt xem nghệ nhân nặn thần tốc chỉ mất 3 - 5 phút cho một tác phẩm",
      "Tự tay trải nghiệm nhào bột, tạo hình nhân vật tò he theo ý thích mang về"
    ],
    history: "Nghề nặn tò he ở Xuân La đã tồn tại hơn 3 thế kỷ, ban đầu gọi là 'chim cò bằng bột' hay 'bánh chim cò'. Tên gọi tò he xuất phát từ việc thợ gắn chiếc còi nhỏ ở đầu sản phẩm thổi phát ra tiếng tò-te-tò-he vui tai. Bột nặn làm từ bột gạo nếp luộc chín phối màu tự nhiên từ gấc (đỏ), lá nếp (xanh), củ nghệ (vàng), tro bếp (đen), an toàn cho trẻ nhỏ.",
    transportDetail: {
      motorcycle: "Theo đường Giải Phóng / QL1A cũ (hoặc cao tốc Pháp Vân – Cầu Giẽ rẽ nút Đỗ Xá), tiếp tục đi theo Tỉnh lộ 429 về xã Phượng Dực vào làng Xuân La.",
      bus: "Bắt buýt 06A (BX Giáp Bát – Cầu Giẽ) hoặc 108 (BX Thường Tín – Minh Tân) xuống trạm gần nút giao Đỗ Xá / TL429, đi xe ôm/taxi 3-5km vào làng.",
      parking: "Gửi xe tại bãi xe Nhà văn hóa thôn Xuân La hoặc nhà các hộ làm nghề."
    },
    experiences: [
      "Trải nghiệm tự tay nặn Tò he: Tự tay nhào bột, nhuộm màu và dùng que tre tạo hình nhân vật tò he theo ý thích mang về dưới sự hướng dẫn của nghệ nhân.",
      "Giao lưu cùng các nghệ nhân tài hoa: Chứng kiến tốc độ nặn tò he thần tốc của nghệ nhân chỉ mất 3 - 5 phút để hoàn thành một sản phẩm tỉ mỉ.",
      "Tìm hiểu bí quyết làm bột nặn: Khám phá quy trình luộc bột nếp dẻo, mịn, không dính tay và bí quyết phối màu tự nhiên độc đáo."
    ],
    checkInSpots: [
      "Không gian rực rỡ sắc màu Tò he: Mâm bột, gánh hàng tò he ngập tràn sắc màu rực rỡ tạo nên bức nền sinh động ngộ nghĩnh.",
      "Cổng làng và khung cảnh làng quê Xuân La: Cổng làng cổ kính, những ngõ gạch đỏ yên bình đậm chất đồng bằng Bắc Bộ.",
      "Sân Nhà văn hóa & Khu trưng bày: Nơi diễn ra các hoạt động trình diễn, trưng bày tác phẩm tò he kích thước lớn đạt kỷ lục."
    ],
    source: "qdnd.vn, baomoi.com"
  },
  {
    id: "quat-dong",
    name: "Làng thêu ren Quất Động",
    region: "south",
    regionLabel: "Phía Nam • Thường Tín",
    category: "Nghệ thuật thêu tay truyền thống",
    location: "Xã Quất Động, huyện Thường Tín, Hà Nội",
    distance: "Ngay sát Quốc lộ 1A cũ, cách trung tâm thủ đô Hà Nội khoảng 20 – 25 km về phía Nam.",
    shortDistance: "22km • Phía Nam",
    description: "Cái nôi nghề thêu tay truyền thống Việt Nam từ thế kỷ XVII thờ Tiến sĩ Lê Công Hành. Nơi những sợi chỉ tơ óng ả qua mũi kim tinh tế của người thợ tài hoa dệt nên những bức tranh phong cảnh quê hương, tranh chân dung sống động như tranh vẽ và hoành phi câu đối xuất khẩu danh giá.",
    tags: ["Thêu tay truyền thống", "Tiến sĩ Lê Công Hành", "Tranh thêu phong cảnh", "Mũi kim tinh xảo"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Quat_Dong_embroidery_craft_village.jpg/1200px-Quat_Dong_embroidery_craft_village.jpg",
    watermark: "QUẤT ĐỘNG",
    mapQuery: "Lang+theu+Quat+Dong+Thuong+Tin+Ha+Noi",
    busRoute: "Bắt các tuyến buýt chạy trục QL1A như tuyến 06A (BX Giáp Bát – Cầu Giẽ) hoặc 06E (BX Giáp Bát – Phú Minh) xuống trạm Quất Động.",
    bestTime: "Quanh năm, đặc biệt dịp giỗ Tổ nghề thêu ngày 12 tháng Giêng âm lịch.",
    highlights: [
      "Kỹ thuật phối màu chỉ tơ uyển chuyển tạo chiều sâu sống động như thật",
      "Quan sát nghệ nhân thêu tranh chân dung, tranh phong cảnh bên khung gỗ",
      "Đình - Đền thờ ông tổ nghề thêu Tiến sĩ Lê Công Hành"
    ],
    history: "Tương truyền người có công truyền dạy nghề thêu cho dân làng Quất Động từ thế kỷ XVII là Tiến sĩ Lê Công Hành (Bùi Công Hành). Sau khi đi sứ học được kỹ thuật thêu và làm lọng, ông truyền lại cho dân làng, từ đó nghề thêu phát triển rực rỡ lan ra cả nước. Hằng năm vào ngày 12 tháng Giêng âm lịch dân làng tổ chức giỗ Tổ nghề. Sản phẩm: tranh thêu chân dung, phong cảnh, câu đối hoành phi, áo dài xuất khẩu.",
    transportDetail: {
      motorcycle: "Theo đường Giải Phóng / Quốc lộ 1A cũ hoặc cao tốc Pháp Vân – Cầu Giẽ rẽ nút Thường Tín, đi ngược lại theo QL1A về xã Quất Động.",
      bus: "Bắt tuyến buýt 06A (BX Giáp Bát – Cầu Giẽ), 06E (BX Giáp Bát – Phú Minh) xuống trạm dừng gần khu vực xã Quất Động trên trục QL1A, đi bộ vào làng.",
      parking: "Gửi xe tại Nhà văn hóa xã, quanh Chùa Quất Động hoặc tại các xưởng thêu lớn."
    },
    experiences: [
      "Chiêm ngưỡng quy trình thêu tranh thủ công: Quan sát nghệ nhân ngồi bên khung gỗ căng vải, khéo léo đâm kim, lướt chỉ tạo hình họa tiết tinh tế, có hồn.",
      "Trải nghiệm tập thêu cơ bản: Dưới sự hướng dẫn của thợ lành nghề, thử cầm kim, chọn chỉ và thực hiện vài đường thêu đơn giản lên mảnh vải nhỏ.",
      "Mua sắm tranh thêu làm quà kỷ niệm: Ghé phòng tranh showroom chọn mua tranh thêu tay nhỏ gọn, túi xách thêu hoặc quà lưu niệm tinh xảo."
    ],
    checkInSpots: [
      "Không gian xưởng thêu truyền thống: Hình ảnh khung thêu căng vải với các bức tranh đang làm dở, ánh sáng tự nhiên chiếu rọi bên thềm nhà nghệ thuật và bình yên.",
      "Phòng trưng bày tranh thêu lộng lẫy: Gian phòng rực rỡ sắc màu của hàng trăm bức tranh thêu tay lớn nhỏ.",
      "Đình/Chùa Quất Động: Không gian tâm linh cổ kính gắn liền với đời sống văn hóa làng nghề."
    ],
    source: "doanhnghieptiepthi.vn, hanoi.qdnd.vn"
  },
  {
    id: "tranh-khuc",
    name: "Làng làm bánh chưng Tranh Khúc",
    region: "east",
    regionLabel: "Đông Nam • Thanh Trì",
    category: "Ẩm thực truyền thống di sản",
    location: "Thôn Tranh Khúc, xã Duyên Hà, huyện Thanh Trì, Hà Nội",
    distance: "Ven bờ đê sông Hồng, cách trung tâm thủ đô Hà Nội (Hồ Hoàn Kiếm) khoảng 15km về phía Nam.",
    shortDistance: "15km • Đông Nam",
    description: "Làng nghề gói bánh chưng truyền thống hàng trăm năm nức tiếng đất Bắc ven bờ đê sông Hồng. Nơi nghệ nhân sở hữu kỹ thuật gói 'vo' bằng tay không cần khuôn chỉ mất chưa đầy 1 phút nhưng vuông vức đặn góc, nếp dẻo thơm quyện đỗ tiêu bùi thơm ngậy.",
    tags: ["Bánh chưng Tranh Khúc", "Gói vo không khuôn", "Bếp đỏ lửa ngày Tết", "Ẩm thực truyền thống"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Banh_Chung_Tranh_Khuc_village.jpg/1200px-Banh_Chung_Tranh_Khuc_village.jpg",
    watermark: "TRANH KHÚC",
    mapQuery: "Thon+Tranh+Khuc+Duyen+Ha+Thanh+Tri",
    busRoute: "Bắt tuyến buýt 08A, 12, 99 xuống khu vực ngã ba Ngũ Hiệp / Duyên Hà rồi đi taxi/xe ôm 2-3km vào thôn Tranh Khúc.",
    bestTime: "Các ngày rằm, mùng một và đặc biệt dịp cận Tết Nguyên đán rực lửa thâu đêm.",
    highlights: [
      "Kỷ lục thao tác gói 'vo' bánh chưng siêu tốc chưa đầy 30 giây đến 1 phút",
      "Không khí thức đêm bên hàng trăm bếp lửa luộc bánh rực hồng ngày giáp Tết",
      "Thưởng thức bánh chưng xanh ngọc bích nóng hổi vừa vớt khỏi nồi ngay tại xưởng"
    ],
    history: "Nghề gói bánh chưng ở Tranh Khúc đã tồn tại hàng trăm năm ven đê sông Hồng. Bánh chưng Tranh Khúc nổi tiếng nhờ nguyên liệu tuyển lựa khắt khe: nếp cái hoa vàng hạt tròn mẩy, đậu xanh tiêu lòng vàng óng, thịt ba chỉ tươi ngon và lá dong báng xanh mướt chuyển từ vùng núi cao Tây Bắc (Lào Cai, Yên Bái). Kỹ thuật gói 'vo' bằng tay không dùng khuôn vẫn vuông vức đều chằn chặn, luộc chín màu xanh tươi ngọc bích thơm bùi ngậy.",
    transportDetail: {
      motorcycle: "Theo đường Giải Phóng qua Ngọc Hồi (QL1A cũ), hoặc đi đường vành đai 3 / đê Nguyễn Khoái xuống huyện Thanh Trì, rẽ đường đê Hữu Hồng đi về xã Duyên Hà vào thôn Tranh Khúc.",
      bus: "Bắt tuyến buýt 08A, 12, 99 xuống trạm gần ngã ba Ngũ Hiệp / Duyên Hà, đi xe ôm/taxi ngắn 2 - 3 km vào làng.",
      parking: "Gửi xe tại bãi xe Nhà văn hóa thôn Tranh Khúc, quanh Đình làng hoặc tại nhà các hộ làm nghề."
    },
    experiences: [
      "Chứng kiến kỷ lục gói bánh chưng siêu tốc: Tận mắt xem thao tác thần tốc: xếp lá, đổ gạo, tra nhân, gập lá và buộc lạt chỉ mất chưa đầy 30 giây đến 1 phút cho một chiếc bánh vuông vắn.",
      "Thức đêm bên bếp lửa luộc bánh: Ghé làng dịp cận Tết trải nghiệm không khí ấm cúng khi hàng trăm bếp lửa luộc bánh rực hồng cháy suốt đêm dọc các con ngõ.",
      "Thưởng thức và mua bánh chưng nóng hổi: Thưởng thức bánh chưng vừa vớt khỏi nồi còn bốc khói ngút ngàn, vỏ dẻo quánh, vị đậm đà thơm phức tại xưởng."
    ],
    checkInSpots: [
      "Không gian bao gói và luộc bánh ngày Tết: Khung cảnh hàng nghìn chiếc bánh chưng xanh ngắt xếp thành hàng dài cùng nồi luộc khổng lồ tỏa khói nghi ngút.",
      "Khu vực phơi lá dong xanh mướt: Những khoảng sân nhà ngập tràn màu xanh tươi của lá dong rải đều chờ lau rửa và rọc lá.",
      "Không gian làng quê ven đê sông Hồng: Cảnh sắc duyên hải sông Hồng thanh bình với con đường gạch, bờ đê xanh ngát và nếp nhà rêu phong."
    ],
    source: "suckhoedoisong.vn, moitruong.net.vn"
  },
  {
    id: "chang-son-moc",
    name: "Làng mộc mỹ nghệ Chàng Sơn",
    region: "west",
    regionLabel: "Phía Tây • Thạch Thất",
    category: "Nghệ thuật điêu khắc gỗ mỹ nghệ",
    location: "Xã Chàng Sơn, huyện Thạch Thất, Hà Nội",
    distance: "Ngay dưới chân núi và gần khu di tích Chùa Tây Phương, cách trung tâm thủ đô Hà Nội khoảng 30 – 35km về phía Tây.",
    shortDistance: "32km • Phía Tây",
    description: "Làng mộc mỹ nghệ nghìn năm tuổi từng được triều đình nhà Nguyễn triệu về kinh đô Huế tạc cung điện lăng tẩm hoàng gia. Những người thợ tài hoa đã góp công dựng nên kiến trúc và tạc các pho tượng Phật tuyệt tác tại Chùa Tây Phương, nay tiếp tục lưu truyền nghề chạm trổ đồ gỗ nội thất quý phái.",
    tags: ["Mộc Chàng Sơn ngàn năm", "Thợ mộc cung đình Huế", "Tạc tượng Phật Tây Phương", "Đồ gỗ tứ linh"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Chang_Son_woodcarving_craft.jpg/1200px-Chang_Son_woodcarving_craft.jpg",
    watermark: "CHÀNG SƠN MỘC",
    mapQuery: "Lang+moc+Chang+Son+Thach+That",
    busRoute: "Bắt tuyến buýt số 89 hoặc 107 xuống trạm Tỉnh lộ 419 (gần ngã ba rẽ Chàng Sơn) bắt taxi/xe ôm 1-2km.",
    bestTime: "Quanh năm, các tháng cuối năm mùa hoàn thiện nhà cửa và đồ thờ gia tiên.",
    highlights: [
      "Kỹ thuật đục búa chạm nổi hoa lá, tứ linh (Long, Ly, Quy, Phượng) tinh xảo",
      "Di sản của những nghệ nhân từng xây dựng cung điện Huế và Chùa Tây Phương",
      "Hệ thống showroom nội thất gỗ quý (gụ, hương, trắc) hoàn thiện bóng bẩy"
    ],
    history: "Xưa kia thợ mộc Chàng Sơn nổi tiếng cả nước với tay nghề đục đẽo, chạm khắc tinh xảo, từng được triều đình nhà Nguyễn triệu về kinh đô Huế tham gia xây dựng, chạm trổ cung điện, lăng tẩm hoàng gia. Họ chính là những người chủ trì dựng nên nhiều ngôi đình, chùa cổ kính xứ Đoài (tiêu biểu như việc tạc tượng Phật và kiến trúc Chùa Tây Phương). Sản phẩm: đồ gỗ nội thất cao cấp (sập gụ, tủ chè), đồ thờ cúng chạm trổ tinh vi (hoành phi, câu đối, án gian).",
    transportDetail: {
      motorcycle: "Theo Đại lộ Thăng Long 20 - 25 km, rẽ phải vào đường Tỉnh lộ 419 (hướng Thạch Thất / Chùa Tây Phương), tiếp tục chạy theo biển chỉ dẫn hướng về xã Chàng Sơn.",
      bus: "Bắt tuyến buýt 89 hoặc 107 qua huyện Thạch Thất, xuống trạm Tỉnh lộ 419 gần xã Chàng Sơn, bắt xe ôm/taxi 1 - 2 km vào các xưởng mộc.",
      parking: "Gửi xe tại các xưởng sản xuất gỗ lớn, Nhà văn hóa xã hoặc gần khu vực di tích."
    },
    experiences: [
      "Chiêm ngưỡng kỹ thuật chạm trổ điêu luyện: Quan sát nghệ nhân dùng đục, búa thổi hồn vào khúc gỗ vô tri, tạo đường nét hoa văn hoa lá, tứ linh sắc sảo.",
      "Khám phá quy trình làm mộc thủ công: Tìm hiểu khâu lựa chọn gỗ quý (gụ, hương, gõ đỏ), xẻ gỗ, tạo khung, sơn PU hoặc đánh vecni thủ công.",
      "Đặt mua đồ gỗ thủ công: Tham quan showroom và đặt mua nội thất, đồ thờ cúng, đồ gỗ mỹ nghệ tinh xảo trực tiếp tận xưởng."
    ],
    checkInSpots: [
      "Không gian các xưởng mộc truyền thống: Khung cảnh ngập tràn phôi gỗ, mạt cưa cùng thợ mộc miệt mài bên nét đục đẽo dưới ánh sáng tự nhiên.",
      "Khu phòng đồ gỗ mỹ nghệ lấp lánh: Showroom trưng bày sản phẩm nội thất gỗ hoàn thiện bóng bẩy, chạm trổ cầu kỳ sang trọng.",
      "Cảnh quan làng nghề Chàng Sơn: Con ngõ làng yên bình đặc trưng vùng quê Thạch Thất kết hợp ghé thăm di tích quanh vùng."
    ],
    source: "toplist.vn, dantra.vn, qdnd.vn"
  },
  {
    id: "da-sy",
    name: "Làng rèn Dao Dẫy Đa Sỹ",
    region: "south",
    regionLabel: "Tây Nam • Hà Đông",
    category: "Làng nghề rèn kim khí truyền thống",
    location: "Phường Kiến Hưng, quận Hà Đông, Hà Nội (ven sông Nhuệ)",
    distance: "Cách trung tâm thủ đô Hà Nội (khu vực Hồ Hoàn Kiếm) khoảng 10 – 12 km về phía Tây Nam.",
    shortDistance: "11km • Tây Nam",
    description: "Làng rèn truyền thống hơn 500 năm ven bờ sông Nhuệ. Thương hiệu 'Dao Đa Sỹ' nổi tiếng khắp toàn quốc nhờ độ sắc bén, bền bỉ, thép tốt tôi nước gia truyền giữ cạnh cực kỳ lâu cùn.",
    tags: ["Dao Đa Sỹ trứ danh", "Nghề rèn nửa thiên niên kỷ", "Bí quyết tôi thép", "Lửa lò đỏ rực"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Da_Sy_blacksmith_village.jpg/1200px-Da_Sy_blacksmith_village.jpg",
    watermark: "ĐA SỸ",
    mapQuery: "Lang+ren+Da+Sy+Kien+Hung+Ha+Dong",
    busRoute: "Đi Metro Cát Linh - Hà Đông tới ga Yên Nghĩa / ga Hà Đông hoặc buýt 01, 02, 19, 27 xuống Phúc La rồi đi xe ôm ngắn vào Đa Sỹ.",
    bestTime: "Quanh năm, đẹp nhất buổi sáng sớm khi các lò rèn đồng loạt đỏ lửa rộn rã.",
    highlights: [
      "Lắng nghe âm thanh đập đe chan chát và tiếng quạt gió thổi lò hừng hực",
      "Tận mắt xem nghệ nhân nung thép đỏ hồng và bí quyết tôi nước gia truyền",
      "Mua sắm dao thái, dao chặt xương, kéo thủ công sắc bén nổi tiếng"
    ],
    history: "Làng Đa Sỹ có lịch sử làm nghề rèn truyền thống đã hơn nửa thiên niên kỷ. Tương truyền nghề rèn nơi đây bắt nguồn từ hai ông tổ nghề họ Nguyễn từ vùng Thanh Hóa truyền dạy cho dân làng từ thời Hậu Lê. Sản phẩm chủ lực là dao, kéo, nông cụ, trong đó thương hiệu Dao Đa Sỹ nổi tiếng nhờ độ sắc bén, bền bỉ, thép tốt và giữ cạnh cực kỳ lâu cùn.",
    transportDetail: {
      motorcycle: "Từ trung tâm theo đường Nguyễn Trãi hoặc Lê Văn Lương kéo dài / Tố Hữu qua Hà Đông vào đường Phúc La / Văn Phú rẽ vào phường Kiến Hưng tới làng Đa Sỹ.",
      bus: "Tàu điện Cát Linh - Hà Đông đến các ga Hà Đông rồi đi taxi/xe ôm ngắn. Hoặc xe buýt 01, 02, 19, 27 xuống gần đường Phúc La di chuyển tiếp vào.",
      parking: "Gửi xe tại Nhà văn hóa phường Kiến Hưng, quanh Đình - Chùa Đa Sỹ hoặc tại xưởng lớn."
    },
    experiences: [
      "Lắng nghe âm thanh 'lò rèn' đặc trưng: Nghe tiếng búa đập đe chan chát, quạt gió thổi lò hừng hực và tiếng máy mài réo rắt từ các xưởng dọc hai bên đường.",
      "Tận mắt chứng kiến quy trình rèn thép: Xem nghệ nhân nung đỏ thanh thép trong lò nhiệt độ cao, quai búa, nhúng nước tôi thép (bí quyết độ cứng) và gọt giũa đóng cán gỗ.",
      "Mua sắm dao kéo chất lượng cao: Chọn mua dao thái, dao chặt xương, kéo cắt vải uy tín ngay tại các lò rèn gia truyền."
    ],
    checkInSpots: [
      "Không gian các lò rèn truyền thống lửa hồng: Khung cảnh thợ rèn bên ánh lửa đỏ rực của lò nung và những tia lửa bắn ra tóe lửa từ nhát búa quai đe cực sống động.",
      "Đình và Chùa Đa Sỹ cổ kính: Quần thể kiến trúc tâm linh lâu đời nơi thờ Thành hoàng và tổ nghề rèn mang không gian thanh tịnh.",
      "Đường làng ngõ xóm truyền thống: Cảnh quan làng nghề ven đô đổi mới nhưng vẫn giữ nét sinh hoạt đặc trưng người thợ Bắc Bộ."
    ],
    source: "thuonghieucongluan.com.vn, hanoi.qdnd.vn, baovanhoa.vn"
  },
  {
    id: "com-vong",
    name: "Làng cốm Vòng",
    region: "west",
    regionLabel: "Nội đô • Cầu Giấy",
    category: "Ẩm thực mùa thu di sản Hà Nội",
    location: "Phố Xuân Thủy, Trần Thái Tông, ngõ 63 Xuân Thủy, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    distance: "Nằm ngay khu vực nội đô, cách trung tâm Hà Nội (Hồ Hoàn Kiếm) khoảng 6 – 7 km về phía Tây Bắc.",
    shortDistance: "6km • Cầu Giấy",
    description: "Cái nôi món quà thanh tao bậc nhất của mùa thu Hà Nội từ thời nhà Lý, từng là phẩm vật tiến cống triều đình. Những hạt cốm non xanh ngọc bích dẻo thơm mùi sữa lúa mới, bọc trong hai lớp lá sen và lá dong mộc mạc thơm ngát.",
    tags: ["Cốm làng Vòng", "Hồn thu Hà Nội", "Bánh cốm xôi cốm", "Lá sen gói cốm"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Com_Lang_Vong_Green_Rice.jpg/1200px-Com_Lang_Vong_Green_Rice.jpg",
    watermark: "LÀNG VÒNG",
    mapQuery: "Lang+com+Vong+Xuan+Thuy+Cau+Giay",
    busRoute: "Tàu điện Metro Nhổn - Ga Hà Nội (ga ĐHQG) hoặc buýt 07, 16, 20A, 26, 27, 34, 38 dừng ngõ 63 Xuân Thủy.",
    bestTime: "Mùa thu từ tháng 8 đến tháng 10 âm lịch khi hương cốm mới lan tỏa khắp phố phường.",
    highlights: [
      "Thưởng thức cốm tươi dẻo ngọt bọc lá sen thoảng hương sữa lúa non",
      "Khám phá các sản phẩm: Bánh cốm, xôi cốm hạt sen, chè cốm, chả cốm",
      "Tìm hiểu quy trình rang chảo gang củi nhỏ, giã cối đá và sảy trấu công phu"
    ],
    history: "Nghề làm cốm tại làng Vòng có từ hàng trăm năm trước (thời nhà Lý). Truyền thuyết kể vào một mùa thu lúa trổ bông, giông bão làm đê vỡ ngập úng, người dân đành cắt bông lúa non về rang khô ăn chống đói, không ngờ hạt lại thơm dẻo đặc biệt. Từ đó nghề làm cốm ra đời. Xưa kia cốm Vòng là vật phẩm tiến cống triều đình, nay là biểu tượng văn hóa mùa thu Hà Nội.",
    transportDetail: {
      motorcycle: "Từ trung tâm theo trục Kim Mã – Cầu Giấy – Xuân Thủy đến ngõ 63 Xuân Thủy hoặc phố Trần Thái Tông (khu làng Vòng cũ) rẽ vào các ngõ tìm hộ làm cốm gia truyền.",
      bus: "Metro Nhổn - Ga Hà Nội đến ga Đại học Quốc Gia hoặc Cầu Giấy. Xe buýt 07, 16, 20A, 26, 27, 34, 38... xuống trạm gần tòa án Cầu Giấy / chợ Xanh đi bộ vào.",
      parking: "Gửi xe tại các điểm trông giữ xe đường Xuân Thủy / Trần Thái Tông hoặc cửa hàng cốm."
    },
    experiences: [
      "Thưởng thức cốm tươi truyền thống: Mua và thưởng thức những hạt cốm non xanh mướt, dẻo ngọt, thơm mùi sữa lúa mới bọc cẩn thận trong hai lớp lá sen.",
      "Khám phá các sản phẩm từ cốm: Thưởng thức bánh cốm, xôi cốm dừa nạo, chè cốm, chả cốm hoặc cốm xào dừa.",
      "Tìm hiểu quy trình làm cốm thủ công: Ghé gia đình làm cốm lâu năm hiểu về các công đoạn: tuốt lúa, đãi hạt lép, rang bằng chảo gang củi nhỏ, giã cối đá và sàng sảy cho ra mẻ cốm mỏng dẹt."
    ],
    checkInSpots: [
      "Gánh hàng cốm mộc mạc: Hình ảnh gánh hàng rong với đôi quang gánh, mâm cốm bọc lá sen xanh ngắt bên góc ngõ cổ kính đậm hồn thu Hà Nội.",
      "Các cửa hàng cốm gia truyền: Không gian trưng bày hộp bánh cốm vuông vắn buộc dây lạt đỏ hay góc gói sản phẩm truyền thống.",
      "Ngõ nhỏ làng Vòng yên ả: Khám phá những góc phố mang dấu ấn làng quê xen giữa lòng đô thị Cầu Giấy hiện đại."
    ],
    source: "vntrip.vn, laodong.vn"
  },
  {
    id: "kieu-ky",
    name: "Làng nghề dát vàng Kiêu Kỵ",
    region: "east",
    regionLabel: "Phía Đông • Gia Lâm",
    category: "Nghệ thuật quỳ vàng, quỳ bạc thủ công",
    location: "Xã Kiêu Kỵ, huyện Gia Lâm, thành phố Hà Nội",
    distance: "Cách trung tâm Hà Nội khoảng 15–20 km về phía Đông (gần Vinhomes Ocean Park).",
    shortDistance: "17km • Phía Đông",
    description: "Làng nghề truyền thống nổi tiếng độc nhất vô nhị với nghề quỳ vàng, quỳ bạc hơn 300 năm từ thời Hậu Lê. Nghệ nhân có kỹ thuật đập búa tay hàng nghìn nhát biến thỏi vàng thành những lá quỳ mỏng tang như cánh ve dát lên tượng Phật, hoành phi câu đối và đồ mỹ nghệ cao cấp.",
    tags: ["Quỳ vàng Kiêu Kỵ", "Dát vàng đồ thờ 300 năm", "Lá vàng mỏng cánh ve", "Bàn tay nghệ nhân"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kieu_Ky_gold_leafing_village.jpg/1200px-Kieu_Ky_gold_leafing_village.jpg",
    watermark: "KIÊU KỴ",
    mapQuery: "Lang+nghe+dat+vang+Kieu+Ky+Gia+Lam",
    busRoute: "Bắt tuyến buýt 69 (cách làng 500m) hoặc tuyến buýt điện VinBus E02 (cách làng 1.7km).",
    bestTime: "Quanh năm, các dịp chuẩn bị đồ thờ thếp vàng và phục chế di tích lịch sử.",
    highlights: [
      "Kỹ thuật đập búa hàng ngàn nhát tạo lá vàng quỳ siêu mỏng tang",
      "Nghệ thuật thếp vàng lên tượng Phật, ngai vàng và hoành phi câu đối",
      "Tham quan xưởng nghề gia truyền và đình đền thờ tổ nghề Kiêu Kỵ"
    ],
    history: "Làng nghề Kiêu Kỵ đã xuất hiện từ hơn 300 năm trước dưới thời kỳ Hậu Lê (khoảng thế kỷ XVII). Người dân nơi đây nổi tiếng với kỹ thuật làm quỳ vàng, quỳ bạc cực mỏng, sau đó sử dụng để dát lên đồ thờ, tượng, hoành phi, câu đối và nhiều sản phẩm mỹ nghệ. Nghề truyền thống này góp phần tạo nên nét văn hóa đặc trưng của vùng đất Gia Lâm.",
    transportDetail: {
      motorcycle: "Di chuyển bằng phương tiện cá nhân: Cách trung tâm khoảng 17 – 18km. Đi theo lộ trình qua cầu Chương Dương – Long Biên Xuân Quan – đường Cổ Linh – Đa Tốn, sau đó men theo đường Nguyễn Quý Trị để đến làng nghề Kiêu Kỵ.",
      bus: "Di chuyển bằng xe bus: Tuyến buýt 69 (điểm dừng cách làng khoảng 500m) hoặc tuyến VinBus E02 (điểm dừng cách làng khoảng 1.7km).",
      parking: "Gửi xe tại Nhà văn hóa xã Kiêu Kỵ, khu vực đình đền hoặc các xưởng nghề lớn."
    },
    experiences: [
      "Xem nghệ nhân dát vàng: Quan sát trực tiếp các công đoạn làm quỳ vàng và dát vàng – một nghề thủ công đòi hỏi sự tỉ mỉ và kiên nhẫn.",
      "Tìm hiểu quy trình làm quỳ vàng: Khám phá các công đoạn từ xử lý vàng, cán, đập và tạo thành những lá quỳ vàng siêu mỏng.",
      "Thử trải nghiệm làm đồ thủ công: Một số cơ sở cho du khách tìm hiểu hoặc trải nghiệm công đoạn đơn giản dưới sự hướng dẫn của nghệ nhân.",
      "Tham quan xưởng nghề & đình đền: Tận mắt nhìn thấy không gian làm việc, dụng cụ truyền thống và khám phá cách nghề truyền thống được gìn giữ qua nhiều thế hệ."
    ],
    checkInSpots: [
      "Không gian xưởng dát vàng: Những bàn làm nghề, dụng cụ thủ công và các sản phẩm dát vàng tạo nên khung hình rất đặc trưng.",
      "Các sản phẩm mỹ nghệ dát vàng: Chụp ảnh cùng những sản phẩm thủ công tinh xảo, đặc biệt là các đồ thờ và tượng Phật thếp vàng.",
      "Đường làng Kiêu Kỵ & khu vực đình đền: Những công trình mang nét kiến trúc truyền thống và con đường nhỏ gần gũi.",
      "Góc nghệ nhân làm nghề: Góc chụp thể hiện được con người – nghề truyền thống – giá trị văn hóa của Kiêu Kỵ."
    ],
    source: "dangcongsan.vn, special.vietnamplus.vn"
  }
];

// Existing Nature destinations that were already in surroundingDestinations
const natureDestinations = [
  {
    id: "ba-vi",
    name: "Vườn Quốc gia Ba Vì",
    region: "west",
    regionLabel: "Phía Tây",
    category: "Vườn quốc gia sinh thái",
    location: "Huyện Ba Vì, Hà Nội",
    distance: "Cách trung tâm Hà Nội khoảng 50km – 60km về phía Tây.",
    shortDistance: "50km – 60km • Phía Tây",
    description: "Thiên đường nghỉ dưỡng với rừng thông nguyên sinh ngút ngàn, khí hậu mát mẻ quanh năm. Nơi sở hữu các công trình kiến trúc cổ kính và không gian săn mây, cắm trại cực chill.",
    tags: ["Săn mây", "Rừng thông", "Cắm trại", "Không khí mát lạnh"],
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Ba_Vi_Mountain.jpg?utm_source=vi.wikipedia.org&utm_campaign=index&utm_content=original",
    watermark: "BA VÌ",
    mapQuery: "Vuon+Quoc+Gia+Ba+Vi+Ha+Noi",
    busRoute: "Tuyến 74 (Bến xe Mỹ Đình - Xuân Khanh) nối tuyến 110 lên cổng Vườn Quốc gia",
    bestTime: "Quanh năm, đặc biệt mùa hoa dã quỳ nở rộ (Tháng 10 - Tháng 12)",
    highlights: [
      "Rừng thông bạt ngàn mát lạnh",
      "Nhà thờ Pháp cổ & Vườn xương rồng",
      "Đỉnh Vua & Đền Thờ Bác Hồ"
    ],
    history: "Quần thể núi Ba Vì linh thiêng gắn với huyền tích Sơn Tinh - Thủy Tinh, là ngọn núi tổ của nước Đại Việt với Đền Thượng uy nghiêm trên đỉnh Tản Viên.",
    transportDetail: {
      motorcycle: "Theo Đại lộ Thăng Long đi hết đường cao tốc, đi thẳng qua ngã tư Hòa Lạc theo hướng Làng Văn hóa các Dân tộc Việt Nam hoặc theo biển chỉ dẫn lên Ba Vì.",
      bus: "Tuyến 74 từ Mỹ Đình đến Xuân Khanh (Sơn Tây), sau đó bắt tiếp tuyến 110 lên thẳng cổng Vườn Quốc Gia Ba Vì.",
      parking: "Bãi đỗ xe tại cổng Vườn Quốc Gia hoặc trạm Cốt 400."
    },
    experiences: [
      "Khám phá Nhà thờ Pháp cổ rêu phong ẩn mình giữa sương mù rừng già.",
      "Check-in Nhà kính Vườn xương rồng với hơn 1.200 giống xương rồng kỳ lạ.",
      "Trekking lên Đền Thượng và Đền thờ Bác Hồ trên đỉnh Vua lộng gió."
    ],
    checkInSpots: [
      "Nhà thờ đổ Ba Vì: Khung cảnh cổ kính huyền bí rêu phong thời Pháp.",
      "Vườn xương rồng: Không gian kiến trúc vòm kính độc đáo giữa đại ngàn.",
      "Rừng thông cốt 400: Không gian cắm trại và ngắm biển mây tuyệt đẹp."
    ]
  },
  {
    id: "ecopark",
    name: "Khu đô thị sinh thái Ecopark",
    region: "east",
    regionLabel: "Đông Nam",
    category: "Đại công viên sinh thái",
    location: "Văn Giang, Hưng Yên (giáp Gia Lâm, Hà Nội)",
    distance: "Cách trung tâm Hà Nội khoảng 13km – 15km về phía Đông Nam.",
    shortDistance: "13km – 15km • Đông Nam",
    description: "Đại đô thị sinh thái xanh lớn nhất miền Bắc với hơn 1 triệu cây xanh và hồ Thiên Nga thơ mộng. Điểm đến lý tưởng cho các buổi dã ngoại, chèo kayak, cắm trại gia đình.",
    tags: ["Hồ Thiên Nga", "Dã ngoại", "Camping", "Triệu cây xanh"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ecopark_Hanoi.jpg/1200px-Ecopark_Hanoi.jpg",
    watermark: "ECOPARK",
    mapQuery: "Khu+do+thi+Ecopark+Van+Giang",
    busRoute: "Hệ thống xe Ecobus đón trả tại nhiều điểm trung tâm nội đô Hà Nội",
    bestTime: "Các ngày cuối tuần quanh năm, tiết trời thu mát mẻ hoặc mùa xuân ngập sắc hoa",
    highlights: [
      "Hồ Thiên Nga thơ mộng ngắm đàn thiên nga đen trắng bơi lội",
      "Công viên Mùa Hạ, Mùa Thu rợp bóng cây cổ thụ",
      "Trải nghiệm chèo thuyền kayak và cắm trại trên thảm cỏ ven hồ"
    ],
    history: "Được quy hoạch từ năm 2004 theo mô hình thành phố xanh thông minh bền vững, kết nối hài hòa giữa thiên nhiên sông Hồng và kiến trúc hiện đại.",
    transportDetail: {
      motorcycle: "Từ trung tâm qua cầu Thanh Trì hoặc Vĩnh Tuy theo đường Cổ Linh, đi thẳng theo đường liên tỉnh Hà Nội - Hưng Yên chừng 15 phút.",
      bus: "Hệ thống xe buýt Ecobus hoạt động liên tục đón khách từ Phố Cổ, Cầu Giấy, Mỹ Đình sang Ecopark.",
      parking: "Bãi đỗ xe tại Công viên Mùa Hạ, Công viên Mùa Xuân và khu Hồ Thiên Nga."
    },
    experiences: [
      "Cho đàn thiên nga ăn và ngắm hoàng hôn buông xuống mặt hồ Thiên Nga phẳng lặng.",
      "Tổ chức tiệc nướng BBQ và cắm trại cùng bạn bè dưới tán cây xanh mát.",
      "Khám phá phố đi bộ phong cách Hàn Quốc và thưởng thức ẩm thực đa dạng."
    ],
    checkInSpots: [
      "Cầu phao Hồ Thiên Nga: Khung cảnh đàn thiên nga bơi lội tự nhiên giữa mặt nước.",
      "Rừng cọ và đồi hoa: Rực rỡ sắc màu theo từng mùa hoa nở rộ.",
      "Khu phố vịnh đảo Grand Marina lung linh ánh đèn phản chiếu mặt hồ."
    ]
  },
  {
    id: "tam-dao",
    name: "Thị trấn Tam Đảo",
    region: "north",
    regionLabel: "Phía Bắc",
    category: "Thị trấn nghỉ dưỡng vùng núi",
    location: "Huyện Tam Đảo, Vĩnh Phúc",
    distance: "Cách trung tâm Hà Nội khoảng 75km – 80km về phía Bắc.",
    shortDistance: "75km – 80km • Phía Bắc",
    description: "Thị trấn mờ sương nằm ở độ cao hơn 900m so với mực nước biển với khí hậu 4 mùa trong 1 ngày. Nổi tiếng với Nhà thờ đá cổ kính, Tháp truyền hình và Cầu Mây săn mây tuyệt đẹp.",
    tags: ["Thị trấn mờ sương", "Khí hậu 4 mùa", "Nhà thờ đá", "Săn mây"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Tam_Dao_town.jpg/1200px-Tam_Dao_town.jpg",
    watermark: "TAM ĐẢO",
    mapQuery: "Thi+tran+Tam+Dao+Vinh+Phuc",
    busRoute: "Xe khách Limousine từ Hà Nội lên thẳng trung tâm thị trấn Tam Đảo (130.000đ - 150.000đ)",
    bestTime: "Mùa hè trốn nóng hoặc mùa thu đông ngắm sương mù lãng đãng",
    highlights: [
      "Nhà thờ đá cổ kính kiến trúc Gothic thời Pháp",
      "Khu Cầu Mây & Cổng trời săn mây bồng bềnh",
      "Thưởng thức đặc sản ngọn su su non xào tỏi và thịt lợn mán nướng"
    ],
    history: "Tam Đảo được người Pháp phát hiện và xây dựng thành khu nghỉ dưỡng trên cao từ đầu thế kỷ XX với hàng trăm ngôi biệt thự nguy nga.",
    transportDetail: {
      motorcycle: "Từ Hà Nội theo đường cầu Thăng Long / Nhật Tân ra QL2 đi Vĩnh Yên, rẽ QL2B lên dốc đèo Tam Đảo dài 13km uốn lượn.",
      bus: "Các tuyến xe Limousine đón trả tận nơi từ trung tâm Hà Nội lên Tam Đảo trong khoảng 1.5 - 2 giờ.",
      parking: "Bãi đỗ xe tại quảng trường trung tâm thị trấn hoặc khách sạn nghỉ dưỡng."
    },
    experiences: [
      "Dạo bước tại Quảng trường trung tâm và ngắm hoàng hôn buông xuống thung lũng mờ sương.",
      "Thưởng thức ngọn su su tươi non giòn ngọt xào tỏi và xiên thịt nướng than hồng thơm nức.",
      "Leo bậc đá lên Tháp truyền hình ngắm toàn cảnh thị trấn từ trên mây."
    ],
    checkInSpots: [
      "Nhà thờ đá cổ Tam Đảo: Nền đá ong uốn vòm nhìn xuống thung lũng mờ sương.",
      "Cổng Trời Tam Đảo: Nơi phóng tầm mắt bắt trọn khung cảnh thị trấn trong mây.",
      "Quán Gió Tam Đảo: Quán cà phê lưng chừng đèo ngắm hoàng hôn buông tuyệt đẹp."
    ]
  },
  {
    id: "dai-lai",
    name: "Hồ Đại Lải & Flamingo",
    region: "north",
    regionLabel: "Phía Bắc",
    category: "Hồ cảnh quan & Quần thể nghỉ dưỡng",
    location: "Phúc Yên, Vĩnh Phúc",
    distance: "Cách trung tâm Hà Nội khoảng 40km – 45km về phía Bắc.",
    shortDistance: "40km – 45km • Phía Bắc",
    description: "Hồ nước ngọt nhân tạo rộng lớn hơn 525ha được bao bọc bởi những cánh rừng thông xanh biếc và dãy núi Tam Đảo. Không gian lộng gió, thanh bình thích hợp chèo kayak, cắm trại và nghỉ dưỡng.",
    tags: ["Mặt hồ 525ha", "Rừng thông reo", "Art in the Forest", "Chèo Kayak"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Dai_Lai_Lake.jpg/1200px-Dai_Lai_Lake.jpg",
    watermark: "ĐẠI LẢI",
    mapQuery: "Ho+Dai+Lai+Phuc+Yen+Vinh+Phuc",
    busRoute: "Tuyến buýt số 95 (BX Nam Thăng Long - Xuân Hòa) kết hợp taxi ngắn 4km vào hồ",
    bestTime: "Mùa hè và thu từ tháng 4 đến tháng 10 nắng ấm, gió hồ dịu mát",
    highlights: [
      "Mặt hồ lộng gió 525ha với đảo Ngọc hoang sơ giữa hồ",
      "Bảo tàng nghệ thuật ngoài trời Art in the Forest độc bản",
      "Trải nghiệm chèo kayak, đạp xe xuyên rừng thông ngút ngàn"
    ],
    history: "Hồ Đại Lải được khởi công xây dựng từ năm 1959 nhằm phục vụ tưới tiêu nông nghiệp, sau đó trở thành quần thể sinh thái nghỉ dưỡng trọng điểm của vùng Thủ đô.",
    transportDetail: {
      motorcycle: "Từ trung tâm theo đường cầu Nhật Tân qua sân bay Nội Bài, rẽ theo Quốc lộ 2A hướng đi Phúc Yên, rẽ vào đường Nguyễn Tất Thành đến hồ Đại Lải.",
      bus: "Đi xe buýt 95 từ BX Nam Thăng Long đến bến cuối Xuân Hòa, sau đó đi taxi hoặc xe ôm 4km vào cổng hồ Đại Lải.",
      parking: "Bãi đỗ xe quanh khu du lịch ven hồ hoặc bãi xe Flamingo Đại Lải."
    },
    experiences: [
      "Đi thuyền ra thăm Đảo Ngọc thanh bình giữa lòng hồ Đại Lải.",
      "Chiêm ngưỡng các tác phẩm điêu khắc nghệ thuật đương đại trong rừng thông tại Art in the Forest.",
      "Trải nghiệm chèo thuyền kayak lướt nhẹ trên mặt nước hồ xanh biếc."
    ],
    checkInSpots: [
      "Bến thuyền hồ Đại Lải: Khung cảnh mặt hồ mênh mông gợn sóng lăn tăn.",
      "Đường dạo bộ xuyên rừng thông: Những hàng thông thẳng tắp đổ bóng mát rượi.",
      "Bảo tàng công viên nghệ thuật ngoài trời với các tác phẩm điêu khắc ấn tượng."
    ]
  },
  {
    id: "ban-rom",
    name: "Khu sinh thái Bản Rõm",
    region: "north",
    regionLabel: "Phía Bắc",
    category: "Khu sinh thái rừng thông",
    location: "Xã Quang Tiến, huyện Sóc Sơn, Hà Nội",
    distance: "Cách trung tâm Hà Nội khoảng 30km – 35km về phía Bắc.",
    shortDistance: "30km – 35km • Phía Bắc",
    description: "Khu du lịch sinh thái nằm ẩn mình giữa rừng thông bạt ngàn của vùng núi Sóc Sơn. Không gian trong lành nguyên sơ, điểm đến quen thuộc cho cắm trại dã ngoại và hoạt động rèn luyện kỹ năng sinh tồn.",
    tags: ["Rừng thông Sóc Sơn", "Cắm trại dã ngoại", "Kỹ năng sinh tồn", "Teambuilding"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Soc_Son_pine_forest.jpg/1200px-Soc_Son_pine_forest.jpg",
    watermark: "BẢN RÕM",
    mapQuery: "Khu+du+lich+sinh+thai+Ban+Rom+Soc+Son",
    busRoute: "Tuyến buýt 56A hoặc 15 đến thị trấn Sóc Sơn, chuyển tiếp xe ôm/taxi 5km vào Bản Rõm",
    bestTime: "Quanh năm, các ngày cuối tuần thời tiết khô ráo rất thích hợp cắm trại dã ngoại",
    highlights: [
      "Rừng thông bạt ngàn không khí mát lành như Đà Lạt thu nhỏ",
      "Khu cắm trại dã ngoại ven suối với đầy đủ lều trại, bếp nướng",
      "Trải nghiệm các trò chơi kỹ năng sinh tồn và teambuilding ngoài trời"
    ],
    history: "Bản Rõm nằm trong quần thể rừng phòng hộ Sóc Sơn, được bảo tồn và xây dựng thành khu trải nghiệm giáo dục thiên nhiên và dã ngoại sinh thái cho giới trẻ Thủ đô.",
    transportDetail: {
      motorcycle: "Từ trung tâm qua cầu Nhật Tân theo đường Võ Nguyên Giáp lên Sóc Sơn, rẽ vào đường Tỉnh lộ 35 đi xã Quang Tiến tới Bản Rõm.",
      bus: "Tuyến xe buýt số 15 hoặc 56A đến ngã ba Phù Lỗ / thị trấn Sóc Sơn, bắt taxi hoặc xe ôm 5km vào tận cổng khu sinh thái.",
      parking: "Bãi đỗ xe rộng rãi ngay trước cổng vào khu du lịch sinh thái Bản Rõm."
    },
    experiences: [
      "Dựng lều cắm trại dưới tán thông reo và thưởng thức bữa tiệc nướng BBQ ấm cúng.",
      "Tham gia các hoạt động giáo dục trải nghiệm: làm bánh trôi, trồng rau, bắt cá, vượt chướng ngại vật.",
      "Thong dong tản bộ dọc đường mòn xuyên rừng và hít thở bầu không khí tinh khiết."
    ],
    checkInSpots: [
      "Cây cầu gỗ treo giữa rừng thông bạt ngàn.",
      "Khu lều trại mộc mạc phong cách vintage dưới tán lá thông reo.",
      "Khu vườn cổ tích với các tiểu cảnh gỗ mộc mạc."
    ]
  }
];

// Combine: Nature destinations + 20 Craft Villages
data.tab2_suburbs.surroundingDestinations = [
  ...craftVillages,
  ...natureDestinations
];

console.log('Total surrounding destinations now:', data.tab2_suburbs.surroundingDestinations.length);

// Also add audio guide entries in tab3_heritage for top villages
const additionalHeritageAudios = [
  {
    id: "quang-phu-cau",
    slug: "quang-phu-cau",
    title: "Sắc đỏ trăm năm Làng hương Quảng Phú Cầu",
    heritageSite: "Làng hương Quảng Phú Cầu, Ứng Hòa, Hà Nội",
    narrator: "Ban Quản lý Di sản Văn hóa Làng nghề Hà Nội",
    durationFormatted: "01:50",
    durationSeconds: 110,
    audioUrl: "assets/audio/bat-trang.mp3", // fallback gracefully to sample audio
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Quang_Phu_Cau_Incense_Village.jpg/1200px-Quang_Phu_Cau_Incense_Village.jpg",
    qrCodeLabel: "Mã QR Di tích #04 — Làng hương Quảng Phú Cầu",
    summary: "Lắng nghe câu chuyện giữ lửa nghề làm tăm hương thảo mộc hơn một thế kỷ, từ chiếc nan tre chẻ tay của cụ Lê Xuân Vịnh đến thương hiệu OCOP 4 sao vươn tầm thế giới.",
    article: {
      lead: "Giữa miền quê ngoại thành Ứng Hòa thanh bình, sắc đỏ son của hàng vạn bó hương bung xòe như những đóa hoa khổng lồ dưới nắng vàng đã làm say đắm biết bao lữ khách.",
      sections: [
        {
          heading: "1. Khởi nguồn từ đôi bàn tay chẻ nan tre",
          content: "Đầu thế kỷ XX, ông Lê Xuân Vịnh thôn Phú Lương Thượng nhận chẻ tăm tre bán cho thương lái. Từ những vạt nan tre nhỏ bé, nghề làm tăm hương lan rộng ra khắp 6 thôn trong toàn xã với hàng ngàn lao động, trở thành nguồn thu nhập chính và là niềm tự hào của vùng đất Ứng Hòa."
        },
        {
          heading: "2. Kỹ nghệ se hương thảo mộc tự nhiên",
          content: "Để làm nên nén hương thơm thanh khiết, người thợ Quảng Phú Cầu sử dụng các loại thảo mộc tự nhiên như quế chi, hồi, trầm, thảo quả nghiền mịn. Nan hương được phơi tự nhiên dưới ánh nắng rực rỡ để giữ trọn vẹn tinh dầu và độ khô ráo, không hóa chất độc hại."
        },
        {
          heading: "3. Điểm hẹn văn hóa và di sản sống",
          content: "Ngày nay Quảng Phú Cầu không chỉ cung cấp hương cho cả nước mà còn là điểm đến du lịch văn hóa hấp dẫn, nơi du khách trong nước và quốc tế trải nghiệm tự tay chẻ nan, se hương và lưu giữ những bức ảnh check-in rực rỡ sắc màu."
        }
      ]
    }
  },
  {
    id: "non-chuong",
    slug: "non-chuong",
    title: "Hồn nón lá 16 vòng Làng Chuông ven sông Đáy",
    heritageSite: "Làng nón Chuông, Thanh Oai, Hà Nội",
    narrator: "Hội Văn nghệ Dân gian Hà Nội",
    durationFormatted: "01:40",
    durationSeconds: 100,
    audioUrl: "assets/audio/van-phuc.mp3",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Making_conical_hats_in_Chuong_village.jpg/1200px-Making_conical_hats_in_Chuong_village.jpg",
    qrCodeLabel: "Mã QR Di tích #05 — Làng nón Chuông",
    summary: "Khám phá quy trình làm nên chiếc nón lá chuẩn 16 vòng nan tre tỉ mỉ, cội nguồn từ thế kỷ thứ VIII từng tiến cống hoàng cung và nét đẹp phiên chợ nón rạng sáng độc nhất vô nhị.",
    article: {
      lead: "Nằm bên dòng sông Đáy hiền hòa, Làng Chuông vẫn bền bỉ giữ lửa nghề làm nón lá truyền thống hàng trăm năm, tạo nên chiếc nón bài thơ che mát tâm hồn người Việt.",
      sections: [
        {
          heading: "1. Tinh hoa 16 vòng nan nứa",
          content: "Chiếc nón Chuông nổi tiếng nhờ khung nan tre chuẩn xác đúng 16 vòng. Từng chiếc nan được vót tròn đều tăm tắp, xếp từ lớn đến nhỏ tạo nên độ cong thanh thoát. Lá cọ mua từ miền đồi núi được là phẳng bằng bàn là gang nóng hổi trước khi chằm khâu."
        },
        {
          heading: "2. Đôi bàn tay người thợ tài hoa",
          content: "Từ các cụ bà cao niên đến những em nhỏ, người làng Chuông thoăn thoắt đường kim mũi chỉ khâu từng lớp lá cọ vào khung nan. Chiếc nón sau khi chằm xong được hơ qua khói diêm để tạo độ trắng sáng tự nhiên và quét lớp dầu bóng chống thấm nước mưa."
        },
        {
          heading: "3. Phiên chợ nón rạng sáng mờ sương",
          content: "Cứ đến các ngày 4, 10, 14, 20, 24, 30 âm lịch, từ 5 giờ sáng khi trời còn mờ sương, chợ nón Chuông đã tấp nập người mua kẻ bán lá cọ, nan tre, nón thành phẩm, tạo nên một nét sinh hoạt văn hóa dân gian vô giá của xứ Đoài."
        }
      ]
    }
  },
  {
    id: "kieu-ky",
    slug: "kieu-ky",
    title: "Kỹ nghệ dát vàng Kiêu Kỵ 300 năm",
    heritageSite: "Làng nghề dát vàng Kiêu Kỵ, Gia Lâm, Hà Nội",
    narrator: "Nghệ nhân Ưu tú Làng nghề Hà Nội",
    durationFormatted: "01:45",
    durationSeconds: 105,
    audioUrl: "assets/audio/bat-trang.mp3",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kieu_Ky_gold_leafing_village.jpg/1200px-Kieu_Ky_gold_leafing_village.jpg",
    qrCodeLabel: "Mã QR Di tích #06 — Làng dát vàng Kiêu Kỵ",
    summary: "Tìm hiểu bí quyết làm quỳ vàng, quỳ bạc cực mỏng từ thời Hậu Lê, biến một chỉ vàng thô thành hàng ngàn lá quỳ dát lên tượng Phật và đồ ngự dụng cung đình.",
    article: {
      lead: "Là làng nghề độc nhất vô nhị ở Việt Nam gìn giữ nghề đập quỳ vàng, Kiêu Kỵ đã tôn thêm vẻ uy nghiêm, lộng lẫy cho hàng ngàn ngôi chùa, đền đài và di tích lịch sử trên khắp dải đất hình chữ S.",
      sections: [
        {
          heading: "1. Hơn ba thế kỷ gìn giữ nghề kim hoàn bí truyền",
          content: "Nghề dát vàng Kiêu Kỵ xuất hiện từ thời Hậu Lê (thế kỷ XVII). Người thợ nơi đây nổi tiếng với kỹ năng đập búa nhịp nhàng hàng nghìn nhát liên tục vào tập giấy quỳ để dát mỏng thỏi kim loại quý thành lớp vàng mỏng tang như cánh ve."
        },
        {
          heading: "2. Nghệ thuật thếp vàng công phu",
          content: "Để thếp vàng lên tượng Phật hay hoành phi câu đối, nghệ nhân phải quét lớp sơn ta làm keo dán, chờ khi sơn vừa 'chín tới' thì khéo léo dùng bút lông chuyên dụng dán từng lá quỳ vàng lên bề mặt, miết đều để tạo độ bóng láng trường tồn."
        },
        {
          heading: "3. Tôn vinh giá trị văn hóa tâm linh",
          content: "Những sản phẩm dát vàng Kiêu Kỵ không chỉ mang giá trị vật chất cao quý mà còn là tinh hoa mỹ nghệ thiêng liêng, góp phần bảo tồn các di sản văn hóa tâm linh rực rỡ của dân tộc."
        }
      ]
    }
  },
  {
    id: "com-vong",
    slug: "com-vong",
    title: "Hương cốm Làng Vòng - Hồn thu Hà Nội",
    heritageSite: "Làng Vòng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    narrator: "Nhà nghiên cứu Văn hóa Thăng Long",
    durationFormatted: "01:35",
    durationSeconds: 95,
    audioUrl: "assets/audio/van-phuc.mp3",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Com_Lang_Vong_Green_Rice.jpg/1200px-Com_Lang_Vong_Green_Rice.jpg",
    qrCodeLabel: "Mã QR Di tích #07 — Cốm Làng Vòng",
    summary: "Thưởng thức phong vị thanh tao bậc nhất của đất kinh kỳ từ thời nhà Lý, kết tinh từ giọt sữa lúa nếp non, chảo rang củi đỏ lửa và tấm lá sen ngan ngát hương mùa thu.",
    article: {
      lead: "Cứ mỗi độ thu về, hương cốm Vòng lại len lỏi khắp phố phường Hà Nội như một lời hẹn ước của đất trời Thăng Long nghìn năm văn hiến.",
      sections: [
        {
          heading: "1. Thức quà thanh tao từ thời nhà Lý",
          content: "Truyền thuyết kể rằng mùa thu năm xưa mưa giông làm vỡ đê, người dân làng Vòng đành cắt những bông lúa non về rang ăn chống đói, tình cờ phát hiện ra hương vị dẻo ngọt thanh tao của hạt ngọc trời. Từ đó nghề làm cốm ra đời và trở thành phẩm vật tiến cống triều đình."
        },
        {
          heading: "2. Công phu từng mẻ cốm xanh ngọc",
          content: "Lúa nếp non tuốt hạt phải rang ngay trên chảo gang với củi nhỏ lửa, đảo đều tay cho vỏ trấu giòn rụm mà hạt nếp bên trong vẫn giữ trọn vẹn vị sữa ngọt. Trải qua nhiều lượt giã cối đá và sảy trấu, những hạt cốm dẹt xanh tươi như ngọc bích dần lộ diện."
        },
        {
          heading: "3. Gói trọn mùa thu trong lá sen",
          content: "Cốm Vòng phải được bọc trong hai lớp lá: lớp trong là lá dong giữ độ ẩm mượt, lớp ngoài là lá sen già thoang thoảng hương thơm thanh khiết, buộc sợi rơm nếp vàng óng ả. Thưởng thức cốm tươi cùng chuối tiêu trứng cuốc là nét văn hóa ẩm thực tao nhã không đâu sánh bằng."
        }
      ]
    }
  }
];

// Append additional audios if not already present
for (const item of additionalHeritageAudios) {
  if (!data.tab3_heritage.audios.some(a => a.id === item.id)) {
    data.tab3_heritage.audios.push(item);
  }
}

console.log('Total heritage audios now:', data.tab3_heritage.audios.length);

fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated mock-data.json successfully!');
