import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDecorationComponent } from './manage-decoration.component';

describe('ManageDecorationComponent', () => {
  let component: ManageDecorationComponent;
  let fixture: ComponentFixture<ManageDecorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDecorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
