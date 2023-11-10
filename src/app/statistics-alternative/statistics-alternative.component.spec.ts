import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAlternativeComponent } from './statistics-alternative.component';

describe('StatisticsAlternativeComponent', () => {
  let component: StatisticsAlternativeComponent;
  let fixture: ComponentFixture<StatisticsAlternativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsAlternativeComponent]
    });
    fixture = TestBed.createComponent(StatisticsAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
