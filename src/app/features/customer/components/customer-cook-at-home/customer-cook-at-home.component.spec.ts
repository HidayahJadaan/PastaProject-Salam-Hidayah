import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCookAtHomeComponent } from './customer-cook-at-home.component';

describe('CustomerCookAtHomeComponent', () => {
  let component: CustomerCookAtHomeComponent;
  let fixture: ComponentFixture<CustomerCookAtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerCookAtHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCookAtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
