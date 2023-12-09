import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferfriendsComponent } from './referfriends.component';

describe('ReferfriendsComponent', () => {
  let component: ReferfriendsComponent;
  let fixture: ComponentFixture<ReferfriendsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
