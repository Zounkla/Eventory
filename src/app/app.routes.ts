import { Routes } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventComponent} from './event/event.component';
import {ArtistListComponent} from './artist-list/artist-list.component';
import {EventCreationFormComponent} from './event-creation-form/event-creation-form.component';
import {ArtistCreationFormComponent} from './artist-creation-form/artist-creation-form.component';
import {ArtistComponent} from './artist/artist.component';

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
  },
  {
    path: "createArtist",
    component: ArtistCreationFormComponent
  },
  {
    path: "artists/:id",
    component: ArtistComponent
  }
];
