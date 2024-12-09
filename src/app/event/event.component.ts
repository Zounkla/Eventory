import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../models/event.model';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  standalone: true,
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {

  @Input() id: string = "";
  event: Event | null = null;

  constructor(private service: EventService){}

  ngOnInit(): void {
    this.service.getEvent(this.id).subscribe(data => this.event = data);
  }

}
