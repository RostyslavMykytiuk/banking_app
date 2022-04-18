import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortageComponent } from './mortage.component';

describe('MortageComponent', () => {
  let component: MortageComponent;
  let fixture: ComponentFixture<MortageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
