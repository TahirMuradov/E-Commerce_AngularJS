import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisCountAreaTableComponent } from './dis-count-area-table.component';

describe('DisCountAreaTableComponent', () => {
  let component: DisCountAreaTableComponent;
  let fixture: ComponentFixture<DisCountAreaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisCountAreaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisCountAreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
