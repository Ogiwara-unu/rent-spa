import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRentsComponent } from './view-rents.component';

describe('ViewRentsComponent', () => {
  let component: ViewRentsComponent;
  let fixture: ComponentFixture<ViewRentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
