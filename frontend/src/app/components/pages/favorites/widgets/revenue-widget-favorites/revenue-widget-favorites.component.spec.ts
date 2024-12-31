import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueWidgetFavoritesComponent } from './revenue-widget-favorites.component';

describe('RevenueWidgetFavoritesComponent', () => {
  let component: RevenueWidgetFavoritesComponent;
  let fixture: ComponentFixture<RevenueWidgetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueWidgetFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueWidgetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
