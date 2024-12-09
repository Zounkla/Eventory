import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../models/event.model';
import {EventService} from '../services/event.service';
import {Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './event.component.html',
  standalone: true,
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {

  @Input() id: string = "";
  event: Event | null = null;

  constructor(private service: EventService, private router: Router){}

  ngOnInit(): void {
    this.service.getEvent(this.id).subscribe(data => this.event = data);
  }

  deleteEvent(): void {
    this.service.deleteEvent(this.id).subscribe(
      () => this.router.navigate(["/events"])
    );
  }
}
