import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PopupService} from '../services/popup.service';
import {EventService} from '../services/event.service';
import {Router} from '@angular/router';
import {Event} from '../models/event.model';

@Component({
  selector: 'app-edit-event',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-event.component.html',
  standalone: true,
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent implements OnInit {
  @Input() event: Event | null = null;
  eventForm!: FormGroup;

  constructor(private popupService: PopupService, private eventService: EventService,
              private router: Router) { }


  ngOnInit() {
    this.event = history.state.event;
    console.log(this.event?.id)

    this.eventForm = new FormGroup({
      label: new FormControl(this.event?.label || '', Validators.required),
      startDate: new FormControl(this.event?.startDate || '', Validators.required),
      endDate: new FormControl(this.event?.endDate || '', Validators.required),
      artists: new FormControl(this.event?.artists)
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

  private loadEvent() {
    if (this.event?.id == null) {
      this.popupService.openError("Event not found")
      return;
    }
    this.eventService.getEvent(this.event.id.toString()).subscribe(event => this.event = event)

  }
}
