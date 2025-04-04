import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsComponent } from './user-actions.component';

describe('UserActionsComponent', () => {
  let component: UserActionsComponent;
  let fixture: ComponentFixture<UserActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
