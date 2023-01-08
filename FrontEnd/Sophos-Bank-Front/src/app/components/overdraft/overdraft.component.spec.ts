import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdraftComponent } from './overdraft.component';

describe('OverdraftComponent', () => {
  let component: OverdraftComponent;
  let fixture: ComponentFixture<OverdraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
