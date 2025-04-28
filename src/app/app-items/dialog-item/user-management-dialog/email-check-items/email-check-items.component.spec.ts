import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCheckItemsComponent } from './email-check-items.component';

describe('EmailCheckItemsComponent', () => {
  let component: EmailCheckItemsComponent;
  let fixture: ComponentFixture<EmailCheckItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailCheckItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCheckItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
