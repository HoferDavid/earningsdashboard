import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagsevenComponent } from './magseven.component';

describe('MagsevenComponent', () => {
  let component: MagsevenComponent;
  let fixture: ComponentFixture<MagsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagsevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
