import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishReloadItemComponent } from './finish-reload-item.component';

describe('FinishReloadItemComponent', () => {
  let component: FinishReloadItemComponent;
  let fixture: ComponentFixture<FinishReloadItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishReloadItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishReloadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
