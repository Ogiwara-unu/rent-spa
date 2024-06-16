import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentCatalogComponent } from './add-rent-catalog.component';

describe('AddRentCatalogComponent', () => {
  let component: AddRentCatalogComponent;
  let fixture: ComponentFixture<AddRentCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRentCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRentCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
