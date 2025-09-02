import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { cargarHerramientas } from '../../store/herramientas/herramientas.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor( private router: Router, private store: Store ) { }

  public mostrarTitulo: boolean = true;
  public mostrarTituloSubscriber!: Subscription;

  ngOnInit(): void {
    this.mostrarTituloSubscriber = this.router.events.subscribe(() => {
      this.mostrarTitulo = this.router.url === '/dashboard';
      console.log(this.mostrarTitulo);
    });
    this.mostrarTitulo = this.router.url === '/dashboard';

        this.store.dispatch(cargarHerramientas());
        //this.store.dispatch(cargarUsuarios());
    }



  ngOnDestroy(): void {
    this.mostrarTituloSubscriber?.unsubscribe();
  }
}
