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
import { DialogService } from 'primeng/dynamicdialog';
import { lastValueFrom, of } from 'rxjs';
import { CoverImage, TvMazeService } from '@shared/netflicks';

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
        DialogService,
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

  it('loads a cover image for each show', async () => {
    const imageFor = (id: number): CoverImage => ({
      id: String(id),
      type: 'background',
      main: true,
      resolutions: {
        original: {
          url: `https://example.com/${id}.jpg`,
          width: 1920,
          height: 1080,
        },
      },
    });
    const tvMazeService = TestBed.inject(TvMazeService);
    jest
      .spyOn(tvMazeService, 'searchImagesMovie')
      .mockImplementation((id) => of([imageFor(id)]));

    const images = await lastValueFrom(
      component.getAllCoverImagesById$([101, 202, 303])
    );

    expect(images).toEqual([
      'https://example.com/101.jpg',
      'https://example.com/202.jpg',
      'https://example.com/303.jpg',
    ]);
  });
});
