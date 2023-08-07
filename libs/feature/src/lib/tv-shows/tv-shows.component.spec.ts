import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TvShowsComponent } from './tv-shows.component';

describe('TvShowsComponent', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
