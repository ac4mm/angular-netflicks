import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListComponent } from './my-list.component';

describe('MyListComponent', () => {
  let component: MyListComponent;
  let fixture: ComponentFixture<MyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
