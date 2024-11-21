import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoppelgaengerComponent } from './doppelgaenger.component';

describe('DoppelgaengerComponent', () => {
  let component: DoppelgaengerComponent;
  let fixture: ComponentFixture<DoppelgaengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoppelgaengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoppelgaengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
