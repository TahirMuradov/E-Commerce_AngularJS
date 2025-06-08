import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoryAreaCreateComponent } from './top-category-area-create.component';

describe('TopCategoryAreaCreateComponent', () => {
  let component: TopCategoryAreaCreateComponent;
  let fixture: ComponentFixture<TopCategoryAreaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoryAreaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoryAreaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
