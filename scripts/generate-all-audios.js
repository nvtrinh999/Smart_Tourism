const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'src', 'assets', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// 20 rich narrative scripts crafted for 1m10s - 1m30s duration (~160 - 220 words)
const villageScripts = {
  'bat-trang': {
    title: 'Lịch sử 700 năm Lò Bầu và Tinh hoa Gốm Bát Tràng',
    text: `Chào mừng quý khách đến với Làng gốm Bát Tràng, xã Bát Tràng, huyện Gia Lâm, thành phố Hà Nội. Nằm ven tả ngạn sông Hồng cách trung tâm hồ Hoàn Kiếm chừng 14 cây số, Bát Tràng là cái nôi gốm sứ trứ danh hơn 500 năm lịch sử từ thời nhà Lý. Đến với làng gốm, bạn có thể dễ dàng di chuyển bằng xe máy dọc theo đê sông Hồng hoặc đón tuyến xe buýt số 47A từ Long Biên đi thẳng đến cổng làng. Bước chân vào Bát Tràng, du khách sẽ choáng ngợp trước kiến trúc 7 bàn xoay khổng lồ độc bản của Bảo tàng Gốm Bát Tràng, ghé thăm ngôi nhà cổ Vạn Vân hơn hai trăm năm tuổi lưu giữ hơn 300 cổ vật quý, hay dạo quanh khu chợ gốm sầm uất với muôn vàn sản phẩm tinh xảo từ đồ thờ cúng, ấm chén đến bình hoa đắp nổi. Đặc biệt, đừng bỏ lỡ trải nghiệm tự tay ngồi bên bàn xoay vuốt nặn, vẽ men và nung sản phẩm kỷ niệm cùng nghệ nhân bản địa. Nếu ghé vào ngày 14 và 15 tháng 2 âm lịch, bạn còn được hòa mình vào Lễ hội Bát Tràng linh thiêng tôn vinh cội nguồn tổ nghề gốm đất Thăng Long.`
  },
  'duong-lam': {
    title: 'Không gian Nhà cổ Đá ong và Đất Hai Vua Đường Lâm',
    text: `Chào mừng bạn đến với Làng cổ Đường Lâm, thị xã Sơn Tây, thành phố Hà Nội. Cách trung tâm thủ đô khoảng 45 cây số về phía Tây, Đường Lâm là ngôi làng cổ đầu tiên ở Việt Nam được công nhận Di tích lịch sử văn hóa quốc gia. Nơi đây tự hào là vùng đất 'địa linh nhân kiệt' sinh ra hai vị anh hùng dân tộc là Bố Cái Đại Vương Phùng Hưng và Tiền Ngô Vương Ngô Quyền. Bạn có thể đến Đường Lâm theo trục Đại lộ Thăng Long hoặc tuyến xe buýt số 70A từ bến xe Mỹ Đình. Dạo bước qua chiếc cổng làng Mông Phụ rêu phong dưới bóng cây đa cổ thụ, bạn sẽ bước vào thế giới yên ả của những con ngõ lát gạch quanh co, những bức tường đá ong nâu vàng mộc mạc và những ngôi nhà gỗ truyền thống ba trăm đến bốn trăm năm tuổi. Hãy ghé thăm Đình làng Mông Phụ uy nghiêm, Chùa Mía cổ kính, thưởng thức tách trà nóng bên phong kẹo dồi, miếng chè lam thơm cay dẻo quánh, và thuê một chiếc xe đạp rong ruổi qua những cánh đồng xanh ngát để cảm nhận trọn vẹn hồn quê Bắc Bộ.`
  },
  'quang-phu-cau': {
    title: 'Sắc đỏ Tăm hương Trăm năm Làng nghề Quảng Phú Cầu',
    text: `Chào mừng quý khách đến với Làng hương Quảng Phú Cầu, huyện Ứng Hòa, cách trung tâm Hà Nội khoảng 35 cây số về phía Nam. Bạn có thể di chuyển thuận tiện bằng xe máy qua Quốc lộ 21B hoặc bắt tuyến xe buýt số 91 từ bến xe Yên Nghĩa đi thẳng đến cổng làng. Hình thành từ đầu thế kỷ hai mươi, Quảng Phú Cầu nổi tiếng khắp thế giới với nghề làm tăm hương truyền thống, trở thành điểm đến văn hóa và nhiếp ảnh vô cùng hấp dẫn. Vào những ngày nắng đẹp, khắp các khoảng sân đình, ngõ nhỏ đều ngập tràn hàng vạn bó hương được nhuộm đỏ, nhuộm vàng, bung xòe tròn như những đóa hoa khổng lồ tỏa ngát hương thơm dịu nhẹ. Tại đây, du khách được tận mắt chứng kiến bàn tay thoăn thoắt chẻ vầu, ngâm tre, se hương của các bà, các chị, tự tay thử bó hương và trò chuyện cùng các nghệ nhân lão luyện. Đừng quên chuẩn bị những bộ trang phục thật đẹp để lưu lại những bức ảnh check-in sống ảo rực rỡ và chọn mua những hộp hương nén, hương vòng đạt chuẩn OCOP ba đến bốn sao về làm quà cho gia đình.`
  },
  'lang-chuong': {
    title: 'Hồn Nón lá Mười sáu Vành bên Dòng sông Đáy Làng Chuông',
    text: `Chào mừng quý khách đến với Làng nón Chuông, xã Phương Trung, huyện Thanh Oai, Hà Nội, nằm yên ả bên bờ sông Đáy cách trung tâm thành phố chừng 30 cây số về phía Tây Nam. Để đến đây, bạn đi theo Quốc lộ 21B qua Ba La - Hà Đông hoặc bắt tuyến xe buýt số 78, 103A. Làng Chuông đã có lịch sử làm nón lá hàng trăm năm, từng là nơi cung tiến những chiếc nón quai thao, nón ba tầm tinh xảo cho bậc hoàng hậu, công chúa thời xưa. Điểm đặc sắc nhất là phiên chợ nón truyền thống họp vào các ngày chẵn âm lịch từ 5 giờ sáng, nơi các bà, các mẹ bày bán vòng nón, lá cọ trắng tinh và từng chồng nón lá xếp tầng đẹp như tranh vẽ. Chiếc nón Chuông được kết tinh qua 16 vành nan nứa dẻo dai, lá cọ non được là phẳng công phu và từng đường kim mũi cước khâu đều tăm tắp. Hãy dừng chân bên mái hiên đình làng Chuông cổ kính xây dựng từ năm 1894, tự tay thử khâu một đường nón và thưởng thức món bánh cuốn làng Chuông mềm thơm đậm đà hương vị đồng quê.`
  },
  'phu-vinh': {
    title: 'Nghệ thuật Mây tre đan Đỉnh cao Làng Phú Vinh',
    text: `Chào mừng quý khách đến với Làng mây tre đan Phú Vinh, xã Phú Nghĩa, huyện Chương Mỹ, thành phố Hà Nội. Nằm ven Quốc lộ 6 chỉ cách trung tâm Hà Nội khoảng 25 đến 30 cây số về phía Tây Nam, bạn có thể dễ dàng di chuyển bằng xe cá nhân hoặc kết hợp tàu điện Cát Linh - Hà Đông với tuyến xe buýt số 72. Trải qua hơn 400 năm phát triển, từ tên gọi ban đầu là Phú Hoa Trang với ý nghĩa trời phú cho bàn tay hoa mỹ, Phú Vinh đã vươn lên thành cái nôi mây tre đan xuất khẩu nổi tiếng toàn cầu. Dưới đôi bàn tay tài hoa của nghệ nhân, những sợi mây, nan tre thô ráp được chẻ mỏng như sợi chỉ, đan cài thành những bức tranh chân dung sống động, lồng đèn trang trí, khay trà và đồ lưu niệm tinh tế. Về Phú Vinh, du khách sẽ được chiêm ngưỡng không gian phơi mây tre ngập sắc vàng dưới nắng, tham quan các xưởng thủ công mỹ nghệ, tự tay trải nghiệm đan những chiếc lót ly mộc mạc và chọn mua những món đồ decor xinh xắn trực tiếp với giá gốc tại xưởng.`
  },
  'dai-bai': {
    title: 'Âm vang Nghệ thuật Gò Đúc Đồng Chín Trăm Năm Đại Bái',
    text: `Chào mừng quý khách đến với Làng đúc đồng nghệ thuật Đại Bái, huyện Gia Bình, cách trung tâm Hà Nội khoảng 35 đến 40 cây số về phía Đông Bắc. Làng nghề có lịch sử hào hùng trên 900 năm, thờ cụ tổ nghề Nguyễn Công Triều từ thời nhà Lý, người đã truyền dạy bí quyết luyện đồng cho dân làng. Bước chân vào Đại Bái, bạn sẽ được lắng nghe thanh âm rộn rã đặc trưng của tiếng búa đục kim loại, tiếng khò lửa bập bùng từ các xưởng sản xuất hai bên đường làng. Nghệ nhân Đại Bái nổi tiếng với kỹ thuật gò chạm nổi tranh đồng tam khí, ngũ khí, đúc tượng đồng và lư hương tinh vi đến từng milimét. Du khách có thể đến dâng hương tại ngôi Đình làng Đại Bái cổ kính, ngắm nhìn các kiệt tác tranh đồng lấp lánh sắc màu dưới ánh đèn showroom, tự mình trải nghiệm vài nét chạm búa và lựa chọn những vật phẩm phong thủy, tranh đồng may mắn mang đậm hồn cốt văn hóa dân tộc.`
  },
  'thach-xa': {
    title: 'Ký ức Tuổi thơ với Chuồn chuồn Tre Thạch Xá',
    text: `Chào mừng quý khách đến với Làng chuồn chuồn tre Thạch Xá, huyện Thạch Thất, Hà Nội, nằm yên bình ngay dưới chân di tích quốc gia đặc biệt Chùa Tây Phương, cách trung tâm thủ đô khoảng 35 cây số về phía Tây. Nghề làm chuồn chuồn tre tại đây đã phát triển hơn 20 năm, trở thành biểu tượng độc đáo của ký ức tuổi thơ. Những chú chuồn chuồn làm hoàn toàn bằng tre già bánh tẻ, qua bàn tay gọt giũa khéo léo của nghệ nhân có thể tự đứng thăng bằng hoàn hảo trên đầu ngón tay hay mép bàn một cách kỳ diệu. Về Thạch Xá, du khách sẽ được đắm mình trong không gian làng quê thanh tịnh với những giàn phơi chuồn chuồn rực rỡ sắc màu cầu vồng, trực tiếp cầm cọ vẽ hoa văn trang trí cho chú chuồn chuồn của riêng mình, và kết hợp leo các bậc đá ong rêu phong vãn cảnh Chùa Tây Phương cổ kính, thưởng thức món chè lam ấm nóng đặc sản xứ Đoài.`
  },
  'chang-son-quat': {
    title: 'Hồn Gió Quạt Giấy Trăm Năm Xứ Đoài Chàng Sơn',
    text: `Chào mừng quý khách đến với Làng quạt Chàng Sơn, huyện Thạch Thất, cách trung tâm Hà Nội khoảng 30 cây số về phía Tây. Nằm trên vùng đất văn hiến xứ Đoài, nghề làm quạt Chàng Sơn đã có lịch sử hàng trăm năm từ thế kỷ mười chín, từng được mang đi triển lãm tại thủ đô Paris nước Pháp thời thuộc địa. Từ những nan tre già ngâm kỹ, qua đôi bàn tay khéo léo chẻ vót, bấm lỗ, vào giấy và phủ cước, người thợ Chàng Sơn đã tạo nên những chiếc quạt giấy, quạt lụa mát lành và những bức quạt tranh thủy mặc, thư pháp tuyệt mỹ. Đến Chàng Sơn, bạn sẽ được chiêm ngưỡng những khoảng sân phơi quạt rực rỡ sắc đỏ, xanh, vàng bung tỏa như cánh bướm, tự tay vẽ hoa văn lên chiếc quạt lưu niệm nhỏ xinh và cảm nhận làn gió mát thanh tao mang theo cả tâm hồn của người nghệ nhân đất Việt.`
  },
  'nghia-dong': {
    title: 'Nét Mộc mạc Quạt Lá và Nón Chằm Nghĩa Đồng',
    text: `Chào mừng quý khách đến với Làng quạt lá chằm nón Nghĩa Đồng, xã Đại Yên, huyện Chương Mỹ, cách trung tâm Hà Nội khoảng 30 cây số về phía Tây Nam. Đi theo Quốc lộ 6 qua thị trấn Chúc Sơn, bạn sẽ đến với ngôi làng yên bình nép mình bên những rặng tre xanh. Nghề chằm nón và làm quạt lá nơi đây đã tồn tại qua nhiều thế hệ. Khác với quạt giấy hay quạt vải, quạt Nghĩa Đồng được làm thủ công hoàn toàn từ những tàu lá cọ rừng, được người thợ phẳng lá bằng bàn là nóng, vót nan tre dẻo dai rồi dùng kim chỉ cước 'chằm' từng đường khâu chắc chắn, bền đẹp và thân thiện với môi trường. Về thăm Nghĩa Đồng, bạn sẽ bắt gặp khung cảnh các bà, các chị ngồi quây quần khâu quạt dưới mái hiên nhà cổ rợp bóng mát, tận hưởng không khí làng quê thanh bình và chọn mua những chiếc quạt lá mát rượi mang đậm hương vị đồng quê Bắc Bộ.`
  },
  'ngu-xa': {
    title: 'Tinh hoa Đúc Đồng và Ẩm thực Bán đảo Ngũ Xã',
    text: `Chào mừng quý khách đến với Làng đúc đồng Ngũ Xã, nằm trên bán đảo hồ Trúc Bạch, quận Ba Đình, chỉ cách hồ Hoàn Kiếm chừng 3 cây số ngay trong lòng trung tâm Hà Nội. Ngũ Xã được thành lập từ thế kỷ mười bảy thời nhà Lê, khi thợ giỏi từ 5 làng nghề đúc đồng xứ Bắc cùng tụ hội về đây lập nghiệp. Nơi đây lừng danh với kỹ thuật đúc đồng nguyên khối tinh xảo bậc nhất, tiêu biểu là pho tượng Phật Thích Ca Mâu Ni nặng 12,3 tấn tọa lạc uy nghiêm tại Chùa Thần Quang. Ngày nay, Ngũ Xã không chỉ lưu giữ những lò đúc đồng truyền thống mà còn chuyển mình thành Khu phố ẩm thực kết hợp đi bộ Đảo Ngọc sôi động. Đến đây, bạn có thể chiêm ngưỡng kiệt tác tượng đồng, dạo bước ven bờ hồ Trúc Bạch lộng gió và thưởng thức món phở cuốn, phở chiên phồng trứ danh của mảnh đất kinh kỳ nghìn năm văn vật.`
  },
  'hong-ha': {
    title: 'Di sản Văn hóa Phi vật thể Diều Sáo Bá Dương Nội',
    text: `Chào mừng quý khách đến với Làng làm diều sáo Bá Dương Nội, xã Hồng Hà, huyện Đan Phượng, nằm êm đềm ven đê sông Hồng cách trung tâm Hà Nội khoảng 20 cây số về phía Tây Bắc. Nghề chơi và làm diều sáo nơi đây đã có lịch sử hàng trăm năm gắn liền với ngôi Miếu Diều linh thiêng thờ thần Giao Châu, và vừa được vinh danh là Di sản văn hóa phi vật thể quốc gia năm 2024. Cánh diều Bá Dương Nội mang hình giọt nước mềm mại, phất bằng giấy dó quét nhựa cậy chống thấm, mang trên lưng bộ sáo diều bằng ống tre bịt gỗ vàng tâm được khoét tỉ mỉ để tạo ra âm thanh ngân nga, trầm bổng vang xa hàng cây số. Nếu đến vào dịp rằm tháng 3 âm lịch, bạn sẽ được hòa mình vào Hội thi thả diều truyền thống tưng bừng, chiêm ngưỡng hàng trăm cánh diều no gió chao liệng giữa bầu trời xanh bao la của vùng châu thổ sông Hồng.`
  },
  'trach-xa': {
    title: 'Ngàn năm Kỹ nghệ Khâu tay Áo dài Trạch Xá',
    text: `Chào mừng quý khách đến với Làng may áo dài Trạch Xá, xã Hòa Lâm, huyện Ứng Hòa, cách trung tâm Hà Nội khoảng 40 cây số về phía Nam. Tương truyền, nghề may áo dài Trạch Xá đã có lịch sử hơn 1000 năm từ thời nhà Đinh, do Đức thánh tổ Nguyễn Thị Sen, một trong các bà hoàng của vua Đinh Tiên Hoàng, truyền dạy cho dân làng. Điểm độc nhất vô nhị làm nên thương hiệu Trạch Xá chính là tuyệt kỹ khâu tay hoàn toàn theo chiều dọc với kỹ thuật 'năm mũi một', giúp tà áo dài phẳng phiu, giấu đường chỉ tinh tế mà vẫn ôm sát vóc dáng người mặc. Ghé thăm Trạch Xá, du khách sẽ được vào dâng hương tại ngôi Đình làng thanh tịnh thờ Bà tổ nghề may, tận mắt thấy những người thợ nam cầm kim khâu tay thoăn thoắt, trực tiếp chọn lựa những thước lụa tơ tằm óng ả và đặt may cho mình một bộ áo dài truyền thống mang đậm quốc hồn quốc túy Việt Nam.`
  },
  'chuon-ngo': {
    title: 'Kiệt tác Cẩn Ốc Khảm Trai Xà cừ Chuôn Ngọ',
    text: `Chào mừng quý khách đến với Làng khảm trai Chuôn Ngọ, xã Chuyên Mỹ, huyện Phú Xuyên, nằm ven dòng sông Nhuệ cách trung tâm Hà Nội khoảng 35 đến 40 cây số về phía Nam. Nghề khảm trai Chuôn Ngọ có lịch sử từ thế kỷ thứ mười một thời nhà Lý, do danh tướng Trương Công Thành truyền dạy. Sản phẩm khảm xà cừ nơi đây từng được dùng làm đồ tiến cống cung đình và hiện đã xuất khẩu đi khắp năm châu. Bằng đôi bàn tay khéo léo, các nghệ nhân Chuôn Ngọ đã cưa xẻ từng mảnh vỏ trai, vỏ ốc ngũ sắc óng ánh, đục gỗ và cẩn ghép thành những bức tranh tứ quý, tranh phong cảnh hay những bộ hoành phi câu đối tinh vi, sống động. Đến với Chuôn Ngọ, bạn sẽ được ngắm nhìn các gian trưng bày lộng lẫy ánh xà cừ, tìm hiểu quy trình vẽ mẫu, cưa mài vỏ ốc kỳ công và cảm nhận sự thăng hoa của nghệ thuật thủ công truyền thống Bắc Bộ.`
  },
  'xuan-la': {
    title: 'Sắc màu Dân gian Nghệ thuật Tò he Xuân La',
    text: `Chào mừng quý khách đến với Làng làm tò he Xuân La, xã Phượng Dực, huyện Phú Xuyên, cách trung tâm Hà Nội khoảng 40 cây số về phía Nam. Nghề nặn tò he ở Xuân La đã tồn tại hơn ba thế kỷ, là nét văn hóa dân gian độc nhất vô nhị của thủ đô. Từ những nắm bột nếp luộc chín dẻo quánh, phối trộn cùng các màu nhuộm tự nhiên từ gấc chín, lá nếp, nghệ tươi và tro bếp, chỉ trong vài phút ngắn ngủi, đôi tay thoăn thoắt của nghệ nhân đã biến chúng thành những chú rồng, bông hoa, nhân vật cổ tích hay con giáp vô cùng sinh động. Về với làng quê Xuân La, du khách như được trở về với ký ức tuổi thơ êm đềm, được các nghệ nhân hướng dẫn tự tay nhào nặn những que tò he ngộ nghĩnh mang về làm quà, và lắng nghe âm thanh tò-te-tò-he rộn rã gắn liền với bao thế hệ trẻ thơ đất Việt.`
  },
  'quat-dong': {
    title: 'Đường Kim Mũi Chỉ Dệt Tranh Thêu Quất Động',
    text: `Chào mừng quý khách đến với Làng thêu ren Quất Động, huyện Thường Tín, cách trung tâm Hà Nội khoảng 20 cây số về phía Nam ngay ven trục Quốc lộ 1A. Nghề thêu Quất Động có lịch sử từ thế kỷ mười bảy, gắn liền với công lao truyền nghề của Tiến sĩ Lê Công Hành sau chuyến đi sứ phương Bắc. Nghề thêu tay Quất Động đòi hỏi sự kiên nhẫn, đôi mắt tinh tường và bàn tay tài hoa tuyệt đối. Bằng những sợi chỉ tơ bóng mượt đủ sắc màu, người thợ Quất Động đã đâm kim, lướt chỉ biến những tấm vải lụa thành các bức tranh thêu phong cảnh làng quê, tranh chân dung, hoành phi câu đối sống động như tranh vẽ. Ghé thăm các xưởng thêu bên thềm nhà cổ, bạn sẽ được chiêm ngưỡng không gian tĩnh lặng đầy tính nghệ thuật, thử cầm kim thêu những mũi chỉ đầu tiên và chọn mua những bức tranh thêu tinh tế làm quà lưu niệm quý giá cho gia đình và bạn bè.`
  },
  'tranh-khuc': {
    title: 'Hương Vị Tết Cổ Truyền Bánh Chưng Tranh Khúc',
    text: `Chào mừng quý khách đến với Làng bánh chưng Tranh Khúc, xã Duyên Hà, huyện Thanh Trì, nằm ven đê sông Hồng cách trung tâm hồ Hoàn Kiếm chỉ khoảng 15 cây số về phía Nam. Tranh Khúc từ lâu đã nức tiếng khắp cõi đất Bắc với nghề gói bánh chưng truyền thống hàng trăm năm qua. Điểm độc đáo nhất của người thợ Tranh Khúc là kỹ thuật gói 'vo' bằng tay hoàn toàn không cần khuôn, nhưng chiếc bánh nào ra lò cũng vuông vức, đặn góc và đều chằn chặn chỉ trong chưa đầy một phút. Nguyên liệu làm bánh được chọn lựa vô cùng khắt khe: nếp cái hoa vàng hạt mẩy dẻo thơm, đỗ xanh tiêu lòng vàng óng, thịt lợn ba chỉ tươi ngon và lá dong báng xanh mướt lấy từ núi rừng Tây Bắc. Về Tranh Khúc vào dịp giáp Tết, du khách sẽ được đắm mình trong không khí rực rỡ lửa hồng của hàng trăm nồi luộc bánh thâu đêm và thưởng thức những chiếc bánh chưng nóng hổi, xanh như ngọc bích đậm đà phong vị Tết Việt.`
  },
  'chang-son-moc': {
    title: 'Bàn Tay Vàng Điêu Khắc Mộc Mỹ Nghệ Chàng Sơn',
    text: `Chào mừng quý khách đến với Làng mộc mỹ nghệ Chàng Sơn, huyện Thạch Thất, cách trung tâm Hà Nội khoảng 30 cây số về phía Tây. Bên cạnh nghề quạt, Chàng Sơn còn nổi danh ngàn năm là cái nôi của những người thợ mộc tài hoa bậc nhất kinh kỳ, từng được triều đình nhà Nguyễn triệu về kinh đô Huế để chạm khắc cung điện, lăng tẩm hoàng gia và tham gia tạc hệ thống tượng phật tuyệt tác tại Chùa Tây Phương. Dưới nhát đục, nhát búa điêu luyện, những khối gỗ quý vô tri đã hóa thân thành các bộ sập gụ tủ chè, án gian, cửa võng và hoành phi câu đối chạm trổ hoa văn tứ linh rồng phượng vô cùng uyển chuyển, tinh xảo. Về Chàng Sơn, du khách sẽ được tham quan các xưởng mộc rộn rã tiếng cưa đục, ngửi mùi thơm mộc mạc của thớ gỗ mới, và đặt mua những sản phẩm nội thất mỹ nghệ đỉnh cao bền đẹp cùng năm tháng.`
  },
  'da-sy': {
    title: 'Ngọn Lửa Lò Rèn Nửa Thiên Niên Kỷ Đa Sỹ',
    text: `Chào mừng quý khách đến với Làng rèn dao kéo Đa Sỹ, phường Kiến Hưng, quận Hà Đông, cách trung tâm hồ Hoàn Kiếm khoảng 10 đến 12 cây số về phía Tây Nam ven sông Nhuệ. Làng Đa Sỹ có lịch sử làm nghề rèn hơn nửa thiên niên kỷ từ thời Hậu Lê, nổi danh khắp cả nước với thương hiệu 'Dao Đa Sỹ' sắc bén, bền bỉ và giữ cạnh dài lâu. Bước chân vào làng, du khách sẽ nghe vang vọng tiếng quai búa chan chát, tiếng quạt gió phì phò và ánh lửa đỏ rực từ các lò than rực hồng. Bí quyết làm nên tên tuổi Đa Sỹ nằm ở kỹ thuật tôi thép gia truyền trong nước và đôi mắt tinh tường định lượng nhiệt độ của người thợ già. Ghé thăm các lò rèn, bạn sẽ được tận mắt xem nghệ nhân quai búa tạo phôi, mài lưỡi dao sáng loáng và chọn mua những chiếc dao thái, dao chặt hay kéo cắt may chất lượng hàng đầu trực tiếp tại các xưởng gia truyền.`
  },
  'lang-vong': {
    title: 'Hồn Thu Hà Nội trong Từng Hạt Cốm Làng Vòng',
    text: `Chào mừng quý khách đến với Làng cốm Vòng, phường Dịch Vọng Hậu, quận Cầu Giấy, chỉ cách trung tâm Hà Nội chừng 6 cây số về phía Tây. Nghề làm cốm làng Vòng đã có từ thời nhà Lý và trở thành biểu tượng ẩm thực thanh tao bậc nhất của mùa thu Hà Nội, từng được chọn làm vật phẩm tiến cống triều đình. Từng hạt nếp non bấm ra sữa được thu hoạch đúng độ, trải qua các công đoạn rang củi nhỏ lửa bằng chảo gang, giã cối nhịp nhàng và sàng sảy công phu để cho ra những mẻ cốm mỏng dẹt, xanh màu ngọc bích và thơm ngát hương sữa đồng nội. Hạt cốm Vòng được gói cẩn trọng trong hai lớp lá: lá ráy giữ cho cốm mềm và lá sen ướp hương thơm ngát. Về làng Vòng vào cữ thu, du khách sẽ được thưởng thức cốm tươi dẻo ngọt cùng chuối tiêu trứng cuốc, nhâm nhi tách trà sen thơm ngát và nếm thử các đặc sản từ cốm như xôi cốm hạt sen, chè cốm và chả cốm đậm đà phong vị kinh kỳ.`
  },
  'kieu-ky': {
    title: 'Kỹ Thuật Đập Quỳ Vàng Ba Trăm Năm Kiêu Kỵ',
    text: `Chào mừng quý khách đến với Làng nghề dát vàng bạc Kiêu Kỵ, huyện Gia Lâm, cách trung tâm Hà Nội khoảng 15 đến 20 cây số về phía Đông. Hình thành từ hơn 300 năm trước thời Hậu Lê, Kiêu Kỵ là làng nghề duy nhất ở Việt Nam nắm giữ bí quyết làm quỳ vàng, quỳ bạc thủ công truyền thống. Nghề dát vàng Kiêu Kỵ đòi hỏi sự kiên trì và tỉ mỉ phi thường: từ một chỉ vàng nhỏ, qua bàn tay gõ búa hàng vạn lần của người thợ trên giấy quỳ đặc biệt, có thể cán mỏng thành hàng trăm lá vàng siêu mỏng, nhẹ bay theo gió. Những lá quỳ vàng óng ánh này được các nghệ nhân dùng để dát lên các pho tượng Phật, hoành phi câu đối và các kiệt tác mỹ nghệ cung đình lộng lẫy. Ghé thăm Kiêu Kỵ, bạn sẽ được bước vào không gian xưởng nghề tĩnh lặng, chiêm ngưỡng đôi tay nghệ nhân nâng niu từng lá vàng mỏng như cánh ve và cảm nhận nét đẹp văn hóa di sản vô giá của vùng đất Gia Lâm.`
  }
};

async function generateAll() {
  console.log('Starting audio generation for 20 villages with vi-VN-HoaiMyNeural...');
  const tts = new MsEdgeTTS();
  await tts.setMetadata('vi-VN-HoaiMyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  for (const [id, info] of Object.entries(villageScripts)) {
    const destFile = path.join(audioDir, `${id}.mp3`);
    console.log(`Generating audio for ${id} (${info.title})...`);
    
    await new Promise((resolve, reject) => {
      try {
        const { audioStream } = tts.toStream(info.text);
        const writeStream = fs.createWriteStream(destFile);
        audioStream.pipe(writeStream);
        writeStream.on('finish', () => {
          const stats = fs.statSync(destFile);
          const estSec = Math.round(stats.size / 6000); // 48kbps = 6KB/s
          console.log(`✅ [${id}.mp3] saved! Size: ${stats.size} bytes (~${estSec}s)`);
          resolve();
        });
        writeStream.on('error', reject);
      } catch (err) {
        reject(err);
      }
    });

    // Small delay to ensure clean connection
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('\n🎉 ALL 20 AUDIO FILES GENERATED SUCCESSFULLY!');
}

generateAll().catch(err => {
  console.error('Fatal error during audio generation:', err);
  process.exit(1);
});
