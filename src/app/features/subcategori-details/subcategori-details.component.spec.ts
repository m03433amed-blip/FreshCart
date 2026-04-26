import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriDetailsComponent } from './subcategori-details.component';

describe('SubcategoriDetailsComponent', () => {
  let component: SubcategoriDetailsComponent;
  let fixture: ComponentFixture<SubcategoriDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubcategoriDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
