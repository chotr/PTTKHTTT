import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimesManagementComponent } from './showtimes-management.component';

describe('ShowtimesManagementComponent', () => {
  let component: ShowtimesManagementComponent;
  let fixture: ComponentFixture<ShowtimesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtimesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
