import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGateComponent } from './profile-gate.component';

describe('ProfileGateComponent', () => {
  let component: ProfileGateComponent;
  let fixture: ComponentFixture<ProfileGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
