import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideTreeItemComponent } from './aside-tree-item.component';

describe('AsideTreeItemComponent', () => {
  let component: AsideTreeItemComponent;
  let fixture: ComponentFixture<AsideTreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideTreeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
