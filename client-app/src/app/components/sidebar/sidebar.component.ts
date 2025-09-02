import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { logout } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private dialog : MatDialog, private store: Store) {}


  logout() {
    // Implement logout logic here
    this.store.dispatch(logout());
  }

}
