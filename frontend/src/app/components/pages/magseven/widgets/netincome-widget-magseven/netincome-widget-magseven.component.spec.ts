import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetincomeWidgetMagsevenComponent } from './netincome-widget-magseven.component';

describe('NetincomeWidgetMagsevenComponent', () => {
  let component: NetincomeWidgetMagsevenComponent;
  let fixture: ComponentFixture<NetincomeWidgetMagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetincomeWidgetMagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetincomeWidgetMagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
