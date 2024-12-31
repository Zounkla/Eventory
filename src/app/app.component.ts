import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {NgToastModule} from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Eventory';
}
