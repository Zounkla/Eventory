import {Component} from '@angular/core';
import { Event } from '../models/event.model'
import {EventService} from '../services/event.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
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

  constructor(private router: Router, private eventService: EventService) {}

  eventForm = new FormGroup({
    label : new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });
  onSubmit() {
    this.eventService.createEvent(this.eventForm.value.label ?? "",
      this.eventForm.value.startDate == null ? new Date() : new Date(this.eventForm.value.startDate),
      this.eventForm.value.endDate == null ? new Date() : new Date(this.eventForm.value.endDate)).subscribe(
      () => this.router.navigate(["/events"])
    );
  }
}
