import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetincomettmWidgetMagsevenComponent } from './netincomettm-widget-magseven.component';

describe('NetincomettmWidgetMagsevenComponent', () => {
  let component: NetincomettmWidgetMagsevenComponent;
  let fixture: ComponentFixture<NetincomettmWidgetMagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetincomettmWidgetMagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetincomettmWidgetMagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
