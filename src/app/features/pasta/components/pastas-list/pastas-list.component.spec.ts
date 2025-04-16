import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastasListComponent } from './pastas-list.component';

describe('PastasListComponent', () => {
  let component: PastasListComponent;
  let fixture: ComponentFixture<PastasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
