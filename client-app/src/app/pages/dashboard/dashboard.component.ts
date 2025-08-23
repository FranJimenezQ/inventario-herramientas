import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor( private router: Router) { }

  public mostrarTitulo: boolean = true;

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.mostrarTitulo = this.router.url === '/dashboard';
      console.log(this.mostrarTitulo);
    });
  }

}
