import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsFormComponent } from './chefs-form.component';

describe('ChefsFormComponent', () => {
  let component: ChefsFormComponent;
  let fixture: ComponentFixture<ChefsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChefsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
