import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyListComponent } from './my-list.component';
import { SharedModule } from '@shared/netflicks';

describe('MyListComponent', () => {
  let component: MyListComponent;
  let fixture: ComponentFixture<MyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyListComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
