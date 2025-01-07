import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PopupService} from '../services/popup.service';
import {EventService} from '../services/event.service';
import {Router} from '@angular/router';
import {Event} from '../models/event.model';
import {Artist} from '../models/artist.model';
import {ArtistService} from '../services/artist.service';

@Component({
  selector: 'app-edit-event',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-event.component.html',
  standalone: true,
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent implements OnInit {
  @Input() event: Event | null = null;
  isAddingArtist = false;
  eventForm!: FormGroup;
  artists: Artist[] = [];

  constructor(private popupService: PopupService, private eventService: EventService,
              private router: Router, private artistService: ArtistService) { }


  ngOnInit() {
    this.event = history.state.event;

    this.eventForm = new FormGroup({
      label: new FormControl(this.event?.label || '', Validators.required),
      startDate: new FormControl(this.event?.startDate || '', Validators.required),
      endDate: new FormControl(this.event?.endDate || '', Validators.required),
      artists: new FormControl(this.event?.artists),
      selectedArtist: new FormControl(null)
    });

  }

  onSubmit() {
    if (this.event?.id == null) {
      this.popupService.openError("Event not found")
      return;
    }
    let label = this.eventForm.value.label ?? "";
    if (label == null || label.length < 3) {
      this.popupService.openWarning('Label invalid, too short');
      return;
    }

    let startDate = (this.eventForm.value.startDate ?? "") == "" ? new Date() : new Date(this.eventForm.value.startDate!)
    let endDate = (this.eventForm.value.endDate ?? "") == "" ? new Date() : new Date(this.eventForm.value.endDate!)
    this.eventForm.patchValue({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
    if (startDate < new Date()) {
      this.popupService.openWarning('Start date invalid, must be in the future');
      return;
    }

    if (endDate < startDate) {
      this.popupService.openWarning('End date must be later than start date');
      return;
    }
    this.eventService.editEvent(this.event.id, label, startDate, endDate).subscribe(
      () => {
        this.popupService.openSuccess('Event modified!')
        this.router.navigate(["/events"])
      }
    );
  }

  unlinkArtist(artistId: number) {
    if (this.event?.id == null) {
      this.popupService.openError("Event not found")
      return;
    }
    if (artistId == null) {
      this.popupService.openError("Artist not found")
      return;
    }
    this.eventService.unlinkArtist(this.event.id, artistId).subscribe(
      () => {
        this.popupService.openSuccess('Artist unlinked!')
        this.loadEvent()
      }
    );
  }

  linkArtist() {
    if (this.event == null) {
      this.popupService.openError("Event not found")
      return;
    }
    const selectedArtist = this.eventForm.get('selectedArtist')?.value;
    if (!selectedArtist) {
      this.popupService.openError('Artist not found.');
      return;
    }
    this.eventService.linkEventToArtist(this.event.id, selectedArtist.id).subscribe({
        next: () => {
          this.popupService.openSuccess("Artist linked!");
          this.loadEvent()
          this.isAddingArtist = false;
        }
      }
    )
  }

  toggleAddArtist() {
    this.isAddingArtist = true;
    this.loadArtists();
  }

  cancelLink() {
    this.isAddingArtist = false;
  }

  toggleDetails() {
    this.router.navigate(['/events/' + this.event?.id]);
  }

  private loadArtists() {
    let pageNumber = 0;
    let allArtists: Artist[] = [];
    const fetchPage = () => {
      this.artistService.getArtists(pageNumber).subscribe(
        artists => {
          if (artists.content.length == 0) {
            this.artists = allArtists;
            return;
          }
          allArtists = allArtists.concat(artists.content);
          pageNumber++;
          fetchPage();
        }
      );
    }
    fetchPage()
  }



  private loadEvent() {
    if (this.event?.id == null) {
      this.popupService.openError("Event not found")
      return;
    }
    this.eventService.getEvent(this.event.id.toString()).subscribe(event => this.event = event)

  }
}
