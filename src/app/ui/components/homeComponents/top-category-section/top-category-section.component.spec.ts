import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategorySectionComponent } from './top-category-section.component';

describe('TopCategorySectionComponent', () => {
  let component: TopCategorySectionComponent;
  let fixture: ComponentFixture<TopCategorySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategorySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
