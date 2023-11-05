import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SwiperContainerComponent } from './swiper-container.component';
import { DialogService } from 'primeng/dynamicdialog';

describe('SwiperContainerComponent', () => {
  let component: SwiperContainerComponent;
  let fixture: ComponentFixture<SwiperContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwiperContainerComponent],
      providers: [DialogService],
    }).compileComponents();

    fixture = TestBed.createComponent(SwiperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
