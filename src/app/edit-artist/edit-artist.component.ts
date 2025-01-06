import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../models/artist.model';
import {Event} from '../models/event.model';
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
    if (label == null || label.length < 3) {
      this.popupService.openWarning('Label invalid, too short');
      return;
    }
    this.artistService.editArtist(this.artist.id, label).subscribe(
      () => {
        this.popupService.openSuccess("Artist has been updated!");
        this.router.navigate(['/artists']);
      }
    )
  }

  unlinkEvent(eventId: number) {
    if (this.artist?.id == null) {
      this.popupService.openError("Artist not found");
      return;
    }
    if (eventId == null) {
      this.popupService.openError("Event not found");
    }
    this.eventService.unlinkArtist(eventId, this.artist.id).subscribe(
      () => {
        this.popupService.openSuccess("Event unlinked!");
        this.loadArtist();
      }
    )
  }

  linkEvent() {
    if(this.artist == null) {
      this.popupService.openError("Artist not found");
      return;
    }
    const selectedEvent = this.artistForm.get('selectedEvent')?.value;
    if(!selectedEvent) {
      this.popupService.openError("Event not found");
      return;
    }
    this.eventService.linkEventToArtist(selectedEvent.id, this.artist.id).subscribe({
      next: () => {
        this.loadArtist();
        this.isAddingEvent = true;
      }
    })
  }

  toggleAddEvent() {
    this.isAddingEvent = true;
    this.loadEvents();
  }

  cancelLink() {
    this.isAddingEvent = false;
  }

  toggleDetails() {
    this.router.navigate(['/artists/' + this.artist?.id]);
  }

  private loadEvents() {
    let pageNumber = 0;
    let allEvents: Event[] = [];
    const fetchPage = () => {
      this.eventService.getEvents(pageNumber).subscribe(
        events => {
          if (events.content.length == 0) {
            this.events = allEvents;
            return;
          }
          allEvents = allEvents.concat(events.content);
          pageNumber++;
          fetchPage();
        }
      );
    }
    fetchPage();
  }

  private loadArtist() {
    if (this.artist?.id == null) {
      this.popupService.openError("Artist not found");
      return;
    }
    this.artistService.getArtist(this.artist.id.toString()).subscribe(artist => this.artist = artist);
  }
}
