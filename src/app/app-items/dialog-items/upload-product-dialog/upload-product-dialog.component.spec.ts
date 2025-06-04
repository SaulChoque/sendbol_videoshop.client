import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductDialogComponent } from './upload-product-dialog.component';

describe('UploadProductDialogComponent', () => {
  let component: UploadProductDialogComponent;
  let fixture: ComponentFixture<UploadProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProductDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
