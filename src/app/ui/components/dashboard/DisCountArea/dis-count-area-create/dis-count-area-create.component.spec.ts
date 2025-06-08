import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisCountAreaCreateComponent } from './dis-count-area-create.component';

describe('DisCountAreaCreateComponent', () => {
  let component: DisCountAreaCreateComponent;
  let fixture: ComponentFixture<DisCountAreaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisCountAreaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisCountAreaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
