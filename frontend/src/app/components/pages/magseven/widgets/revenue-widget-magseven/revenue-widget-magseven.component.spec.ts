import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueWidgetMagsevenComponent } from './revenue-widget-magseven.component';

describe('RevenueWidgetMagsevenComponent', () => {
  let component: RevenueWidgetMagsevenComponent;
  let fixture: ComponentFixture<RevenueWidgetMagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueWidgetMagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueWidgetMagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
