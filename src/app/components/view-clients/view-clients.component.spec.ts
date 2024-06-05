import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientsComponent } from './view-clients.component';

describe('ViewClientsComponent', () => {
  let component: ViewClientsComponent;
  let fixture: ComponentFixture<ViewClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
