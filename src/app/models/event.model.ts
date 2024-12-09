import {Artist} from './artist.model';

export interface Event {
  id: number;
  label: string;
  startDate: Date;
  endDate: Date;
  artists: Artist[];
}
