import {Artist} from './artist.model';

export interface Event {
  label: string;
  startDate: Date;
  endDate: Date;
  artists: Artist[];
}
