import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ManagePlayerService, SelectUserService } from '@shared/netflicks';
import { HomeComponent } from './home.component';
import { AuthService } from '@core/auth';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
