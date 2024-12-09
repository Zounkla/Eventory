import {Event} from './event.model';

export interface Artist {
  id: number;
  label: string;
  events: Event[];
}
