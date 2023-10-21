import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileGateComponent } from './profile-gate.component';
import {
  FullscreenIntroAnimationComponent,
  LoadingSpinnerComponent,
} from '@shared/netflicks';

describe('ProfileGateComponent', () => {
  let component: ProfileGateComponent;
  let fixture: ComponentFixture<ProfileGateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileGateComponent,
        FullscreenIntroAnimationComponent,
        LoadingSpinnerComponent,
      ],
    }).compileComponents();
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
