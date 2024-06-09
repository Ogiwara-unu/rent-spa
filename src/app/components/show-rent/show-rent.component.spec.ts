import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRentComponent } from './show-rent.component';

describe('ShowRentComponent', () => {
  let component: ShowRentComponent;
  let fixture: ComponentFixture<ShowRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
