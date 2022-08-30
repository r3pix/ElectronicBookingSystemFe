import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationCatalogComponent } from './decoration-catalog.component';

describe('DecorationCatalogComponent', () => {
  let component: DecorationCatalogComponent;
  let fixture: ComponentFixture<DecorationCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecorationCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorationCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
