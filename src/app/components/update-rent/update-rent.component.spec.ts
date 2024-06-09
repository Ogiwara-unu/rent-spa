import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentComponent } from './update-rent.component';

describe('UpdateRentComponent', () => {
  let component: UpdateRentComponent;
  let fixture: ComponentFixture<UpdateRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
