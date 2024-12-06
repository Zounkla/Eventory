import { Routes } from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';

export const routes: Routes = [
  {
    path: "events",
    component: EventListComponent
  }
];
