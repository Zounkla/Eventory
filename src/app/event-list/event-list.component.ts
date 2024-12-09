import {Component, OnInit} from '@angular/core';
import {Event} from "../models/event.model"
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  standalone: true,
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  eventList: Event[] = [];

  constructor(private service: EventService){}

  ngOnInit(): void {
    this.service.getEvents(0).subscribe(
      data => this.eventList = data.content
    );
  }



}
