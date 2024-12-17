import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCreationFormComponent } from './artist-creation-form.component';

describe('ArtistCreationFormComponent', () => {
  let component: ArtistCreationFormComponent;
  let fixture: ComponentFixture<ArtistCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistCreationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
