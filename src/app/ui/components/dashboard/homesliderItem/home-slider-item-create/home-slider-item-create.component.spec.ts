import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderItemCreateComponent } from './home-slider-item-create.component';

describe('HomeSliderItemCreateComponent', () => {
  let component: HomeSliderItemCreateComponent;
  let fixture: ComponentFixture<HomeSliderItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSliderItemCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSliderItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
