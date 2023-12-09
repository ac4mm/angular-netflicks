import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ManageProfilesComponent } from './manage-profiles.component';
import { SelectUserService } from '@shared/netflicks';
import { AuthService } from '@core/auth';
import { RouterTestingModule } from '@angular/router/testing';

class AuthServiceMock {}
describe('ManageProfilesComponent', () => {
  let component: ManageProfilesComponent;
  let fixture: ComponentFixture<ManageProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectUserService,
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
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
