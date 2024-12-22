import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetincomettmWidgetFavoritesComponent } from './netincomettm-widget-favorites.component';

describe('NetincomettmWidgetFavoritesComponent', () => {
  let component: NetincomettmWidgetFavoritesComponent;
  let fixture: ComponentFixture<NetincomettmWidgetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetincomettmWidgetFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetincomettmWidgetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
