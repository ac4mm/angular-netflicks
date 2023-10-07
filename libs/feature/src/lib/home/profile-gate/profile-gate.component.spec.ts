import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileGateComponent } from './profile-gate.component';
import { FullscreenIntroAnimationComponent } from '../../../../../shared/src/lib/components/fullscreen-intro-animation/fullscreen-intro-animation.component';
import { LoadingSpinnerComponent } from '../../../../../shared/src/lib/components/loading-spinner/loading-spinner.component';

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
