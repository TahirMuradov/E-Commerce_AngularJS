import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcartComponent } from './productcart.component';

describe('ProductcartComponent', () => {
  let component: ProductcartComponent;
  let fixture: ComponentFixture<ProductcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductcartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
