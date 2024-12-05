import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetincomeWidgetFavoritesComponent } from './netincome-widget-favorites.component';

describe('NetincomeWidgetFavoritesComponent', () => {
  let component: NetincomeWidgetFavoritesComponent;
  let fixture: ComponentFixture<NetincomeWidgetFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetincomeWidgetFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetincomeWidgetFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
