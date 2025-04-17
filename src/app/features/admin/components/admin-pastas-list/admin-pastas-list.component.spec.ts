import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPastasListComponent } from './admin-pastas-list.component';

describe('AdminPastasListComponent', () => {
  let component: AdminPastasListComponent;
  let fixture: ComponentFixture<AdminPastasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPastasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPastasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
