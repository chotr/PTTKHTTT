import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassModalComponent } from './pass-modal.component';

describe('PassModalComponent', () => {
  let component: PassModalComponent;
  let fixture: ComponentFixture<PassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
