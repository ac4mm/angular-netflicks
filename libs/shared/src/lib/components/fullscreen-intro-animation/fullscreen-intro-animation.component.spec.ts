import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullscreenIntroAnimationComponent } from './fullscreen-intro-animation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

export const mocks = {
  Audio: {
    load: jest.fn(),
    play: jest.fn(() => Promise.resolve()),
    pause: jest.fn(),
  },
};

// Audio mock
global.Audio = jest.fn().mockImplementation(() => ({
  load: mocks.Audio.load,
  play: mocks.Audio.play,
}));

describe('FullscreenIntroAnimationComponent', () => {
  let component: FullscreenIntroAnimationComponent;
  let fixture: ComponentFixture<FullscreenIntroAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullscreenIntroAnimationComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FullscreenIntroAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load/play audio', () => {
    // run your test here
    expect(mocks.Audio.load).toHaveBeenCalled();
    expect(mocks.Audio.play).toHaveBeenCalled();
  });
});
