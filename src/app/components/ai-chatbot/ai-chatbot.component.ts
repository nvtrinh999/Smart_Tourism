import { Component, OnInit, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';
import { TourismService } from '../../services/tourism.service';
import { TourismData } from '../../models/tourism.model';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chatbot.component.html',
  styleUrls: ['./ai-chatbot.component.css']
})
export class AiChatbotComponent implements OnInit {
  private tourismService = inject(TourismService);

  @ViewChild('messagesScroll') private messagesScrollContainer?: ElementRef;

  isOpen = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  apiKey = signal<string>('');
  showKeyModal = signal<boolean>(false);
  userInput = '';

  // Safe auto-scroll tracking: only auto-scroll if user is already near bottom
  private isUserNearBottom = true;

  messages = signal<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Xin chào! Tôi là **Trợ lý Ảo Du Lịch Thông Minh Hà Nội** (tích hợp Google Gemini 2.5 Flash qua SDK `@google/genai`).\n\nTôi có thể hỗ trợ bạn theo dõi **mật độ đám đông theo thời gian thực**, tư vấn **giờ vàng tránh quá tải**, hướng dẫn chi tiết **xe buýt 47A đi Làng gốm Bát Tràng**, lịch viếng **Lăng Bác**, thuyết minh di sản số và lập lịch trình du lịch Thủ đô.\n\nBạn cần thông tin gì cho chuyến tham quan hôm nay?',
      timestamp: this.getCurrentTimeString()
    }
  ]);

  quickSuggestions: string[] = [
    'Lăng Bác hôm nay thế nào?',
    'Khung giờ vắng ở Hồ Gươm?',
    'Xe buýt đi Bát Tràng?',
    'Gợi ý lịch trình 1 ngày Hà Nội?'
  ];

  private staticSystemInstruction = '';

  get effectiveApiKey(): string {
    return this.apiKey() || environment.gemini?.apiKey || '';
  }

  ngOnInit(): void {
    // Load persisted API key if available in localStorage, or fall back to environment config
    const envKey = environment.gemini?.apiKey || '';
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedKey = localStorage.getItem('gemini_api_key') || '';
      if (savedKey) {
        this.apiKey.set(savedKey);
      } else if (envKey) {
        this.apiKey.set(envKey);
      }
    } else if (envKey) {
      this.apiKey.set(envKey);
    }

    // Build rich system instruction once data is loaded
    this.tourismService.loadData().subscribe(data => {
      if (data) {
        this.buildSystemInstruction(data);
      }
    });
  }

  /**
   * Listen to scroll events on chat container.
   * If user scrolls up to read old messages, remember state and do NOT force scroll down.
   */
  onMessagesScroll(event: Event): void {
    const el = event.target as HTMLElement;
    if (!el) return;
    const threshold = 60; // px threshold from bottom
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    this.isUserNearBottom = distanceToBottom <= threshold;
  }

  /**
   * Safe smooth scroll to bottom.
   * If force is false, only scrolls if user was already at or near bottom.
   */
  scrollToBottom(force: boolean = false): void {
    if (!force && !this.isUserNearBottom) return;

    if (this.messagesScrollContainer) {
      try {
        const el = this.messagesScrollContainer.nativeElement;
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth'
        });
      } catch (err) {
        if (this.messagesScrollContainer?.nativeElement) {
          this.messagesScrollContainer.nativeElement.scrollTop = this.messagesScrollContainer.nativeElement.scrollHeight;
        }
      }
    }
  }

  trackByMsgId(index: number, msg: ChatMessage): string {
    return msg.id;
  }

  toggleChat(): void {
    const opening = !this.isOpen();
    this.isOpen.set(opening);
    if (opening) {
      this.isUserNearBottom = true;
      setTimeout(() => this.scrollToBottom(true), 120);
    }
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  toggleKeyModal(): void {
    this.showKeyModal.update(v => !v);
  }

  saveApiKey(key: string): void {
    const trimmed = key.trim();
    this.apiKey.set(trimmed);
    if (typeof window !== 'undefined' && window.localStorage) {
      if (trimmed) {
        localStorage.setItem('gemini_api_key', trimmed);
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    }
    this.showKeyModal.set(false);
    this.messages.update(m => [
      ...m,
      {
        id: 'key-saved-' + Date.now(),
        sender: 'ai',
        text: trimmed
          ? 'Đã lưu Gemini API Key thành công! Chatbot hiện kết nối trực tiếp với model **gemini-2.5-flash** qua SDK `@google/genai`.'
          : 'Đã xóa API Key cá nhân. Bạn có thể cấu hình lại bất cứ lúc nào qua biểu tượng 🔑 hoặc trong file `src/environments/environment.ts`.',
        timestamp: this.getCurrentTimeString()
      }
    ]);
  }

  clearChat(): void {
    this.messages.set([
      {
        id: 'welcome-' + Date.now(),
        sender: 'ai',
        text: 'Lịch sử trò chuyện đã được làm mới. Tôi sẵn sàng hỗ trợ các câu hỏi tiếp theo của bạn!',
        timestamp: this.getCurrentTimeString()
      }
    ]);
  }

  useSuggestion(suggestion: string): void {
    this.userInput = suggestion;
    this.sendMessage();
  }

  sendMessage(): void {
    const query = this.userInput.trim();
    if (!query || this.isLoading()) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: this.getCurrentTimeString()
    };

    this.messages.update(m => [...m, userMsg]);
    this.userInput = '';
    this.isLoading.set(true);
    this.isUserNearBottom = true;
    setTimeout(() => this.scrollToBottom(true), 60);

    const key = this.effectiveApiKey;
    if (key) {
      this.callGeminiWithSdk(query, key);
    } else {
      // API Key is not configured: display clear instructions and reference info
      setTimeout(() => {
        this.isLoading.set(false);
        const refInfo = this.getDestinationQuickReference(query);
        let notice = `⚠️ **Chưa cấu hình Gemini API Key:**\n\n` +
          `Chatbot đã được nâng cấp lên mô hình **Google Gemini 2.5 Flash** (sử dụng SDK chính thức \`@google/genai\`), có khả năng trò chuyện tự nhiên, hiểu ngữ cảnh đa lượt và tư vấn du lịch thông minh.\n\n` +
          `**Cách kích hoạt:**\n` +
          `1. Bấm vào biểu tượng 🔑 trên thanh tiêu đề Chatbot để nhập Gemini API Key của bạn (Key được lưu an toàn tại trình duyệt).\n` +
          `2. Hoặc điền key vào biến \`apiKey\` trong file \`src/environments/environment.ts\` (hoặc \`environment.development.ts\`).\n\n` +
          `*(Lấy Gemini API Key hoàn toàn miễn phí tại [Google AI Studio](https://aistudio.google.com)).*`;

        if (refInfo) {
          notice += `\n\n---\n*(Dữ liệu tham khảo hệ thống cho câu hỏi của bạn:)*\n${refInfo}`;
        }
        this.addAiMessage(notice, 'notice-' + Date.now());
      }, 400);
    }
  }

  private async callGeminiWithSdk(query: string, apiKey: string): Promise<void> {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const modelName = environment.gemini?.model || 'gemini-2.5-flash';

      // Build conversation history (recent 8 turns, ensuring role begins with 'user')
      const history = this.messages()
        .filter(m => m.id !== 'welcome' && !m.id.startsWith('welcome-') && !m.id.startsWith('notice-') && !m.id.startsWith('err-') && !m.id.startsWith('key-saved-'))
        .slice(-8);

      const contents = history.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      // Ensure conversation begins with a 'user' turn
      while (contents.length > 0 && contents[0].role !== 'user') {
        contents.shift();
      }

      if (contents.length === 0) {
        contents.push({
          role: 'user',
          parts: [{ text: query }]
        });
      }

      // Timeout guard: 25 seconds
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT_ERROR')), 25000)
      );

      const generatePromise = ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: this.staticSystemInstruction,
          temperature: 0.7
        }
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);
      this.isLoading.set(false);

      const replyText = response?.text?.trim();
      if (replyText) {
        this.addAiMessage(replyText);
      } else {
        this.addAiMessage('Trợ lý AI đã xử lý xong nhưng không nhận được văn bản phản hồi. Bạn vui lòng thử lại câu hỏi.');
      }
    } catch (err: any) {
      this.isLoading.set(false);
      console.error('Gemini SDK Error:', err);

      const errMsg = err?.message || err?.toString() || '';
      let friendlyError = '';

      if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('API key not valid') || errMsg.includes('403') || errMsg.includes('400')) {
        friendlyError = `🔑 **API Key không hợp lệ hoặc bị từ chối:**\n\nVui lòng kiểm tra lại Gemini API Key trong \`src/environments/environment.ts\` hoặc bấm 🔑 trên thanh tiêu đề để cập nhật key chính xác từ Google AI Studio.`;
      } else if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('429') || errMsg.includes('quota') || errMsg.includes('rate limit')) {
        friendlyError = `⏳ **Đã vượt quá hạn mức yêu cầu (Quota / Rate Limit):**\n\nTài khoản hiện đã chạm giới hạn tần suất miễn phí của Google AI Studio. Vui lòng đợi khoảng 30 - 60 giây và thử lại!`;
      } else if (errMsg === 'TIMEOUT_ERROR' || errMsg.includes('timeout')) {
        friendlyError = `⏱️ **Hết thời gian chờ phản hồi (Timeout):**\n\nKết nối tới máy chủ Google Gemini bị gián đoạn hoặc mất quá nhiều thời gian. Vui lòng kiểm tra lại mạng và thử gửi lại câu hỏi.`;
      } else if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError') || errMsg.includes('network')) {
        friendlyError = `📡 **Lỗi kết nối mạng:**\n\nKhông thể kết nối đến máy chủ Google Gemini. Vui lòng kiểm tra lại đường truyền Internet và thử lại.`;
      } else {
        friendlyError = `⚠️ **Lỗi kết nối Gemini API:** ${errMsg || 'Yêu cầu không thể hoàn tất'}.\n\nBạn có thể thử gửi lại câu hỏi hoặc bấm 🔑 để nhập API key mới.`;
      }

      this.addAiMessage(friendlyError, 'err-' + Date.now());
    }
  }

  private addAiMessage(text: string, customId?: string): void {
    this.messages.update(m => [
      ...m,
      {
        id: customId || ('ai-' + Date.now()),
        sender: 'ai',
        text: text,
        timestamp: this.getCurrentTimeString()
      }
    ]);
    setTimeout(() => this.scrollToBottom(false), 80);
  }

  private buildSystemInstruction(data: TourismData): void {
    this.staticSystemInstruction = `
Bạn là Trợ lý Ảo Du Lịch Thông Minh chính thức của Cổng Thông Tin 'Hà Nội Smart Tourism' (Thủ đô Hà Nội).
Nhiệm vụ của bạn là tư vấn, giải đáp thắc mắc của du khách, ban giám khảo và học sinh - sinh viên dựa trên DỮ LIỆU ĐỀ ÁN HỆ THỐNG và KIẾN THỨC VĂN HÓA DU LỊCH:

1. TAB 1 - CẢNH BÁO ĐÁM ĐÔNG & TRÁNH BÃO QUÁ TẢI (DỮ LIỆU THỜI GIAN THỰC CỦA ĐỀ ÁN):
- Hồ Gươm & Phố Cổ: Cao điểm Thứ Bảy 19:00 - 21:00 (mật độ 95% - Báo động đỏ). Khung giờ vàng thanh bình: 06:30 - 08:30 (25%) và 14:00 - 16:00 (38%). Điểm thay thế: Vườn hoa Con Cóc / Diên Hồng, Bảo tàng Lịch sử Quốc gia, Phố sách 19/12.
- Hồ Tây & Trúc Bạch: Cao điểm cuối tuần hoàng hôn 16:00 - 20:00 (86%). Buổi sáng và ngày thường rất thoáng (30%). Điểm thay thế: Chùa Trấn Quốc, Làng hoa Nghi Tàm, đường dạo Quảng An.
- Hoàng Thành Thăng Long & Ba Đình: Cuối tuần sáng 08:30 - 10:30 (58% - ổn định). Điểm thay thế: Công viên Bách Thảo, Đoan Môn, Đại lộ Hoàng Diệu rợp bóng xà cừ.
- Lăng Chủ tịch Hồ Chí Minh (Lăng Bác): Tọa độ [21.0369, 105.8347]. Cao điểm sáng Chủ Nhật 07:30 - 10:30 (88%). Khung giờ lý tưởng: 05:30 - 06:30 (lễ thượng cờ trang nghiêm) và 14:00 - 16:30 (Nhà sàn, ao cá, Bảo tàng Hồ Chí Minh thoáng mát ~32%). Điểm kế cận: Chùa Một Cột (150m), Bảo tàng Hồ Chí Minh, Công viên Bách Thảo. Video tư liệu TikTok chính thức đã được tích hợp trên Hero Banner.

2. TAB 2 - VÙNG VEN VÀNH ĐAI XANH & LÀNG NGHỀ TRUYỀN THỐNG:
- 6 Điểm đến sinh thái: Vườn Quốc gia Ba Vì (48km), Khu đô thị Ecopark (15km), Thị trấn Tam Đảo (75km), Hồ Đại Lải (45km), Làng cổ Đường Lâm (45km - đá ong), Khu sinh thái Bản Rõm Sóc Sơn (32km).
- Cẩm nang xe buýt 47A đi Làng gốm Bát Tràng:
  • Điểm đón: Điểm trung chuyển Long Biên ➔ Bát Tràng.
  • Giá vé: 9.000 VNĐ/lượt (Học sinh - Sinh viên 5.000 VNĐ/vé tháng).
  • Tần suất: 15 - 20 phút/chuyến. Hoạt động từ 05:00 - 19:40 hàng ngày.
- Lịch trình tự túc 1 ngày Bát Tràng: Chi phí ước tính ~120.000đ - 180.000đ/người. Sáng đón xe buýt 47A, vuốt nặn gốm tại Lò Bầu cổ, trưa thưởng thức canh măng mực và ổi Đông Dư, chiều check-in Trung tâm Tinh hoa Làng nghề Việt.

3. TAB 3 - CHẠM DI SẢN BẰNG AUDIO GUIDE & QR CODE:
- Hệ thống Audio Guide tự túc thu âm 1-2 phút kèm mã QR độc bản cho: Lò Bầu Bát Tràng (700 năm giữ lửa), Cổng Ô Quan Chưởng (Cửa ô cổ duy nhất thời Nguyễn), Kiến trúc đá ong Làng cổ Đường Lâm.
- Du khách có thể dùng smartphone quét mã QR trên màn hình hoặc standee để nghe thuyết minh trực tiếp.

QUY TẮC ỨNG XỬ & TƯ VẤN:
- Với câu hỏi về các địa điểm trên: Tích hợp chính xác dữ liệu của đề án (mốc giờ, số liệu %, giá vé, số hiệu xe buýt).
- Với câu hỏi mở (lịch trình 2-3 ngày, ẩm thực Hà Nội, phở, bún chả, cà phê trứng, thời tiết, so sánh điểm đến, thơ ca, văn hóa nghìn năm Thăng Long): Tận dụng tối đa năng lực ngôn ngữ và tư duy của Gemini để gợi ý sáng tạo, thông minh, sâu sắc và đầy cảm hứng.
- Trả lời bằng tiếng Việt lịch sự, thân thiện, súc tích và có cấu trúc rõ ràng (sử dụng gạch đầu dòng, in đậm các mốc giờ, số liệu và địa danh).
- Không bịa đặt giờ mở cửa, giá vé hoặc số liệu nếu không chắc chắn; khuyến nghị du khách kiểm tra thông báo chính thức nếu thông tin mang tính thay đổi theo mùa hoặc sự kiện.
`;
  }

  getDestinationQuickReference(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('lăng bác') || q.includes('bác hồ') || q.includes('ba đình')) {
      return `🏛️ **Thông tin Lăng Chủ tịch Hồ Chí Minh (Lăng Bác):**\n\n` +
        `• **Mật độ lưu lượng:** Cao điểm vào sáng cuối tuần (07:30 - 10:30, mật độ ~88%).\n` +
        `• **Khung giờ lý tưởng:** Sáng sớm 05:30 - 06:30 (xem lễ Thượng cờ trang nghiêm) hoặc buổi chiều 14:00 - 16:30 (tham quan Nhà sàn Bác Hồ, ao cá, Bảo tàng Hồ Chí Minh thoáng mát ~32%).\n` +
        `• **Điểm tham quan kế cận:** Chùa Một Cột (150m), Bảo tàng Hồ Chí Minh (200m), Công viên Bách Thảo.\n` +
        `• **Video tư liệu TikTok:** Đã tích hợp video tư liệu Lăng Bác trực tiếp trên Banner chính.`;
    }

    if (q.includes('hồ gươm') || q.includes('phố cổ') || q.includes('quá tải') || q.includes('tránh bão')) {
      return `⚠️ **Cảnh báo mật độ Hồ Gươm & Phố Cổ:**\n\n` +
        `• **Thời điểm quá tải nghiêm trọng:** Tối Thứ Bảy từ 19:00 - 21:00 (Mật độ 95% - Báo động đỏ, không gian đi bộ rất đông đúc).\n` +
        `• **Khung giờ vàng thanh bình:** Sáng sớm 06:30 - 08:30 (25%) hoặc đầu giờ chiều ngày thường 14:00 - 16:00 (38%).\n` +
        `• **Điểm đến thay thế thông thoáng:** Vườn hoa Tao Đàn / Con Cóc, Bảo tàng Lịch sử Quốc gia (số 1 Tràng Tiền), Phố sách 19/12.`;
    }

    if (q.includes('xe buýt') || q.includes('bát tràng') || q.includes('47a') || q.includes('làng gốm')) {
      return `🚌 **Cẩm nang Xe buýt 47A đi Làng gốm Bát Tràng:**\n\n` +
        `• **Lộ trình:** Điểm trung chuyển Long Biên ➔ Bát Tràng.\n` +
        `• **Giá vé:** 9.000 VNĐ / lượt (Học sinh - Sinh viên chỉ 5.000 VNĐ / vé tháng).\n` +
        `• **Tần suất:** 15 - 20 phút / chuyến (Hoạt động từ 05:00 - 19:40 hàng ngày).\n` +
        `• **Trải nghiệm gợi ý:** Tham quan di tích Lò Bầu cổ 700 năm, vuốt nặn gốm tại chỗ và thưởng thức đặc sản ổi Đông Dư.`;
    }

    if (q.includes('vùng ven') || q.includes('ba vì') || q.includes('tam đảo') || q.includes('ecopark') || q.includes('đường lâm')) {
      return `🌲 **Bộ sưu tập Điểm đến Vùng ven & Vành đai xanh:**\n\n` +
        `• **Phía Tây:** Vườn Quốc gia Ba Vì (48km - rừng thông & đền Thượng), Làng cổ Đường Lâm (45km - nhà cổ đá ong).\n` +
        `• **Phía Bắc:** Thị trấn Tam Đảo (75km - mây mù mát mẻ), Hồ Đại Lải (45km), Bản Rõm Sóc Sơn (32km - cắm trại rừng thông).\n` +
        `• **Đông Nam:** Khu đô thị sinh thái Ecopark (15km - công viên mùa xuân, đại ngàn xanh mát).\n` +
        `• *Bạn có thể xem bản đồ số Google Maps tại Tab 2 của trang web.*`;
    }

    if (q.includes('qr') || q.includes('audio') || q.includes('thuyết minh') || q.includes('di sản')) {
      return `🎧 **Hệ thống Audio Guide & Mã QR Di sản (Tab 3):**\n\n` +
        `• Đề án đã số hóa thuyết minh đa phương tiện (thời lượng 1 - 2 phút) do nhóm tự thu âm.\n` +
        `• Gồm 3 di tích trọng điểm: **Lò Bầu Bát Tràng**, **Cửa ô Quan Chưởng**, và **Nhà cổ đá ong Đường Lâm**.\n` +
        `• Quý khách hoặc Ban Giám khảo có thể dùng camera điện thoại quét trực tiếp mã QR trên màn hình để mở trang Mobile thuyết minh tự động!`;
    }

    return '';
  }

  private getCurrentTimeString(): string {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
}

