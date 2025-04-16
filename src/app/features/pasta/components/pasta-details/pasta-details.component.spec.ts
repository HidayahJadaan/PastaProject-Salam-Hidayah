import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaDetailsComponent } from './pasta-details.component';

describe('PastaDetailsComponent', () => {
  let component: PastaDetailsComponent;
  let fixture: ComponentFixture<PastaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastaDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
