import {Component, OnInit} from '@angular/core';
import {Artist} from '../models/artist.model';
import {ArtistService} from  '../services/artist.service'
import {RouterLink} from '@angular/router';
import {PaginationBarComponent} from '../pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-artist-list',
  imports: [
    RouterLink,
    PaginationBarComponent
  ],
  templateUrl: './artist-list.component.html',
  standalone: true,
  styleUrl: './artist-list.component.scss'
})
export class ArtistListComponent implements OnInit {

  artistList: Artist[] = [];
  filteredArtistList: Artist[] = [];
  pageNumber: number = 0;
  totalPages: number = 0;

  constructor(private service: ArtistService) {}

  ngOnInit(): void {
    this.reloadArtists();
  }

  changePage(newPage: number) {
    this.pageNumber = newPage
    this.reloadArtists();
  }

  filterArtist(value: string) {
    if(!value) {
      this.filteredArtistList = this.artistList;
      return;
    }
    this.filteredArtistList = this.artistList.filter(artist =>
      artist?.label.toLowerCase().includes(value.toLowerCase())
    );
  }

  protected reloadArtists() {
    this.service.getArtists(this.pageNumber).subscribe(
      data => {
        this.artistList = data.content;
        this.filteredArtistList = this.artistList;
        this.totalPages = data.totalPages;
      }
    )
  }

}
