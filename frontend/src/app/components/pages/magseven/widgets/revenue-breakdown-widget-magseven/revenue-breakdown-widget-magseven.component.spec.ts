import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueBreakdownWidgetMagsevenComponent } from './revenue-breakdown-widget-magseven.component';

describe('RevenueBreakdownWidgetMagsevenComponent', () => {
  let component: RevenueBreakdownWidgetMagsevenComponent;
  let fixture: ComponentFixture<RevenueBreakdownWidgetMagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueBreakdownWidgetMagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueBreakdownWidgetMagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
