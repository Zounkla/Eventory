import { Routes } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventComponent} from './event/event.component';

export const routes: Routes = [
  {
    path: "events",
    component: EventListComponent
  },
  {
    path: "events/:id",
    component: EventComponent
  }
];
