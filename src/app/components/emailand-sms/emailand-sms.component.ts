import { Component } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailandSMSService, EmailAttachment, EmailPayload } from '../../services/emailand-sms.service';

@Component({
  selector: 'app-emailand-sms',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './emailand-sms.component.html',
  styleUrl: './emailand-sms.component.css'
})
export class EmailandSMSComponent {
  email: EmailPayload = { to: '', subject: '', body: '', attachments: [] };
  sms   = { to: '', body: '' };
  emailSuccess = false;
  emailError: string | null = null;
  smsSuccess   = false;
  smsError: string | null   = null;
  previewUrl: string | null = null;
  file: File | null = null;

  constructor(private emailandSMS: EmailandSMSService) { }
  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      const attachment: EmailAttachment = { filename: this.file?.name, content: base64, contentType: this.file?.type };
      this.email.attachments?.push(attachment);
    };
    reader.readAsDataURL(this.file);
  }
  onSendEmail() {
    this.emailSuccess = false;
    this.emailError   = null;
    this.previewUrl   = null;
    this.emailandSMS.sendEmail({to: this.email.to, subject: this.email.subject, body: this.email.body, attachments: this.email.attachments}).subscribe(response => {
        if (response.success) {
          this.emailSuccess = true;
          if (response.previewUrl) {
            this.previewUrl = response.previewUrl
            window.open(this.previewUrl, '_blank');
          }
        } else {
          this.emailError = response.error || 'Unknown error';
        }
      },
      err => this.emailError = err.error?.error || err.message
    );
  }
  onSendSms() {
    this.smsSuccess = this.smsError !== null;
    this.emailandSMS.sendSms(this.sms).subscribe(({ previewUrl }) => {
      this.emailSuccess = true;
      window.open(previewUrl, '_blank');
    }, err => {
      this.emailError = err.error?.error || err.message;
    });
  }
}
