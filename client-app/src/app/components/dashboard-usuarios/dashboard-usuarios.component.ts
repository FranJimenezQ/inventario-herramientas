import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Usuario } from '../../store/usuarios/usuarios.state';
import { selectUsuarios } from '../../store/usuarios/usuarios.selectors';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/appState';
import { ChangeDetectorRef } from '@angular/core';
import * as usuariosSelectors from '../../store/usuarios/usuarios.selectors';
import { Subscription } from 'rxjs/internal/Subscription';
import { AccionesUsuariosComponent } from '../modals/usuarios-modals/acciones-usuarios/acciones-usuarios.component';

@Component({
  selector: 'app-dashboard-usuarios',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './dashboard-usuarios.component.html',
  styleUrl: './dashboard-usuarios.component.scss'
})
export class DashboardUsuariosComponent {
    constructor(private store: Store<AppState>, private dialog: MatDialog , private cdr: ChangeDetectorRef) { }

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'id', 'rol', 'acciones'];
    public usuariosSubscriber!: Subscription;
    public usuarios: Usuario[] = [];


  ngOnInit() {
    // Aquí puedes cargar los usuarios desde el store o un servicio
    this.usuariosSubscriber = this.store.select(usuariosSelectors.selectUsuarios).subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  editarUsuario(usuario: Usuario) {
    // Implementa la lógica para editar el usuario
    this.dialog.open(AccionesUsuariosComponent, {
      data: { usuario }
    });
  }

  ngOnDestroy(): void {
    this.usuariosSubscriber?.unsubscribe();
  }

}
