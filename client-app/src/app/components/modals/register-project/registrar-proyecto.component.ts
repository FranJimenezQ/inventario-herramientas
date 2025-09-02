import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-project',
  standalone: true,
  imports: [],
  templateUrl: './registrar-proyecto.component.html',
  styleUrl: './registrar-proyecto.component.scss'
})
export class RegistrarProyectoComponent {
    constructor(private dialog: MatDialog){}
    public closeModal(){
      this.dialog.closeAll();
    }

    public saveTool(){
      // Save tool to database
      this.closeModal();
    }
}
