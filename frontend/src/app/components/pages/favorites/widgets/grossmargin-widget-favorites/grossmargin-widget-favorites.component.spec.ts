import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossmarginWidgetFavoritesComponent } from './grossmargin-widget-favorites.component';

describe('GrossmarginWidgetFavoritesComponent', () => {
  let component: GrossmarginWidgetFavoritesComponent;
  let fixture: ComponentFixture<GrossmarginWidgetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrossmarginWidgetFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrossmarginWidgetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
