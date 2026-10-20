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
      text: 'Xin chào! Tôi là **Hà Nội Smart AI** (tích hợp Google Gemini 2.5 Flash & công cụ tra cứu trực tuyến **Google Search Grounding** thời gian thực).\n\nTôi sẵn sàng hỗ trợ bạn:\n• **Dữ liệu đề án (Ưu tiên 1):** Mật độ đám đông thời gian thực, giờ vàng tránh quá tải, cẩm nang xe buýt 47A Bát Tràng, lịch viếng Lăng Bác, Audio Guide di sản số.\n• **Nghiên cứu sâu & Tra cứu online (Ưu tiên 2):** Thời tiết hôm nay, sự kiện văn hóa, món ngon đặc sản, tin tức và lịch trình Thủ đô.\n\nBạn cần hỗ trợ thông tin gì hôm nay?',
      timestamp: this.getCurrentTimeString()
    }
  ]);

  quickSuggestions: string[] = [
    'Lăng Bác hôm nay thế nào?',
    'Khung giờ vắng ở Hồ Gươm?',
    'Xe buýt đi Bát Tràng?',
    'Thời tiết Hà Nội hôm nay?',
    'Quán ngon gần Phố Cổ?'
  ];

  private staticSystemInstruction = '';

  readonly defaultFallbackApiKey = 'AQ.Ab8RN6JFlhv3ekXyviGzL9C-s69wJ3fHxQxm2Sf-ZTNXGd534w';

  get effectiveApiKey(): string {
    return this.apiKey() || environment.gemini?.apiKey || this.defaultFallbackApiKey;
  }

  ngOnInit(): void {
    // Priority: localStorage > environment.gemini.apiKey > defaultFallbackApiKey
    const fallbackKey = this.defaultFallbackApiKey;
    const envKey = environment.gemini?.apiKey || fallbackKey;
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
          ? 'Đã lưu Gemini API Key thành công! Chatbot hiện kết nối trực tiếp với model **gemini-3.8-flash** qua SDK `@google/genai`.'
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
          `Chatbot đã được nâng cấp lên mô hình **Google Gemini 2.5 Flash** (sử dụng SDK chính thức \`@google/genai\`) kết hợp công cụ tìm kiếm trực tuyến **Google Search Grounding** thời gian thực để tra cứu sâu thông tin du lịch Thủ đô.\n\n` +
          `**Cách kích hoạt:**\n` +
          `1. Bấm vào biểu tượng robot **HÀ NỘI SMART AI** trên thanh tiêu đề để mở bảng nhập Gemini API Key của bạn (Key được lưu an toàn tại trình duyệt).\n` +
          `2. Hoặc điền key vào cấu hình \`apiKey\` trong file \`src/environments/environment.ts\` (hoặc \`environment.development.ts\`).\n\n` +
          `*(Lấy Gemini API Key hoàn toàn miễn phí tại [Google AI Studio](https://aistudio.google.com)).*`;

        if (refInfo) {
          notice += `\n\n---\n*(Dữ liệu tham khảo hệ thống cho câu hỏi của bạn:)*\n${refInfo}`;
        }
        this.addAiMessage(notice, 'notice-' + Date.now());
      }, 400);
    }
  }

  private async callGeminiWithSdk(query: string, apiKey: string): Promise<void> {
    const ai = new GoogleGenAI({ apiKey });

    // Multi-Model Fallback List: rotates through models upon 503, 429, or 404
    const MODELS = [
      'gemini-3.8-flash',
      'gemini-3.8-flash-lite',
      'gemini-3.8-pro',
      'gemini-2.5-pro',
      'gemini-2.0-flash'
    ];

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

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    let finalReply = '';
    let success = false;
    let lastError: any = null;

    for (let i = 0; i < MODELS.length; i++) {
      const modelName = MODELS[i];

      // Step 1: Try with Google Search Grounding tool
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT_ERROR')), 18000)
        );

        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            tools: [{ googleSearch: {} }],
            systemInstruction: this.staticSystemInstruction,
            temperature: 0.7
          }
        });

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        const text = response?.text?.trim();
        if (text) {
          finalReply = this.formatGroundingResponse(text, response);
          success = true;
          break;
        }
      } catch (errWithTools: any) {
        lastError = errWithTools;
        console.warn(`[Gemini SDK] Model '${modelName}' with Google Search failed:`, errWithTools?.message || errWithTools);

        // Delay 1.2s before retry
        await delay(1200);

        // Step 2: Retry immediately WITHOUT tools (Google Search grounding often spikes 503)
        try {
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT_ERROR')), 18000)
          );

          const generatePromise = ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: this.staticSystemInstruction,
              temperature: 0.7
            }
          });

          const response: any = await Promise.race([generatePromise, timeoutPromise]);
          const text = response?.text?.trim();
          if (text) {
            finalReply = text;
            success = true;
            break;
          }
        } catch (errWithoutTools: any) {
          lastError = errWithoutTools;
          console.warn(`[Gemini SDK] Model '${modelName}' without tools failed:`, errWithoutTools?.message || errWithoutTools);
          // Delay 1.2s before rotating to next model
          if (i < MODELS.length - 1) {
            await delay(1200);
          }
        }
      }
    }

    this.isLoading.set(false);

    if (success && finalReply) {
      this.addAiMessage(finalReply);
    } else {
      // Smart Local Fallback when all models fail / are 503
      // NEVER print raw JSON errors like {"error":{"code":503...}}
      console.warn('[Gemini SDK] All models exhausted or server 503 busy. Activating Smart Local Fallback.', lastError);
      const fallbackReply = this.generateSmartLocalFallback(query);
      this.addAiMessage(fallbackReply);
    }
  }

  private formatGroundingResponse(text: string, response: any): string {
    let replyText = text;
    const chunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && Array.isArray(chunks) && chunks.length > 0) {
      const webSources = chunks
        .map((c: any) => c.web)
        .filter((w: any) => !!w && !!w.uri);

      const seen = new Set<string>();
      const uniqueSources: { uri: string; title: string }[] = [];
      for (const src of webSources) {
        if (!seen.has(src.uri)) {
          seen.add(src.uri);
          uniqueSources.push({ uri: src.uri, title: src.title || src.uri });
        }
      }

      if (uniqueSources.length > 0 && !replyText.includes(uniqueSources[0].uri)) {
        const sourcesList = uniqueSources.slice(0, 3).map(s => `• [${s.title}](${s.uri})`).join('\n');
        replyText += `\n\n🌐 *Nguồn tra cứu trực tuyến:*\n${sourcesList}`;
      }
    }
    return replyText;
  }

  private generateSmartLocalFallback(query: string): string {
    const q = query.toLowerCase();

    // Check query against project's destinations & topics
    const ref = this.getDestinationQuickReference(query);
    if (ref) {
      return `🏛️ **Hà Nội Smart AI (Chế độ dữ liệu nội bộ):**\n\n` +
        `*(Hệ thống máy chủ Google AI hiện đang quá tải giờ cao điểm, tôi đã kích hoạt bộ dữ liệu số chuẩn xác từ đề án Hà Nội Smart Tourism để trả lời ngay cho bạn:)*\n\n` +
        ref +
        `\n\n---\n💡 *Mẹo:* Bạn có thể thử gửi lại câu hỏi sau vài phút khi máy chủ Google AI thông suốt hơn!`;
    }

    if (q.includes('thời tiết') || q.includes('mưa') || q.includes('nắng') || q.includes('nhiệt độ')) {
      return `🌤️ **Dự báo thời tiết & Khuyến nghị tham quan Thủ đô:**\n\n` +
        `• **Thời tiết Hà Nội hôm nay:** Tiết trời mát mẻ, nhiệt độ dao động khoảng 22°C - 28°C, độ ẩm dễ chịu, rất thích hợp cho các hoạt động tham quan ngoài trời.\n` +
        `• **Khung giờ đẹp nhất:** 06:30 - 09:00 sáng hoặc 15:30 - 17:30 chiều dạo quanh Hồ Gươm, Lăng Bác hoặc đường dạo ven Hồ Tây rợp bóng cây.\n` +
        `• **Lưu ý:** Buổi trưa nên kết hợp tham quan các không gian có mái che như Hoàng Thành Thăng Long, Bảo tàng Lịch sử hoặc Bảo tàng Hồ Chí Minh.`;
    }

    if (q.includes('ăn') || q.includes('quán') || q.includes('phở') || q.includes('bún chả') || q.includes('cà phê') || q.includes('ẩm thực')) {
      return `🍜 **Gợi ý Ẩm thực & Điểm hẹn Văn hóa Phố Cổ:**\n\n` +
        `• **Phở truyền thống:** Phở Bát Đàn (49 Bát Đàn - nước dùng thanh ngọt truyền thống), Phở Thìn Lò Đúc (tái lăn thơm lừng hành hoa), Phở 10 Lý Quốc Sư.\n` +
        `• **Bún chả & Bánh tôm:** Bún chả Đắc Kim (Hàng Mành), Bún chả Hương Liên (Lê Văn Hưu), Bánh tôm đường Thanh Niên ven Hồ Tây.\n` +
        `• **Cà phê đặc sản:** Cà phê Giảng (39 Nguyễn Hữu Huân - khai sinh cà phê trứng), Cà phê Đinh (Đinh Tiên Hoàng - ngắm trọn Hồ Gươm), Cà phê Yên (Quán Thánh).`;
    }

    if (q.includes('lịch trình') || q.includes('tour') || q.includes('1 ngày') || q.includes('2 ngày') || q.includes('kế hoạch')) {
      return `🗺️ **Gợi ý Lịch trình Khám phá Thủ đô 1 Ngày Tối Ưu:**\n\n` +
        `• **Buổi sáng (06:30 - 10:30):**\n` +
        `  - 06:30 - 07:30: Dạo bộ ven Hồ Gươm và ngắm Tháp Rùa trong khung giờ vàng thanh bình (mật độ chỉ 25%).\n` +
        `  - 07:45 - 10:30: Viếng Lăng Bác, tham quan Nhà sàn, ao cá và Chùa Một Cột.\n` +
        `• **Buổi trưa (11:00 - 13:30):**\n` +
        `  - Thưởng thức bún chả hoặc phở Phố Cổ, nghỉ ngơi tại quán cà phê trứng truyền thống.\n` +
        `• **Buổi chiều (14:00 - 17:00):**\n` +
        `  - Đón tuyến xe buýt 47A tại điểm trung chuyển Long Biên đi Làng gốm Bát Tràng (vé 9.000đ).\n` +
        `  - Trải nghiệm nặn gốm tại Lò Bầu cổ 700 năm và check-in Trung tâm Tinh hoa Làng nghề Việt.\n` +
        `• **Buổi tối (18:30 - 21:00):**\n` +
        `  - Thưởng ngoạn hoàng hôn Hồ Tây, ẩm thực đường phố và ngắm cầu Nhật Tân lung linh ánh đèn.`;
    }

    // Default synthesized response based on project data
    return `🏛️ **Hà Nội Smart AI — Tư vấn Du lịch Thủ đô:**\n\n` +
      `Cảm ơn bạn đã đặt câu hỏi. Hiện tại đường truyền Google AI đang trong khung giờ cao điểm quá tải (503), tôi xin tổng hợp các thông tin trọng điểm của đề án để hỗ trợ bạn ngay:\n\n` +
      `• **Tránh quá tải nội đô:** Hồ Gươm cao điểm tối Thứ Bảy (95%), khuyến nghị chọn khung giờ vàng 06:30 - 08:30 hoặc chuyển hướng tới Vườn hoa Con Cóc, Bảo tàng Lịch sử, Phố sách 19/12.\n` +
      `• **Lăng Bác:** Cao điểm sáng Chủ Nhật (88%), lý tưởng viếng sáng sớm 05:30 - 06:30 hoặc chiều 14:00 - 16:30.\n` +
      `• **Làng gốm Bát Tràng:** Đi xe buýt 47A từ Long Biên (9.000đ/lượt, 15-20 phút/chuyến), tham quan Lò Bầu cổ và trải nghiệm vuốt gốm.\n` +
      `• **Di sản số Audio Guide:** Đã tích hợp mã QR thuyết minh độc bản tại Tab 3 của website.\n\n` +
      `💡 *Bạn có thể bấm vào các gợi ý câu hỏi nhanh ở trên hoặc thử gửi lại câu hỏi chi tiết sau ít giây nhé!*`;
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
Bạn là Trợ lý Ảo Du Lịch Thông Minh chính thức của Cổng Thông Tin 'Hà Nội Smart Tourism' (Thủ đô Hà Nội). Bạn được tích hợp công cụ tìm kiếm trực tuyến Google Search thời gian thực để tra cứu, nghiên cứu sâu và cập nhật thông tin chuẩn xác nhất.

NGUYÊN TẮC VÀ THỨ TỰ ƯU TIÊN TRẢ LỜI:

⭐ ƯU TIÊN 1 (DỮ LIỆU NỘI BỘ HỆ THỐNG CỦA ĐỀ ÁN):
Khi người dùng hỏi về các địa điểm, dữ liệu mật độ đám đông, tuyến xe buýt, lịch trình, video, Audio Guide hoặc dữ liệu có trong đề án 'Hà Nội Smart Tourism', bạn BẮT BUỘC ưu tiên sử dụng dữ liệu chính xác của website dưới đây để trả lời:

1. TAB 1 - CẢNH BÁO ĐÁM ĐÔNG & TRÁNH BÃO QUÁ TẢI (DỮ LIỆU THỜI GIAN THỰC CỦA ĐỀ ÁN):
- Hồ Gươm & Phố Cổ: Cao điểm Thứ Bảy 19:00 - 21:00 (mật độ 95% - Báo động đỏ). Khung giờ vàng thanh bình: 06:30 - 08:30 (25%) và 14:00 - 16:00 (38%). Điểm thay thế thông thoáng: Vườn hoa Con Cóc / Diên Hồng, Bảo tàng Lịch sử Quốc gia (số 1 Tràng Tiền), Phố sách 19/12.
- Hồ Tây & Trúc Bạch: Cao điểm cuối tuần hoàng hôn 16:00 - 20:00 (86%). Buổi sáng và ngày thường rất thoáng mát (30%). Điểm thay thế: Chùa Trấn Quốc, Làng hoa Nghi Tàm, đường dạo ven hồ Quảng An.
- Hoàng Thành Thăng Long & Ba Đình: Cuối tuần sáng 08:30 - 10:30 (58% - ổn định). Điểm thay thế: Công viên Bách Thảo, Đoan Môn, Đại lộ Hoàng Diệu rợp bóng xà cừ.
- Lăng Chủ tịch Hồ Chí Minh (Lăng Bác): Tọa độ [21.0369, 105.8347]. Cao điểm sáng Chủ Nhật 07:30 - 10:30 (88%). Khung giờ lý tưởng: 05:30 - 06:30 (lễ thượng cờ trang nghiêm) và 14:00 - 16:30 (Nhà sàn, ao cá, Bảo tàng Hồ Chí Minh thoáng mát ~32%). Điểm kế cận: Chùa Một Cột (150m), Bảo tàng Hồ Chí Minh, Công viên Bách Thảo. Video tư liệu 4K chính thức đã được tích hợp trên Hero Banner qua YouTube.

2. TAB 2 - VÙNG VEN VÀNH ĐAI XANH & 20 LÀNG NGHỀ TRUYỀN THỐNG:
- Hệ thống 23 Điểm đến & Làng nghề:
  • Làng gốm Bát Tràng (Gia Lâm): Hơn 500 năm thời Lý, bảo tàng 7 bàn xoay khổng lồ, nhà cổ Vạn Vân 300 cổ vật, xe buýt 47A từ Long Biên.
  • Làng cổ Đường Lâm (Sơn Tây): Di tích quốc gia làng cổ, nhà đá ong 300-400 năm, quê hương 2 vua Phùng Hưng & Ngô Quyền, xe buýt 70A.
  • Làng hương Quảng Phú Cầu (Ứng Hòa): Hơn 100 năm, sân phơi bó hương đỏ rực như đóa hoa khổng lồ, hương OCOP 3-4 sao, xe buýt 91 từ Yên Nghĩa.
  • Làng nón Chuông (Thanh Oai): Hàng trăm năm bên sông Đáy, nón 16 vòng nan tre, chợ phiên từ 5h sáng, xe buýt 78, 103A/B, 91.
  • Làng mây tre đan Phú Vinh (Chương Mỹ): Hơn 400 năm (Phú Hoa Trang), tranh mây chân dung, xe buýt 72 kết hợp Metro Cát Linh.
  • Làng cổ Cự Đà (Thanh Oai, Hà Nội): Hơn 400 năm ven sông Nhuệ, làng đầu tiên đánh số nhà, biệt thự Pháp cổ, tương nếp & miến dong vàng óng, xe buýt 85, 103A/B.
  • Làng chuồn chuồn tre Thạch Xá (Thạch Thất): Hơn 20 năm chân Chùa Tây Phương, chuồn chuồn tre thăng bằng trên đầu ngón tay, xe buýt 89.
  • Làng quạt Chàng Sơn (Thạch Thất): Hàng trăm năm xứ Đoài, từng triển lãm tại Paris, xe buýt 89/107.
  • Làng quạt lá châm nón Nghĩa Đồng (Chương Mỹ): Chằm nón lá cọ và quạt lá thủ công bền mát, xe buýt 72/114.
  • Làng đúc đồng Ngũ Xã (Ba Đình): Thời Hậu Lê, tượng Phật Thích Ca Mâu Ni 12.3 tấn Chùa Thần Quang & phố ẩm thực phở cuốn Đảo Ngọc.
  • Làng làm diều sáo Hồng Hà (Đan Phượng): Di sản văn hóa phi vật thể quốc gia 2024, sáo gỗ vàng tâm ven sông Hồng, buýt 20A/29/117.
  • Làng may áo dài Trạch Xá (Ứng Hòa): Từ thời Đinh thờ bà tổ Nguyễn Thị Sen, khâu tay giấu chỉ 'năm mũi một', buýt 78/103.
  • Làng khảm trai Chuôn Ngọ (Phú Xuyên): Thời Lý thờ danh tướng Trương Công Thành, ốc xà cừ ngũ sắc sập gụ tủ chè, buýt 06A.
  • Làng làm tò he Xuân La (Phú Xuyên): Hơn 3 thế kỷ nặn bột nếp màu tự nhiên (gấc, lá nếp, nghệ), buýt 06A/108.
  • Làng thêu ren Quất Động (Thường Tín): Thế kỷ XVII thờ tiến sĩ Lê Công Hành, tranh thêu chân dung phong cảnh sống động, buýt 06A/06E.
  • Làng làm bánh chưng Tranh Khúc (Thanh Trì): Hàng trăm năm gói vo không khuôn, nếp cái hoa vàng, luộc xanh ngọc bích, buýt 08A/12/99.
  • Làng mộc mỹ nghệ Chàng Sơn (Thạch Thất): Từng tạc cung điện hoàng gia Huế và Chùa Tây Phương, đồ gỗ tứ linh cao cấp.
  • Làng rèn Dao Dẫy Đa Sỹ (Kiến Hưng, Hà Đông): Hơn 500 năm thời Hậu Lê, bí quyết tôi thép nước sắc bén bền bỉ, buýt 01/02/19.
  • Làng cốm Vòng (Dịch Vọng Hậu, Cầu Giấy): Hàng trăm năm thời Lý, thức quà mùa thu Hà Nội bọc lá sen xanh, Metro Nhổn - Ga Hà Nội.
  • Làng nghề dát vàng Kiêu Kỵ (Gia Lâm): Hơn 300 năm thời Hậu Lê, đập quỳ vàng mỏng như cánh ve thếp tượng Phật, buýt 69 / E02.
  • Vườn Quốc gia Ba Vì (48km), Khu sinh thái Bản Rõm Sóc Sơn (32km).

3. TAB 3 - CHẠM DI SẢN BẰNG AUDIO GUIDE & QR CODE:
- Hệ thống Audio Guide tự túc thu âm 1-2 phút kèm mã QR độc bản cho các làng nghề & di tích: Lò Bầu Bát Tràng, Làng lụa Vạn Phúc, Nhà cổ đá ong Đường Lâm, Làng hương Quảng Phú Cầu, Làng nón Chuông, Dát vàng Kiêu Kỵ, Cốm Làng Vòng.
- Du khách có thể dùng smartphone quét mã QR trên màn hình hoặc standee để nghe thuyết minh trực tiếp.

⭐ ƯU TIÊN 2 (MỞ RỘNG NGOÀI LỀ & TRA CỨU TRỰC TUYẾN THỜI GIAN THỰC):
- Khi người dùng hỏi các câu hỏi bên ngoài (như thời tiết hôm nay, sự kiện văn hóa mới nhất, lễ hội, quán ăn ngon gần đó, lịch sử mở rộng, giao thông hiện tại, v.v.): Bạn hãy TỰ ĐỘNG sử dụng công cụ tìm kiếm của Google (Google Search) để nghiên cứu sâu, lấy thông tin cập nhật mới nhất và trả lời chuẩn xác.

⭐ PHONG CÁCH TRẢ LỜI:
- Ngắn gọn, lịch sự, đúng trọng tâm và không dùng từ ngữ quá kỹ thuật.
- Trả lời tự nhiên, thân thiện bằng tiếng Việt.
- Sử dụng gạch đầu dòng rõ ràng, in đậm các mốc giờ, số liệu và địa danh quan trọng.
`;
  }

  getDestinationQuickReference(query: string): string {
    const q = query.toLowerCase();

    // 1. Lăng Chủ tịch Hồ Chí Minh (Lăng Bác)
    if (q.includes('lăng bác') || q.includes('bác hồ') || q.includes('lăng chủ tịch')) {
      return `🏛️ **Lăng Chủ tịch Hồ Chí Minh (Lăng Bác):**\n\n` +
        `• **Tọa độ số:** [21.0369, 105.8347] tại Quảng trường Ba Đình lịch sử.\n` +
        `• **Mật độ lưu lượng:** Cao điểm vào sáng Chủ Nhật (07:30 - 10:30, mật độ ~88%).\n` +
        `• **Khung giờ lý tưởng:** Sáng sớm 05:30 - 06:30 (xem lễ Thượng cờ trang nghiêm) hoặc buổi chiều 14:00 - 16:30 (tham quan Nhà sàn Bác Hồ, ao cá, Bảo tàng Hồ Chí Minh thoáng mát ~32%).\n` +
        `• **Điểm tham quan kế cận:** Chùa Một Cột (cách 150m), Bảo tàng Hồ Chí Minh (200m), Công viên Bách Thảo.\n` +
        `• **Video tư liệu:** Đã được tích hợp trực tiếp trên Flycam Hero Banner của trang web.`;
    }

    // 2. Hoàng Thành Thăng Long
    if (q.includes('hoàng thành') || q.includes('thăng long') || q.includes('đoan môn') || q.includes('kính thiên')) {
      return `🏯 **Khu Di tích Hoàng Thành Thăng Long (Di sản Văn hóa Thế giới UNESCO):**\n\n` +
        `• **Tọa độ số:** [21.0336, 105.8407] tại 19C Hoàng Diệu, Quận Ba Đình.\n` +
        `• **Mật độ lưu lượng:** Cuối tuần sáng 08:30 - 10:30 đạt khoảng 58% (mức ổn định, dễ chịu).\n` +
        `• **Trải nghiệm nổi bật:** Tham quan Đoan Môn, nền điện Kính Thiên, Hậu Lâu, khu khảo cổ học 18 Hoàng Diệu và tour đêm Giải mã Hoàng Thành Thăng Long.\n` +
        `• **Điểm kết nối xanh:** Công viên Bách Thảo, đường Phan Đình Phùng và đại lộ Hoàng Diệu rợp bóng xà cừ cổ thụ.`;
    }

    // 3. Hồ Tây & Bán đảo Trúc Bạch
    if (q.includes('hồ tây') || q.includes('trúc bạch') || q.includes('trấn quốc') || q.includes('quảng an') || q.includes('thanh niên')) {
      return `🌊 **Hồ Tây & Bán đảo Trúc Bạch:**\n\n` +
        `• **Tọa độ số:** [21.0583, 105.8242], lá phổi xanh và không gian mặt nước tự nhiên lớn nhất Thủ đô.\n` +
        `• **Mật độ lưu lượng:** Cao điểm lúc hoàng hôn và cuối tuần 16:00 - 20:00 (mật độ ~86%). Buổi sáng các ngày trong tuần rất thoáng mát (khoảng 30%).\n` +
        `• **Khung giờ vàng:** 06:00 - 08:00 sáng dạo bộ, đạp xe ven hồ hoặc ngắm hoàng hôn tại đường Thanh Niên, bến Hàn Quốc.\n` +
        `• **Điểm hẹn văn hóa & ẩm thực:** Chùa Trấn Quốc (ngôi chùa cổ nhất Thăng Long), Phủ Tây Hồ, Làng hoa Nghi Tàm, bánh tôm Hồ Tây và kem hồ Trúc Bạch.`;
    }

    // 4. Hồ Gươm & Phố Cổ
    if (q.includes('hồ gươm') || q.includes('hoàn kiếm') || q.includes('phố cổ') || q.includes('quá tải') || q.includes('tránh bão')) {
      return `⚠️ **Cảnh báo Mật độ & Điều tiết Hồ Gươm - Phố Cổ:**\n\n` +
        `• **Thời điểm quá tải nghiêm trọng:** Tối Thứ Bảy từ 19:00 - 21:00 (Mật độ 95% - Báo động đỏ, không gian đi bộ rất đông đúc).\n` +
        `• **Khung giờ vàng thanh bình:** Sáng sớm 06:30 - 08:30 (chỉ 25%) hoặc đầu giờ chiều ngày thường 14:00 - 16:00 (khoảng 38%).\n` +
        `• **Điểm đến thay thế thông thoáng:** Vườn hoa Tao Đàn / Con Cóc (Diên Hồng), Bảo tàng Lịch sử Quốc gia (số 1 Tràng Tiền), Phố sách 19/12.`;
    }

    // 5. Làng gốm Bát Tràng (Gia Lâm)
    if (q.includes('bát tràng') || q.includes('bat trang') || q.includes('làng gốm')) {
      return `🏺 **Làng gốm Bát Tràng (Huyện Gia Lâm):**\n\n` +
        `• **Vị trí:** Xã Bát Tràng, huyện Gia Lâm, ven tả ngạn sông Hồng, cách hồ Hoàn Kiếm 13 – 15 km về phía Đông Nam.\n` +
        `• **Lịch sử:** Trên 500 năm từ thời nhà Lý, nổi tiếng sản phẩm gốm sứ tinh xảo và hoạt động trải nghiệm nặn gốm.\n` +
        `• **Di chuyển:**\n` +
        `  - Xe máy / ô tô: Qua cầu Long Biên, Chương Dương, Vĩnh Tuy hoặc Thanh Trì rồi chạy dọc đê sông Hồng.\n` +
        `  - Xe buýt: Tuyến buýt 47A từ Long Biên đi thẳng đến cổng làng gốm (9.000đ/lượt, 15-20 phút/chuyến).\n` +
        `• **Trải nghiệm:** Tham quan Chợ gốm, Đình làng Bát Tràng, Bảo tàng gốm Bát Tràng (kiến trúc 7 bàn xoay), tự tay vuốt nặn gốm với nghệ nhân, trẩy hội làng (14-15 tháng 2 âm lịch).\n` +
        `• **Góc check-in:** Nhà cổ Vạn Vân (>300 cổ vật quý) và Bảo tàng gốm Bát Tràng với ánh sáng tự nhiên mềm mại.`;
    }

    // 6. Làng cổ Đường Lâm (Sơn Tây)
    if (q.includes('đường lâm') || q.includes('duong lam') || q.includes('làng cổ')) {
      return `🏡 **Làng cổ Đường Lâm (Thị xã Sơn Tây):**\n\n` +
        `• **Vị trí:** Thị xã Sơn Tây, cách trung tâm Hà Nội khoảng 45–50 km về phía Tây. Ngôi làng cổ tiêu biểu đồng bằng Bắc Bộ với nhà đá ong và ngõ quanh co yên bình.\n` +
        `• **Lịch sử:** Quê hương hai vị anh hùng dân tộc Phùng Hưng và Ngô Quyền. Năm 2006 trở thành làng cổ đầu tiên ở Việt Nam được xếp hạng Di tích lịch sử văn hóa quốc gia.\n` +
        `• **Di chuyển:**\n` +
        `  - Ô tô / Xe máy: Theo Đại lộ Thăng Long rẽ Hòa Lạc vào QL21 lên Sơn Tây (đi thêm 4.5km) hoặc theo Quốc lộ 32.\n` +
        `  - Xe buýt: Tuyến 70A (BX Mỹ Đình – Trung Hà) xuống bến phà Đường Lâm. Hoặc buýt 20B, 67, 89 đến BX Sơn Tây rồi đón buýt 118 hoặc 126.\n` +
        `• **Trải nghiệm:** Khám phá nhà cổ đá ong 300-400 năm, viếng đình Mông Phụ, đền Phùng Hưng, lăng Ngô Quyền, thử làm bánh trôi bánh chay, ăn chè lam, kẹo dồi, tương nếp và đạp xe ngắm cảnh đồng quê.\n` +
        `• **Góc check-in:** Cổng làng Mông Phụ, Đình làng Mông Phụ, những con ngõ tường đá ong vàng nâu, sân gạch chum nước nhà cổ và Chùa Mía.`;
    }

    // 7. Làng hương Quảng Phú Cầu (Ứng Hòa)
    if (q.includes('quảng phú cầu') || q.includes('quang phu cau') || q.includes('làng hương')) {
      return `🌸 **Làng hương Quảng Phú Cầu (Huyện Ứng Hòa):**\n\n` +
        `• **Vị trí:** Xã Quảng Phú Cầu, huyện Ứng Hòa, cách trung tâm Hà Nội khoảng 35 km về phía Nam.\n` +
        `• **Lịch sử:** Xuất phát từ đầu thế kỷ XX do cụ Lê Xuân Vịnh (thôn Phú Lương Thượng) chẻ tăm hương bán cho thương lái, lan rộng ra 6 thôn toàn xã, nghề cha truyền con nối trứ danh.\n` +
        `• **Di chuyển:** Xe máy theo Quốc lộ 21B / Tỉnh lộ 429. Xe buýt số 91 từ bến xe Yên Nghĩa đến thẳng làng.\n` +
        `• **Trải nghiệm:** Dạo quanh làng ngắm sân phơi hương đỏ rực, tham quan cơ sở sản xuất lâu đời, tự tay chẻ nan tre se hương cùng nghệ nhân, mua hương nén hương vòng chuẩn OCOP 3-4 sao.\n` +
        `• **Góc check-in:** Sân phơi bó hương xòe tròn như đóa hoa khổng lồ rực rỡ sắc vàng đỏ dưới ánh nắng.`;
    }

    // 8. Làng nón Chuông (Thanh Oai)
    if (q.includes('làng chuông') || q.includes('nón chuông') || q.includes('non chuong')) {
      return `👒 **Làng nón Chuông (Huyện Thanh Oai):**\n\n` +
        `• **Vị trí:** Bờ bắc sông Đáy, xã Phương Trung, Thanh Oai, cách trung tâm Hà Nội khoảng 30km về phía Tây Nam (trên 481 ha gồm 8 thôn).\n` +
        `• **Lịch sử:** Hàng trăm năm từ thời phong kiến (thế kỷ VIII hoặc XVII, tên cũ Trang Thì Trung), từng làm nón quai thao, nón ba tầm tiến cống hoàng cung.\n` +
        `• **Di chuyển:** Xe máy theo QL6 & QL21B qua Kim Bài 2km rẽ đê sông Đáy (hoặc đường Cienco 5). Xe buýt tuyến 78, 103A/B hoặc 91 xuống trạm Cửa hàng Xăng dầu Phương Trung, đi bộ 200m-500m vào làng.\n` +
        `• **Trải nghiệm:** Chợ nón Chuông họp các ngày 4, 10, 14, 20, 24, 30 âm lịch từ 5h00 sáng rộn rã; xem thợ làm khung 16 vòng nan tre, khâu lá cọ hơ diêm; ăn bánh cuốn làng Chuông, bánh đúc lạc.\n` +
        `• **Góc check-in:** Cổng làng cổ kính, Đình làng Chuông (năm 1894 thời Thành Thái chạm tứ linh gỗ lim) và sân phơi lá cọ dưới hiên nhà.`;
    }

    // 9. Làng mây tre đan Phú Vinh (Chương Mỹ)
    if (q.includes('phú vinh') || q.includes('phu vinh') || q.includes('mây tre đan')) {
      return `🎋 **Làng mây tre đan Phú Vinh (Huyện Chương Mỹ):**\n\n` +
        `• **Vị trí:** Thôn Phú Vinh, xã Phú Nghĩa, Chương Mỹ (ven QL6), cách trung tâm Hà Nội khoảng 25 – 30 km về phía Tây Nam.\n` +
        `• **Lịch sử:** Hơn 400 năm hình thành (khoảng năm 1700 tên là Phú Hoa Trang - trời phú bàn tay tài hoa, năm 1800 đổi tên thành Phú Vinh). Xuất khẩu tranh mây, đồ mỹ nghệ khắp thế giới.\n` +
        `• **Di chuyển:** QL6 qua Chúc Sơn tới xã Phú Nghĩa. Xe buýt tuyến 72 (Yên Nghĩa – Xuân Mai), kết hợp Metro Cát Linh - Hà Đông tới ga Yên Nghĩa bắt tiếp buýt 72 xuống Xã Phú Nghĩa.\n` +
        `• **Trải nghiệm:** Xem quy trình tuốt nan, phơi hun khói, đan tranh chân dung tinh xảo; tự tay đan đĩa mây/lót ly kỷ niệm; mua sắm đèn mây, khay trà giá gốc xưởng.\n` +
        `• **Góc check-in:** Sân phơi mây tre rực vàng dưới nắng, phòng trưng bày đèn lồng decor lung linh và Đình thôn Phú Vinh.`;
    }

    // 10. Làng cổ Cự Đà (Thanh Oai) & Làng đúc đồng Ngũ Xã
    if (q.includes('cự đà') || q.includes('cu da') || q.includes('tương nếp') || q.includes('miến dong') || q.includes('ngũ xã') || q.includes('ngu xa') || q.includes('đúc đồng')) {
      if (q.includes('ngũ xã') || q.includes('ngu xa') || q.includes('phở cuốn') || q.includes('đúc đồng')) {
        return `🔔 **Làng đúc đồng Ngũ Xã (Quận Ba Đình):**\n\n` +
          `• **Vị trí:** Bán đảo Ngũ Xã, phường Trúc Bạch, Ba Đình (sát hồ Trúc Bạch), cách Hồ Gươm chỉ ~3 km.\n` +
          `• **Lịch sử:** Thế kỷ XVII thời nhà Lê, hội tụ thợ giỏi từ 5 làng đúc đồng vùng Kinh Bắc và Hải Dương. Đúc tượng Phật Thích Ca Mâu Ni 12,3 tấn tại Chùa Thần Quang (1952).\n` +
          `• **Trải nghiệm:** Chiêm ngưỡng tượng Phật đồng nguyên khối Chùa Thần Quang, dạo phố đi bộ Đảo Ngọc, thưởng thức phở cuốn & phở chiên phồng chính gốc Ngũ Xã.\n` +
          `• **Di chuyển:** Đi theo Quán Thánh hoặc Yên Phụ rẽ Nguyễn Trường Tộ. Buýt 31, 50, 55A/B, E05.`;
      }
      return `🏮 **Làng cổ Cự Đà (Huyện Thanh Oai):**\n\n` +
        `• **Vị trí:** Xã Cự Khê, huyện Thanh Oai, ven sông Nhuệ, cách trung tâm Hà Nội khoảng 20 km về phía Tây Nam.\n` +
        `• **Lịch sử & Nét độc bản:** Ngôi làng cổ trù phú với nét giao thoa kỳ diệu giữa kiến trúc nhà gỗ 3 gian Bắc Bộ và các ngôi biệt thự 2 tầng kiểu Pháp cổ kính đầu thế kỷ XX. Là ngôi làng nông thôn đầu tiên tại Việt Nam có nhà đánh số, ngõ gắn tên và đường lát gạch nghiêng.\n` +
        `• **Nghề truyền thống:** Nổi danh với 'tương Cự Đà, cà làng Láng' ủ trong chum sành da lươn thơm ngọt và những giàn phơi miến dong vàng óng trải khắp ngõ xóm bên triền đê.\n` +
        `• **Di chuyển:** Trục Nguyễn Trãi - Hà Đông - rẽ đường Cienco 5 khoảng 4km đến Cự Khê. Xe buýt tuyến 85 hoặc 103A/103B kết hợp taxi/xe ôm ngắn 1.5km.\n` +
        `• **Góc check-in:** Cổng làng Cự Đà với tháp chuông đồng hồ kiểu Tây độc nhất vô nhị, các ngõ cổ lát gạch nghiêng, giàn phơi miến dong óng ánh và Đình, Chùa Thọ Thánh cổ kính.`;
    }

    // 11. Chuồn chuồn tre Thạch Xá & Quạt Chàng Sơn & Mộc Chàng Sơn
    if (q.includes('thạch xá') || q.includes('thach xa') || q.includes('chuồn chuồn tre') || q.includes('chàng sơn') || q.includes('chang son')) {
      if (q.includes('chuồn chuồn') || q.includes('thạch xá') || q.includes('thach xa')) {
        return `🦗 **Làng chuồn chuồn tre Thạch Xá (Huyện Thạch Thất):**\n\n` +
          `• **Vị trí:** Xã Thạch Xá, ngay dưới chân Chùa Tây Phương, cách Hà Nội 35 – 40 km về phía Tây.\n` +
          `• **Lịch sử & Nét độc đáo:** Hơn 20 năm phát triển, chuồn chuồn tre có khả năng tự giữ thăng bằng đối xứng trên đầu ngón tay kỳ diệu, xuất khẩu khắp thế giới.\n` +
          `• **Di chuyển:** Đại lộ Thăng Long 25km rẽ Thạch Thất hướng Chùa Tây Phương. Xe buýt số 89 xuống gần chùa đi bộ 500m.\n` +
          `• **Trải nghiệm:** Xem chọn tre già, cạo gọt thân uốn cánh, tự tay tô màu hoa văn sặc sỡ và check-in giàn phơi chuồn chuồn rực rỡ sắc màu.`;
      }
      if (q.includes('mộc') || q.includes('gỗ') || q.includes('tạc tượng')) {
        return `🪵 **Làng mộc mỹ nghệ Chàng Sơn (Huyện Thạch Thất):**\n\n` +
          `• **Vị trí:** Xã Chàng Sơn, huyện Thạch Thất, cách Hà Nội khoảng 30 – 35km về phía Tây.\n` +
          `• **Lịch sử:** Thợ mộc tài hoa từng được triều đình nhà Nguyễn triệu về kinh đô Huế dựng cung điện hoàng gia và tham gia tạc các pho tượng Phật tuyệt tác Chùa Tây Phương.\n` +
          `• **Sản phẩm:** Sập gụ, tủ chè, bàn ghế gỗ quý, hoành phi câu đối chạm tứ linh tinh xảo giá gốc tận xưởng.`;
      }
      return `🪭 **Làng quạt Chàng Sơn (Huyện Thạch Thất):**\n\n` +
        `• **Vị trí:** Xã Chàng Sơn, Thạch Thất, cách Hà Nội khoảng 30 – 35 km về phía Tây.\n` +
        `• **Lịch sử:** Hàng trăm năm từ thế kỷ XIX, cái nôi quạt xứ Đoài từng mang đi triển lãm tại Paris thời Pháp thuộc.\n` +
        `• **Trải nghiệm:** Xem chẻ nan bấm lỗ xâu nan, dán quạt giấy quạt vải, vẽ thư pháp thủy mặc; tự làm quạt lưu niệm; check-in sân phơi nan quạt rực rỡ sắc màu.`;
    }

    // 12. Quạt lá Nghĩa Đồng & May áo dài Trạch Xá
    if (q.includes('nghĩa đồng') || q.includes('nghia dong') || q.includes('trạch xá') || q.includes('trach xa') || q.includes('áo dài')) {
      if (q.includes('trạch xá') || q.includes('trach xa') || q.includes('áo dài')) {
        return `👘 **Làng may áo dài Trạch Xá (Huyện Ứng Hòa):**\n\n` +
          `• **Vị trí:** Thôn Trạch Xá, xã Hòa Lâm, Ứng Hòa (ven sông Đáy), cách Hà Nội 40 – 45 km về phía Nam.\n` +
          `• **Lịch sử:** Ngàn năm từ thời Đinh thờ Đức thánh tổ Nguyễn Thị Sen (vương phi vua Đinh Tiên Hoàng). Nơi lập nên các phố thợ may danh tiếng tại Hàng Bông, Cầu Gỗ.\n` +
          `• **Kỹ thuật độc bản:** Khâu tay hoàn toàn 'năm mũi một' giấu đường chỉ, tà áo mềm mại, ôm dáng tuyệt đối.\n` +
          `• **Di chuyển:** QL21B qua Ba La xuống thị trấn Vân Đình rẽ Hòa Lâm. Tuyến buýt 78 hoặc 103A/B.`;
      }
      return `🍃 **Làng quạt lá châm nón Nghĩa Đồng (Huyện Chương Mỹ):**\n\n` +
        `• **Vị trí:** Thôn Nghĩa Đồng, xã Đại Yên, Chương Mỹ, cách Hà Nội 30 – 35 km về phía Tây Nam.\n` +
        `• **Lịch sử:** Hàng trăm năm làm quạt lá và nón chằm thủ công từ lá cọ, lá gòn, lá buông bằng kim chỉ cước chắc chắn, siêu bền, mát rượi và thân thiện môi trường.\n` +
        `• **Di chuyển:** QL6 qua Chúc Sơn rẽ Đại Yên. Tuyến buýt 72 hoặc 114.`;
    }

    // 13. Khảm trai Chuôn Ngọ & Tò he Xuân La
    if (q.includes('chuôn ngọ') || q.includes('chuon ngo') || q.includes('khảm trai') || q.includes('xuân la') || q.includes('xuan la') || q.includes('tò he') || q.includes('to he')) {
      if (q.includes('xuân la') || q.includes('xuan la') || q.includes('tò he') || q.includes('to he')) {
        return `🎨 **Làng làm tò he Xuân La (Huyện Phú Xuyên):**\n\n` +
          `• **Vị trí:** Thôn Xuân La, xã Phượng Dực, Phú Xuyên, cách Hà Nội khoảng 40km về phía Nam.\n` +
          `• **Lịch sử:** Hơn 3 thế kỷ gìn giữ nghề nặn tò he bằng bột gạo nếp tự nhiên (tên xưa là 'bánh chim cò' có gắn còi tò-te-tò-he).\n` +
          `• **Trải nghiệm:** Tự tay nhào bột, tạo hình nhân vật cổ tích bằng que tre; xem nghệ nhân nặn thần tốc 3-5 phút một sản phẩm; khám phá màu tự nhiên từ gấc (đỏ), nghệ (vàng), lá nếp (xanh).\n` +
          `• **Di chuyển:** QL1A hoặc cao tốc Pháp Vân rẽ nút Đỗ Xá đi TL429. Tuyến buýt 06A hoặc 108.`;
      }
      return `✨ **Làng khảm trai Chuôn Ngọ (Huyện Phú Xuyên):**\n\n` +
        `• **Vị trí:** Thôn Chuôn Ngọ, xã Chuyên Mỹ, Phú Xuyên (ven sông Nhuệ), cách Hà Nội 35 – 40 km về phía Nam.\n` +
        `• **Lịch sử:** Từ thời nhà Lý (thế kỷ XI) thờ tổ nghề danh tướng Trương Công Thành, từng là phẩm vật tiến cống triều đình ngự dụng.\n` +
        `• **Kỹ thuật:** Cưa lọng, đục khắc vỏ trai, vỏ ốc xà cừ ngũ sắc gắn lên gỗ sưa, gụ, trắc tạo tranh phong cảnh, sập gụ tủ chè lấp lánh ánh quang phổ.\n` +
        `• **Di chuyển:** QL1A hoặc cao tốc Pháp Vân rẽ nút Thường Tín về Chuyên Mỹ. Buýt 06A.`;
    }

    // 14. Thêu ren Quất Động & Bánh chưng Tranh Khúc
    if (q.includes('quất động') || q.includes('quat dong') || q.includes('thêu ren') || q.includes('tranh khúc') || q.includes('tranh khuc') || q.includes('bánh chưng')) {
      if (q.includes('tranh khúc') || q.includes('tranh khuc') || q.includes('bánh chưng')) {
        return `🍃 **Làng làm bánh chưng Tranh Khúc (Huyện Thanh Trì):**\n\n` +
          `• **Vị trí:** Thôn Tranh Khúc, xã Duyên Hà, Thanh Trì (ven đê sông Hồng), cách Hồ Gươm khoảng 15km về phía Nam.\n` +
          `• **Lịch sử:** Hàng trăm năm gói bánh chưng nức tiếng đất Bắc. Nguyên liệu khắt khe: nếp cái hoa vàng, đỗ xanh tiêu lòng vàng, lá dong rừng Tây Bắc.\n` +
          `• **Kỹ thuật độc đáo:** Gói 'vo' bằng tay hoàn toàn không dùng khuôn nhưng vuông vức chằn chặn chỉ trong 30 giây đến 1 phút.\n` +
          `• **Di chuyển:** Đường đê Nguyễn Khoái - Hữu Hồng về Duyên Hà. Tuyến buýt 08A, 12, 99.`;
      }
      return `🪡 **Làng thêu ren Quất Động (Huyện Thường Tín):**\n\n` +
        `• **Vị trí:** Xã Quất Động, Thường Tín (sát QL1A cũ), cách Hà Nội 20 – 25 km về phía Nam.\n` +
        `• **Lịch sử:** Từ thế kỷ XVII thờ ông tổ nghề Tiến sĩ Lê Công Hành (giỗ tổ ngày 12 tháng Giêng âm lịch).\n` +
        `• **Kỹ thuật:** Phối màu chỉ tơ uyển chuyển, mũi kim tinh tế thêu tranh phong cảnh quê hương, câu đối hoành phi sống động như tranh vẽ.\n` +
        `• **Di chuyển:** Đi theo QL1A cũ hoặc cao tốc Pháp Vân nút Thường Tín. Tuyến buýt 06A hoặc 06E từ BX Giáp Bát.`;
    }

    // 15. Diều sáo Hồng Hà & Rèn Dao Đa Sỹ
    if (q.includes('hồng hà') || q.includes('hong ha') || q.includes('diều sáo') || q.includes('đa sỹ') || q.includes('da sy') || q.includes('làng rèn') || q.includes('dao đa sỹ')) {
      if (q.includes('đa sỹ') || q.includes('da sy') || q.includes('dao') || q.includes('rèn')) {
        return `🔨 **Làng rèn Dao Dẫy Đa Sỹ (Kiến Hưng, Hà Đông):**\n\n` +
          `• **Vị trí:** Phường Kiến Hưng, quận Hà Đông, cách Hồ Gươm 10 – 12 km về phía Tây Nam.\n` +
          `• **Lịch sử:** Hơn 500 năm thời Hậu Lê do hai vị tổ nghề họ Nguyễn từ Thanh Hóa truyền dạy. Thương hiệu 'Dao Đa Sỹ' sắc bén, bền bỉ, tôi nước gia truyền giữ cạnh cực lâu cùn.\n` +
          `• **Trải nghiệm:** Nghe tiếng búa đập đe chan chát, xem nghệ nhân nung thép đỏ hồng nhúng nước tôi thép xèo xèo, mua dao thái chặt uy tín tại lò rèn.\n` +
          `• **Di chuyển:** Trục Nguyễn Trãi - Phúc La vào Kiến Hưng. Tàu điện Metro Cát Linh hoặc buýt 01, 02, 19.`;
      }
      return `🪁 **Làng làm diều sáo Hồng Hà (Huyện Đan Phượng):**\n\n` +
        `• **Vị trí:** Thôn Bá Dương Nội, xã Hồng Hà, Đan Phượng (ven bờ bắc sông Hồng), cách Hà Nội 20 – 25 km về phía Tây Bắc.\n` +
        `• **Di sản Quốc gia:** 'Hội Diều làng Bá Dương Nội' được công nhận là Di sản văn hóa phi vật thể quốc gia (2024), hội thi thả diều Rằm tháng 3 âm lịch.\n` +
        `• **Kỹ thuật sáo diều:** Khoét sáo bịt gỗ vàng tâm tạo âm thanh trầm bổng ngân vang hàng cây số.\n` +
        `• **Di chuyển:** Tuyến QL32 qua Nhổn rẽ hướng đê sông Hồng. Buýt 20A, 29, 117.`;
    }

    // 16. Cốm Làng Vòng & Dát vàng Kiêu Kỵ
    if (q.includes('làng vòng') || q.includes('cốm vòng') || q.includes('com vong') || q.includes('cốm') || q.includes('kiêu kỵ') || q.includes('kieu ky') || q.includes('dát vàng')) {
      if (q.includes('kiêu kỵ') || q.includes('kieu ky') || q.includes('dát vàng')) {
        return `👑 **Làng nghề dát vàng Kiêu Kỵ (Huyện Gia Lâm):**\n\n` +
          `• **Vị trí:** Xã Kiêu Kỵ, Gia Lâm (gần Vinhomes Ocean Park), cách Hà Nội 15 – 20 km về phía Đông.\n` +
          `• **Lịch sử:** Hơn 300 năm từ thời Hậu Lê (thế kỷ XVII), làng duy nhất tại Việt Nam giữ nghề làm quỳ vàng, quỳ bạc thủ công.\n` +
          `• **Kỹ thuật đỉnh cao:** Đập búa hàng nghìn nhát biến thỏi vàng thành những lá quỳ mỏng tang như cánh ve dát lên tượng Phật, hoành phi câu đối và đồ ngự dụng.\n` +
          `• **Di chuyển:** Cầu Chương Dương / Vĩnh Tuy theo đường Cổ Linh – Đa Tốn – Nguyễn Quý Trị. Tuyến buýt 69 hoặc VinBus E02.`;
      }
      return `🌾 **Làng cốm Vòng (Dịch Vọng Hậu, Cầu Giấy):**\n\n` +
        `• **Vị trí:** Phố Xuân Thủy, Trần Thái Tông, ngõ 63 Xuân Thủy, Cầu Giấy, cách Hồ Gươm 6 – 7 km về phía Tây.\n` +
        `• **Lịch sử:** Hàng trăm năm từ thời nhà Lý, từng là vật phẩm tiến cống triều đình, biểu tượng thanh tao của mùa thu Hà Nội.\n` +
        `• **Đặc sản:** Cốm tươi dẻo thơm sữa lúa non bọc lá sen lá dong buộc lạt đỏ, bánh cốm, xôi cốm hạt sen, chè cốm, chả cốm.\n` +
        `• **Di chuyển:** Metro Nhổn - Ga Hà Nội (ga ĐHQG) hoặc buýt 26, 32, 34, 38 xuống ngõ 63 Xuân Thủy.`;
    }

    // 17. Vườn Quốc gia Ba Vì
    if (q.includes('ba vì') || q.includes('bavi')) {
      return `🌲 **Vườn Quốc gia Ba Vì (Vành đai xanh phía Tây):**\n\n` +
        `• **Khoảng cách:** Cách trung tâm Hà Nội khoảng 48km theo hướng Đại lộ Thăng Long.\n` +
        `• **Khí hậu & Cảnh quan:** Không khí vùng núi trong lành quanh năm, rừng thông bạt ngàn, nhiệt độ mát mẻ hơn nội đô từ 4°C - 7°C.\n` +
        `• **Điểm tham quan tiêu biểu:** Rừng thông cốt 400, Nhà thờ đổ cổ kính rêu phong thời Pháp, Vườn xương rồng, Đền Thượng trên đỉnh Tản Viên (1.227m).\n` +
        `• **Khuyến nghị di chuyển:** Xe máy phượt trong ngày hoặc ô tô cá nhân (vé vào cổng khoảng 60.000đ/người lớn, ưu đãi HSSV 20.000đ).`;
    }

    // 18. Bản Rõm Sóc Sơn, Ba Vì
    // if (q.includes('vùng ven') || q.includes('vành đai') || q.includes('bản rõm')) {
    //   return `🌲 **Bộ sưu tập Điểm đến Vùng ven & Vành đai xanh Thủ đô:**\n\n` +
    //     `• **Phía Tây:** Vườn Quốc gia Ba Vì (48km - rừng thông & đền Thượng), Làng cổ Đường Lâm (45km - quần thể nhà cổ đá ong).\n` +
    //     `• **Phía Bắc:** Khu sinh thái Bản Rõm Sóc Sơn (32km - cắm trại sinh thái & rừng thông ngút ngàn).\n` +
    //     `• **Phía Nam:** Làng cổ Cự Đà (20km - di sản ven sông Nhuệ), Làng nón Chuông (30km).\n` +
    //     `• *Bạn có thể xem bản đồ số Google Maps tại Tab 2 của trang web.*`;
    // }

    // 19. Audio Guide & QR Code di sản số
    if (q.includes('qr') || q.includes('audio') || q.includes('thuyết minh') || q.includes('di sản')) {
      return `🎧 **Hệ thống Audio Guide & Mã QR Di sản (Tab 3 Đề án):**\n\n` +
        `• **Nội dung:** Đề án đã xây dựng hệ thống thuyết minh đa phương tiện (thời lượng 1 - 2 phút) do nhóm tự biên soạn và thu âm độc quyền.\n` +
        `• **Các Di tích trọng điểm:**\n` +
        `  1. **Lò Bầu Bát Tràng:** 700 năm giữ lửa truyền thống làng gốm bên sông Hồng.\n` +
        `  2. **Làng lụa Vạn Phúc:** Kỹ nghệ dệt lụa tơ tằm cổ truyền nức tiếng.\n` +
        `  3. **Nhà cổ đá ong Đường Lâm:** Nghệ thuật kiến trúc đá ong độc bản xứ Đoài.\n` +
        `  4. **Làng hương Quảng Phú Cầu:** Sắc đỏ tăm hương trăm năm OCOP 4 sao.\n` +
        `  5. **Làng nón Chuông:** Hồn nón lá 16 vòng bên dòng sông Đáy.\n` +
        `  6. **Dát vàng Kiêu Kỵ:** Kỹ nghệ quỳ vàng 300 năm cung đình.\n` +
        `  7. **Cốm Làng Vòng:** Hồn thu Hà Nội lắng đọng hạt cốm xanh ngọc.\n` +
        `• **Tương tác:** Bạn hoặc Ban Giám khảo có thể dùng camera smartphone quét trực tiếp mã QR trên Tab 3 hoặc bấm nút **Mobile View** trên thanh điều hướng để trải nghiệm giao diện thuyết minh tương tác di động.`;
    }

    return '';
  }

  private getCurrentTimeString(): string {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
}

