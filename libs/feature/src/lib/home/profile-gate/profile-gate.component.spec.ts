import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FullscreenIntroAnimationComponent,
  LoadingSpinnerComponent,
  SelectUserService,
} from '@shared/netflicks';
import { ProfileGateComponent } from './profile-gate.component';
import { AuthService } from '@core/auth';

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
      providers: [SelectUserService, AuthService],
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
