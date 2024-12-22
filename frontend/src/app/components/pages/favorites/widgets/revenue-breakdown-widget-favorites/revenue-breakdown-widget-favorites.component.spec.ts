import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueBreakdownWidgetFavoritesComponent } from './revenue-breakdown-widget-favorites.component';

describe('RevenueBreakdownWidgetFavoritesComponent', () => {
  let component: RevenueBreakdownWidgetFavoritesComponent;
  let fixture: ComponentFixture<RevenueBreakdownWidgetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueBreakdownWidgetFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueBreakdownWidgetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
