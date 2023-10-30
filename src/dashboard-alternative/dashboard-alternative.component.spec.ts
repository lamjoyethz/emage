import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAlternativeComponent } from './dashboard-alternative.component';

describe('TechenpostComponent', () => {
  let component: DashboardAlternativeComponent;
  let fixture: ComponentFixture<DashboardAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAlternativeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
