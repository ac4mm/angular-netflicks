import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageProfilesComponent } from './manage-profiles.component';

describe('ManageProfilesComponent', () => {
  let component: ManageProfilesComponent;
  let fixture: ComponentFixture<ManageProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
