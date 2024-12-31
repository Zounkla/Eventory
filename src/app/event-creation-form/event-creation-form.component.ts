import {Component} from '@angular/core';
import { Event } from '../models/event.model'
import {EventService} from '../services/event.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {PopupService} from '../services/popup.service';
@Component({
  selector: 'app-event-creation-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-creation-form.component.html',
  standalone: true,
  styleUrl: './event-creation-form.component.scss'
})
export class EventCreationFormComponent {
  event: Event | null = null;

  constructor(private router: Router, private eventService: EventService,
          private popupService: PopupService) {}

  eventForm = new FormGroup({
    label : new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });
  onSubmit() {
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
    this.eventService.createEvent(label, startDate, endDate).subscribe(
      () => {
        this.popupService.openSuccess('Event created!')
        this.router.navigate(["/events"])
      }
    );
  }
}
