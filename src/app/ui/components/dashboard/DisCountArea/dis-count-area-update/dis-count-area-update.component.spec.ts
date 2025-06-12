import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisCountAreaUpdateComponent } from './dis-count-area-update.component';

describe('DisCountAreaUpdateComponent', () => {
  let component: DisCountAreaUpdateComponent;
  let fixture: ComponentFixture<DisCountAreaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisCountAreaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisCountAreaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
