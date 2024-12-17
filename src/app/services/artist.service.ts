import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ArtistList} from '../models/artist-list'
import {Artist} from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private readonly url: string;
  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080/artists";
  }

  getArtists(pageNumber : number) {
    return this.http.get<ArtistList>(this.url + "?page=" + pageNumber + "&size=10");
  }

  getArtist(id: string) {
    return this.http.get<Artist>(this.url + "/" + id);
  }

  deleteArtist(id: string) {
    return this.http.delete<Event>(this.url + "/" + id);
  }

  createArtist(label: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let payload = {
      label: label
    };
    return this.http.post<Artist>(this.url, payload, {headers})
  }
}
