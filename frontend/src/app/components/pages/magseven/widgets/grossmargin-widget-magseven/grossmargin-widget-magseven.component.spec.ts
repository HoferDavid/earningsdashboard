import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossmarginWidgetMagsevenComponent } from './grossmargin-widget-magseven.component';

describe('GrossmarginWidgetMagsevenComponent', () => {
  let component: GrossmarginWidgetMagsevenComponent;
  let fixture: ComponentFixture<GrossmarginWidgetMagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrossmarginWidgetMagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrossmarginWidgetMagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
