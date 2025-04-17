import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPastasFormComponent } from './admin-pastas-form.component';

describe('AdminPastasFormComponent', () => {
  let component: AdminPastasFormComponent;
  let fixture: ComponentFixture<AdminPastasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPastasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPastasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
