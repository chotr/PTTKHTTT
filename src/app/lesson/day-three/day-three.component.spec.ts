import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayThreeComponent } from './day-three.component';

describe('DayThreeComponent', () => {
  let component: DayThreeComponent;
  let fixture: ComponentFixture<DayThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
