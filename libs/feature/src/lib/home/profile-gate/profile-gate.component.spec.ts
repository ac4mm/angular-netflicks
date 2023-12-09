import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectUserService } from '@shared/netflicks';
import { ProfileGateComponent } from './profile-gate.component';
import { AuthService } from '@core/auth';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileGateComponent', () => {
  let component: ProfileGateComponent;
  let fixture: ComponentFixture<ProfileGateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
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
