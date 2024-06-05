import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLicensesComponent } from './view-licenses.component';

describe('ViewLicensesComponent', () => {
  let component: ViewLicensesComponent;
  let fixture: ComponentFixture<ViewLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLicensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
