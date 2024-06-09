import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientComponent } from './show-client.component';

describe('ShowClientComponent', () => {
  let component: ShowClientComponent;
  let fixture: ComponentFixture<ShowClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
