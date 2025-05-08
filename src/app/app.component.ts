import { Component } from '@angular/core';
import { EmailandSMSComponent } from './components/emailand-sms/emailand-sms.component';

@Component({
  selector: 'app-root',
  imports: [EmailandSMSComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'messaging-app';
}
