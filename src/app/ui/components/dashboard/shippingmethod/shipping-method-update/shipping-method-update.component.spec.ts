import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodUpdateComponent } from './shipping-method-update.component';

describe('ShippingMethodUpdateComponent', () => {
  let component: ShippingMethodUpdateComponent;
  let fixture: ComponentFixture<ShippingMethodUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingMethodUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingMethodUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
