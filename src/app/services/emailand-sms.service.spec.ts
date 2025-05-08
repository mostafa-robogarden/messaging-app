import { TestBed } from '@angular/core/testing';

import { EmailandSMSService } from './emailand-sms.service';

describe('EmailandSMSService', () => {
  let service: EmailandSMSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailandSMSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
