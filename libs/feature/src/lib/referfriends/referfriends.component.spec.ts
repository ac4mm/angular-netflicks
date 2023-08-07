import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferfriendsComponent } from './referfriends.component';

describe('ReferfriendsComponent', () => {
  let component: ReferfriendsComponent;
  let fixture: ComponentFixture<ReferfriendsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferfriendsComponent ]
    })
    .compileComponents();
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
