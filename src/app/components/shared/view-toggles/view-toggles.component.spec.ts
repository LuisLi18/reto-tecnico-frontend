import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTogglesComponent } from './view-toggles.component';

describe('ViewTogglesComponent', () => {
  let component: ViewTogglesComponent;
  let fixture: ComponentFixture<ViewTogglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTogglesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
