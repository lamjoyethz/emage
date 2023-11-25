import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostOverviewComponent } from './new-post-overview.component';

describe('NewPostOverviewComponent', () => {
  let component: NewPostOverviewComponent;
  let fixture: ComponentFixture<NewPostOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPostOverviewComponent]
    });
    fixture = TestBed.createComponent(NewPostOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
