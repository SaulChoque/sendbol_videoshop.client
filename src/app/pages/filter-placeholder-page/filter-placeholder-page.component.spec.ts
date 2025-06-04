import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlaceholderPageComponent } from './filter-placeholder-page.component';

describe('FilterPlaceholderPageComponent', () => {
  let component: FilterPlaceholderPageComponent;
  let fixture: ComponentFixture<FilterPlaceholderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPlaceholderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPlaceholderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
