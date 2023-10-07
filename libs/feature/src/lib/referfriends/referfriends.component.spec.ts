import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferfriendsComponent } from './referfriends.component';
import { SharedModule } from '../../../../shared/src/lib/shared.module';

describe('ReferfriendsComponent', () => {
  let component: ReferfriendsComponent;
  let fixture: ComponentFixture<ReferfriendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReferfriendsComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
