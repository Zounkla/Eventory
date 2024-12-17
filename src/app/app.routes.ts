import { Routes } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventComponent} from './event/event.component';
import {ArtistListComponent} from './artist-list/artist-list.component';
import {EventCreationFormComponent} from './event-creation-form/event-creation-form.component';

export const routes: Routes = [
  {
    path: "events",
    component: EventListComponent
  },
  {
    path: "artists",
    component: ArtistListComponent
  },
  {
    path: "createEvent",
    component: EventCreationFormComponent
  },
  {
    path: "events/:id",
    component: EventComponent
  }
];
