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
  styleUrl: './artist-list.component.scss'
})
export class ArtistListComponent implements OnInit {

  artistList: Artist[] = []
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

  protected reloadArtists() {
    this.service.getArtists(this.pageNumber).subscribe(
      data => {
        this.artistList = data.content;
        this.totalPages = data.totalPages;
      }
    )
  }

}
