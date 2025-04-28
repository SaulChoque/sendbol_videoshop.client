import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterItemsComponent } from './register-items.component';

describe('RegisterItemsComponent', () => {
  let component: RegisterItemsComponent;
  let fixture: ComponentFixture<RegisterItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
