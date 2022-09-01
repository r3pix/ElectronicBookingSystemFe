import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPictureComponent } from './view-picture.component';

describe('ViewPictureComponent', () => {
  let component: ViewPictureComponent;
  let fixture: ComponentFixture<ViewPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
