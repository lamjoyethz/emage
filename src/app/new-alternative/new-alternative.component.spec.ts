import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlternativeComponent } from './new-alternative.component';

describe('NewAlternativeComponent', () => {
  let component: NewAlternativeComponent;
  let fixture: ComponentFixture<NewAlternativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAlternativeComponent]
    });
    fixture = TestBed.createComponent(NewAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
