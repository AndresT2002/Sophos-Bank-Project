import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTransHistoryComponent } from './product-trans-history.component';

describe('ProductTransHistoryComponent', () => {
  let component: ProductTransHistoryComponent;
  let fixture: ComponentFixture<ProductTransHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTransHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTransHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
