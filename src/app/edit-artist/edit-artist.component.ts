import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../models/artist.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PopupService} from '../services/popup.service';
import {ArtistService} from '../services/artist.service';
import {Router} from '@angular/router';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-edit-artist',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-artist.component.html',
  standalone: true,
  styleUrl: './edit-artist.component.scss'
})
export class EditArtistComponent implements OnInit {

  @Input() artist : Artist | null = null;
  isAddingEvent = false;
  artistForm!: FormGroup;
  events: Event[] = [];

  constructor(private popupService: PopupService, private artistService: ArtistService,
              private router: Router, private eventService: EventService) {
  }

  ngOnInit() {
    this.artist = history.state.artist;

    this.artistForm = new FormGroup({
      label: new FormControl(this.artist?.label || '', Validators.required),
      events: new FormControl(this.artist?.events),
      selectedEvent: new FormControl(null)
    });
  }

  onSubmit() {
    if (this.artist?.id == null) {
      this.popupService.openError("Artist not found");
      return;
    }
    let label = this.artistForm.value.label ?? "";

    this.artistService.editArtist(this.artist.id, label).subscribe(
      () => {
        this.popupService.openSuccess("Artist has been updated!");
        this.router.navigate(['/artists']);
      }
    )
  }

  toggleDetails() {
    this.router.navigate(['/artists/' + this.artist?.id]);
  }
}
