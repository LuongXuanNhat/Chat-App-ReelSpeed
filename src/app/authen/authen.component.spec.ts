import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenComponent } from './authen.component';

describe('AuthenComponent', () => {
  let component: AuthenComponent;
  let fixture: ComponentFixture<AuthenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
