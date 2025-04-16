import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsManageComponent } from './ingredients-manage.component';

describe('IngredientsManageComponent', () => {
  let component: IngredientsManageComponent;
  let fixture: ComponentFixture<IngredientsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
