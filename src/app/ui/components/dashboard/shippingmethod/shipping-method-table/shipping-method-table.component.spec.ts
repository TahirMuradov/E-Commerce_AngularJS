import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodTableComponent } from './shipping-method-table.component';

describe('ShippingMethodTableComponent', () => {
  let component: ShippingMethodTableComponent;
  let fixture: ComponentFixture<ShippingMethodTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingMethodTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingMethodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
