import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingComponent } from './translating.component';

describe('TranslatingComponent', () => {
  let component: TranslatingComponent;
  let fixture: ComponentFixture<TranslatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
