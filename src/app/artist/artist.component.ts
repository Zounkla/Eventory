import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Artist} from '../models/artist.model';
import {ArtistService} from '../services/artist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artist',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './artist.component.html',
  standalone: true,
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnInit {

  @Input() id: string = "";
  artist: Artist | null = null;

  constructor(private service: ArtistService, private router: Router){}

  ngOnInit(): void {
    this.service.getArtist(this.id).subscribe(
      data => {
        this.artist = data
      }
    )
  }

  deleteArtist(): void {
    this.service.deleteArtist(this.id).subscribe(
      () => this.router.navigate(['/artists'])
    )
  }

  async toggleEdit() {
    await this.router.navigate(['/edit-artist'], { state: { artist: this.artist}})
  }
}
