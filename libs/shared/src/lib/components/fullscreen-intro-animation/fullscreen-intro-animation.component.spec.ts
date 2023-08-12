import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullscreenIntroAnimationComponent } from './fullscreen-intro-animation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
});
