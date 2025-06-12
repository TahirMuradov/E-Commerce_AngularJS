import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderItemTableComponent } from './home-slider-item-table.component';

describe('HomeSliderItemTableComponent', () => {
  let component: HomeSliderItemTableComponent;
  let fixture: ComponentFixture<HomeSliderItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSliderItemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSliderItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
