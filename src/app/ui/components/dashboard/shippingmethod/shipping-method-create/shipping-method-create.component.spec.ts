import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodCreateComponent } from './shipping-method-create.component';

describe('ShippingMethodCreateComponent', () => {
  let component: ShippingMethodCreateComponent;
  let fixture: ComponentFixture<ShippingMethodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingMethodCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingMethodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
