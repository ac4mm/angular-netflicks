import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferfriendsComponent } from './referfriends.component';

describe('ReferfriendsComponent', () => {
  let component: ReferfriendsComponent;
  let fixture: ComponentFixture<ReferfriendsComponent>;

  beforeEach(async(() => {
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
