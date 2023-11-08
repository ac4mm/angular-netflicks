import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectUserService, SharedModule } from '@shared/netflicks';
import { ManageProfilesComponent } from './manage-profiles.component';
import { ProfileGateComponent } from '../home/profile-gate/profile-gate.component';

describe('ManageProfilesComponent', () => {
  let component: ManageProfilesComponent;
  let fixture: ComponentFixture<ManageProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProfilesComponent, ProfileGateComponent],
      providers: [SelectUserService],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
