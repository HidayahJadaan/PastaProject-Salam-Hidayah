import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminChefComponent } from './sidebar-admin-chef.component';

describe('SidebarAdminChefComponent', () => {
  let component: SidebarAdminChefComponent;
  let fixture: ComponentFixture<SidebarAdminChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarAdminChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAdminChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
