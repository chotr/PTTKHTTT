import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComComponent } from './demo-com.component';

describe('DemoComComponent', () => {
  let component: DemoComComponent;
  let fixture: ComponentFixture<DemoComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoComComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
