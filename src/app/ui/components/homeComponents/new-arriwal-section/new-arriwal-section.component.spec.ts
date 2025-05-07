import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArriwalSectionComponent } from './new-arriwal-section.component';

describe('NewArriwalSectionComponent', () => {
  let component: NewArriwalSectionComponent;
  let fixture: ComponentFixture<NewArriwalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewArriwalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArriwalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
