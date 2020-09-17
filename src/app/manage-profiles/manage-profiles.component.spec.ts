import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfilesComponent } from './manage-profiles.component';

describe('ManageProfilesComponent', () => {
  let component: ManageProfilesComponent;
  let fixture: ComponentFixture<ManageProfilesComponent>;

  beforeEach(async(() => {
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
