import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicWidgetMagsevenComponent } from './basic-widget-magseven.component';

describe('BasicWidgetMagsevenComponent', () => {
  let component: BasicWidgetMagsevenComponent;
  let fixture: ComponentFixture<BasicWidgetMagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicWidgetMagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicWidgetMagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
