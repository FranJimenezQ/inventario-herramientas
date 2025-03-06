import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-tool',
  standalone: true,
  imports: [],
  templateUrl: './register-tool.component.html',
  styleUrl: './register-tool.component.scss'
})
export class RegisterToolComponent {

    constructor(private dialog: MatDialog){}
    public closeModal(){
      this.dialog.closeAll();
    }

    public saveTool(){
      // Save tool to database
      this.closeModal();
    }
}
