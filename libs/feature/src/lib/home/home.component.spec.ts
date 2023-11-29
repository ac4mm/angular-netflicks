import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ManagePlayerService,
  SelectUserService,
  NfSpeakerupButtonComponent,
} from '@shared/netflicks';
import { HomeComponent } from './home.component';
import { AuthService } from '@data-access/auth';
import { ProfileGateComponent } from '../home/profile-gate/profile-gate.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ProfileGateComponent,
        NfSpeakerupButtonComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [SelectUserService, AuthService, ManagePlayerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
