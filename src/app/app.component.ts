import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiChatbotComponent } from './components/ai-chatbot/ai-chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AiChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-tourism';
}
