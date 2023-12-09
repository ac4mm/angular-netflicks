import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService, AuthServiceMock } from '@core/auth';
import { SelectUserService } from '@shared/netflicks';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DialogService,
        SelectUserService,
        { provide: AuthService, useClass: AuthServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
