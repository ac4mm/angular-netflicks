import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsComponent } from './kids.component';
describe('KidsComponent', () => {
  let component: KidsComponent;
  let fixture: ComponentFixture<KidsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
