import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Artist} from '../models/artist.model';
import {Router} from '@angular/router';
import {ArtistService} from '../services/artist.service';
import {PopupService} from '../services/popup.service';

@Component({
  selector: 'app-artist-creation-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './artist-creation-form.component.html',
  standalone: true,
  styleUrl: './artist-creation-form.component.scss'
})
export class ArtistCreationFormComponent {
  artist: Artist | null = null;

  constructor(private router: Router, private artistService: ArtistService,
              private popupService: PopupService) {}

  artistForm = new FormGroup({
    label : new FormControl('')
  });

  onSubmit() {
    let label = this.artistForm.value.label ?? "";
    if (label == null || label.length < 3) {
      this.popupService.openWarning('Label invalid, too short');
      return;
    }
    this.artistService.createArtist(label).subscribe(
      () => {
        this.popupService.openSuccess('Artist created!');
        this.router.navigate(["/artists"])
      }
    );
  }
}
