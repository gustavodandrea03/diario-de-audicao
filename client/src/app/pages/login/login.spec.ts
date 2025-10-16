import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component'; // Update import

describe('LoginComponent', () => { // Update describe block
  let component: LoginComponent; // Update type
  let fixture: ComponentFixture<LoginComponent>; // Update type

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent] // Update import
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent); // Update
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});