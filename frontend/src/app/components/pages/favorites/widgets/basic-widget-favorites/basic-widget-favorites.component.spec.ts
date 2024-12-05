import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicWidgetFavoritesComponent } from './basic-widget-favorites.component';

describe('BasicWidgetFavoritesComponent', () => {
  let component: BasicWidgetFavoritesComponent;
  let fixture: ComponentFixture<BasicWidgetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicWidgetFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicWidgetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
