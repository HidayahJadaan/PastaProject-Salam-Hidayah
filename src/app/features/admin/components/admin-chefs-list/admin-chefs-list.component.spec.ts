import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChefsListComponent } from './admin-chefs-list.component';

describe('AdminChefsListComponent', () => {
  let component: AdminChefsListComponent;
  let fixture: ComponentFixture<AdminChefsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminChefsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChefsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
