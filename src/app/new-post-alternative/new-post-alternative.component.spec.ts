import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostAlternativeComponent } from './new-post-alternative.component';

describe('NewPostAlternativeComponent', () => {
  let component: NewPostAlternativeComponent;
  let fixture: ComponentFixture<NewPostAlternativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPostAlternativeComponent]
    });
    fixture = TestBed.createComponent(NewPostAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
