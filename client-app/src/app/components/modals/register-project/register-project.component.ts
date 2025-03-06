import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-project',
  standalone: true,
  imports: [],
  templateUrl: './register-project.component.html',
  styleUrl: './register-project.component.scss'
})
export class RegisterProjectComponent {
    constructor(private dialog: MatDialog){}
    public closeModal(){
      this.dialog.closeAll();
    }

    public saveTool(){
      // Save tool to database
      this.closeModal();
    }
}
