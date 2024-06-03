import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciaComponent } from './licencia.component';

describe('LicenciaComponent', () => {
  let component: LicenciaComponent;
  let fixture: ComponentFixture<LicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
