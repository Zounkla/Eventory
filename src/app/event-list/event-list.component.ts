import {Component, OnInit} from '@angular/core';
import {Event} from "../models/event.model"
import {EventService} from '../services/event.service';
import {PaginationBarComponent} from '../pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  standalone: true,
  imports: [
    PaginationBarComponent
  ],
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {

  eventList: Event[] = [];
  pageNumber: number = 0;
  totalPages: number = 0;

  constructor(private service: EventService){}

  ngOnInit(): void {
    this.reloadEvents();
  }

  changePage(newPage: number) {
    this.pageNumber = newPage;
    this.reloadEvents();
  }

  protected reloadEvents() {
    this.service.getEvents(this.pageNumber).subscribe(
      data => {
          this.eventList = data.content;
          this.totalPages = data.totalPages;
      }
    );
  }
}
