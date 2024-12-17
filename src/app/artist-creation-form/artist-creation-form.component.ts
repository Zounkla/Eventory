import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Artist} from '../models/artist.model';
import {Router} from '@angular/router';
import {ArtistService} from '../services/artist.service';

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

  constructor(private router: Router, private artistService: ArtistService) {}

  artistForm = new FormGroup({
    label : new FormControl('')
  });

  onSubmit() {
    this.artistService.createArtist(this.artistForm.value.label ?? "").subscribe(
      () => this.router.navigate(["/artists"])
    )
  }
}
