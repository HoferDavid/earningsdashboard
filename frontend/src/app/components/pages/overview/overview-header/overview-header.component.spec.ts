import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewHeaderComponent } from './overview-header.component';

describe('DashboardHeaderComponent', () => {
  let component: OverviewHeaderComponent;
  let fixture: ComponentFixture<OverviewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
