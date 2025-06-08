import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoryAreaUpdateComponent } from './top-category-area-update.component';

describe('TopCategoryAreaUpdateComponent', () => {
  let component: TopCategoryAreaUpdateComponent;
  let fixture: ComponentFixture<TopCategoryAreaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoryAreaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoryAreaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
