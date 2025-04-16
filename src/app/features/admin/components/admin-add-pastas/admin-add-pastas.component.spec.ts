import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPastasComponent } from './admin-add-pastas.component';

describe('AdminAddPastasComponent', () => {
  let component: AdminAddPastasComponent;
  let fixture: ComponentFixture<AdminAddPastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddPastasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddPastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
