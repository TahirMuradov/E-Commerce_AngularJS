import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderItemUpdateComponent } from './home-slider-item-update.component';

describe('HomeSliderItemUpdateComponent', () => {
  let component: HomeSliderItemUpdateComponent;
  let fixture: ComponentFixture<HomeSliderItemUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSliderItemUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSliderItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
