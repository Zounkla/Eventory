import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventList} from '../models/event-list';
import {Event} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  getEvents(pageNumber: number) {
    return this.http.get<EventList>("http://localhost:8080/events?page=" + pageNumber + "&size=10");
  }

  getEvent(id: string) {
    return this.http.get<Event>("http://localhost:8080/events/" + id);
  }
}
