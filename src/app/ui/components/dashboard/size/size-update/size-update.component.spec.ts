import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeUpdateComponent } from './size-update.component';

describe('SizeUpdateComponent', () => {
  let component: SizeUpdateComponent;
  let fixture: ComponentFixture<SizeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
