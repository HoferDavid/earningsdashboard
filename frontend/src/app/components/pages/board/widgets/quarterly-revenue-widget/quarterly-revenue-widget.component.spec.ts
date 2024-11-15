import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyRevenueWidgetComponent } from './quarterly-revenue-widget.component';

describe('QuarterlyRevenueWidgetComponent', () => {
  let component: QuarterlyRevenueWidgetComponent;
  let fixture: ComponentFixture<QuarterlyRevenueWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterlyRevenueWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterlyRevenueWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
