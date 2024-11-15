import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyNetincomeWidgetComponent } from './quarterly-netincome-widget.component';

describe('QuarterlyNetincomeWidgetComponent', () => {
  let component: QuarterlyNetincomeWidgetComponent;
  let fixture: ComponentFixture<QuarterlyNetincomeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterlyNetincomeWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterlyNetincomeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
