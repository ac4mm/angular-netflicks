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

  it('uses at least 1920x1080 for the preview player', () => {
    expect(component.playerWidth).toBe(Math.max(window.innerWidth, 1920));
    expect(component.playerHeight).toBe(Math.max(window.innerHeight, 1080));

    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;

    try {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1280,
      });
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 720,
      });
      window.dispatchEvent(new Event('resize'));

      expect(component.playerWidth).toBe(1920);
      expect(component.playerHeight).toBe(1080);

      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 2560,
      });
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 1440,
      });
      window.dispatchEvent(new Event('resize'));

      expect(component.playerWidth).toBe(2560);
      expect(component.playerHeight).toBe(1440);
    } finally {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: originalWidth,
      });
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: originalHeight,
      });
    }
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
