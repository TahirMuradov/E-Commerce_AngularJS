import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodUpdateComponent } from './payment-method-update.component';

describe('PaymentMethodUpdateComponent', () => {
  let component: PaymentMethodUpdateComponent;
  let fixture: ComponentFixture<PaymentMethodUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
