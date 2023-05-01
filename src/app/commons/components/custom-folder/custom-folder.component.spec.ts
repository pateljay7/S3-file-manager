import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFolderComponent } from './custom-folder.component';

describe('CustomFolderComponent', () => {
  let component: CustomFolderComponent;
  let fixture: ComponentFixture<CustomFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
