import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSectionComponent } from './discount-section.component';

describe('DiscountSectionComponent', () => {
  let component: DiscountSectionComponent;
  let fixture: ComponentFixture<DiscountSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
