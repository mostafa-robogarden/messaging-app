import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:3000/api';
export interface EmailPayload { to: string; subject: string; body: string; attachments?: EmailAttachment[]; }
export interface EmailAttachment { filename: string | undefined; content: string | undefined; contentType: string | undefined;}
interface SmsPayload   { to: string; body: string; }
interface EmailResponse {
  success:    boolean;
  previewUrl?: string;
  error?:     string;
}
@Injectable({ providedIn: 'root' })
export class EmailandSMSService {
  http: HttpClient = inject(HttpClient);

  constructor() { }
  sendEmail(payload: EmailPayload): Observable<EmailResponse> {
    console.log('payload', payload);
    return this.http.post<EmailResponse>(`api/send-email`, payload);
  }
  sendSms(payload: {to:string; body:string}): Observable<any> {
    console.log('payload', payload);
    return this.http.post<{ success:boolean; quotaRemaining?:number }>(`${API_BASE}/send-sms`, payload);
  }
}
