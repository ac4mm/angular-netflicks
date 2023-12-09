import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ManagePlayerService,
  SelectUserService,
  TheMovieDBService,
} from '@shared/netflicks';
import { HomeComponent } from './home.component';
import { AuthService, AuthServiceMock } from '@core/auth';
import { HttpClientModule } from '@angular/common/http';
import { ThemoviedbServiceMock } from '@shared/netflicks';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: TheMovieDBService, useClass: ThemoviedbServiceMock },
        SelectUserService,
        ManagePlayerService,
      ],
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
