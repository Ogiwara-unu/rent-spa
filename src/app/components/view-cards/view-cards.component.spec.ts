import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardsComponent } from './view-cards.component';

describe('ViewCardsComponent', () => {
  let component: ViewCardsComponent;
  let fixture: ComponentFixture<ViewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
