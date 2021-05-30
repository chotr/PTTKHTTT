import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsGheComponent } from './ds-ghe.component';

describe('DsGheComponent', () => {
  let component: DsGheComponent;
  let fixture: ComponentFixture<DsGheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsGheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsGheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
