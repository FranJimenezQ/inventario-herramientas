import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { logout } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectUsuario } from '../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { RegistrarUsuarioComponent } from '../modals/usuarios-modals/registrar-usuario/registrar-usuario.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink, MatButtonModule, NgIf, AsyncPipe ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public selectUsuario$ = this.store.select(selectUsuario);
  public isAdmin: boolean = false;
  public isAdminSubscriber!: Subscription;
  constructor(private dialog : MatDialog, private store: Store) {
    this.isAdminSubscriber = this.selectUsuario$.subscribe(usuario => {
      this.isAdmin = usuario?.rol === 'ADMIN';
    });
  }


  logout() {
    // Implement logout logic here
    this.store.dispatch(logout());
  }

  registrarUsuario() {
    // Implement logic to open the register user modal
    this.dialog.open(RegistrarUsuarioComponent);
  }

}
