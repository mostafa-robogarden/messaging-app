import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailandSMSComponent } from './emailand-sms.component';

describe('EmailandSMSComponent', () => {
  let component: EmailandSMSComponent;
  let fixture: ComponentFixture<EmailandSMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailandSMSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailandSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
