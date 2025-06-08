import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoryAreaTableComponent } from './top-category-area-table.component';

describe('TopCategoryAreaTableComponent', () => {
  let component: TopCategoryAreaTableComponent;
  let fixture: ComponentFixture<TopCategoryAreaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoryAreaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoryAreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
