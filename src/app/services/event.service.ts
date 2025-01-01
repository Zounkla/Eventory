import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventList} from '../models/event-list';
import {Event} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly url: string
  constructor(private http:HttpClient) {
    this.url = "http://localhost:8080/events";
  }

  getEvents(pageNumber: number) {
    return this.http.get<EventList>(this.url + "?page=" + pageNumber + "&size=10");
  }

  getEvent(id: string) {
    return this.http.get<Event>(this.url + "/" + id);
  }

  deleteEvent(id: string) {
    return this.http.delete<Event>(this.url + "/" + id);
  }

  createEvent(label: string, startDate: Date, endDate: Date) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let payload = {
      label: label,
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate)
    };
    return this.http.post<Event>(this.url, payload, {headers});
  }

  editEvent(id: number | null, label: string, startDate: Date, endDate: Date) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let payload = {
      label: label,
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate)
    };
    return this.http.put<Event>(this.url + "/" + id, payload, {headers});
  }

  unlinkArtist(eventId: number, artistId: number) {
    return this.http.delete<Event>(this.url + "/" + eventId + "/artists/" + artistId);
  }

  private formatDate(date: Date): string {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
  }
}
