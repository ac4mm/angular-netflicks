import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SwiperContainerComponent } from './swiper-container.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManagePlayerService } from '../../services/manage-player.service';

describe('SwiperContainerComponent', () => {
  let component: SwiperContainerComponent;
  let fixture: ComponentFixture<SwiperContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DialogService, ManagePlayerService],
    }).compileComponents();

    fixture = TestBed.createComponent(SwiperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
