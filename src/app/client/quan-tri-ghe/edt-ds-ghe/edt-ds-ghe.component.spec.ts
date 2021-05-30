import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtDsGheComponent } from './edt-ds-ghe.component';

describe('EdtDsGheComponent', () => {
  let component: EdtDsGheComponent;
  let fixture: ComponentFixture<EdtDsGheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdtDsGheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdtDsGheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
