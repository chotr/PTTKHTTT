import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCinemaComponent } from './detail-cinema.component';

describe('DetailCinemaComponent', () => {
  let component: DetailCinemaComponent;
  let fixture: ComponentFixture<DetailCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCinemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
