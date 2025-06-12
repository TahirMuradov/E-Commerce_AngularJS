import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodTableComponent } from './payment-method-table.component';

describe('PaymentMethodTableComponent', () => {
  let component: PaymentMethodTableComponent;
  let fixture: ComponentFixture<PaymentMethodTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
