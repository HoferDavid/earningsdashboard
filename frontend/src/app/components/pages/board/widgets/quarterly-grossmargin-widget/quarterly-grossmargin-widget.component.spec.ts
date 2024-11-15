import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyGrossmarginWidgetComponent } from './quarterly-grossmargin-widget.component';

describe('QuarterlyGrossmarginWidgetComponent', () => {
  let component: QuarterlyGrossmarginWidgetComponent;
  let fixture: ComponentFixture<QuarterlyGrossmarginWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterlyGrossmarginWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterlyGrossmarginWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
