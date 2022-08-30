import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCatalogComponent } from './room-catalog.component';

describe('RoomCatalogComponent', () => {
  let component: RoomCatalogComponent;
  let fixture: ComponentFixture<RoomCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
