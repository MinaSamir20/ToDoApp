import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConactUsComponent } from './conact-us.component';

describe('ConactUsComponent', () => {
  let component: ConactUsComponent;
  let fixture: ComponentFixture<ConactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
