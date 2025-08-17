import { Component } from '@angular/core';
import { RegisterToolComponent } from '../modals/register-tool/register-tool.component';
import { RegisterUserComponent } from '../modals/register-user/register-user.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterProjectComponent } from '../modals/register-project/register-project.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RegisterUserComponent, RegisterToolComponent, RegisterProjectComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private dialog : MatDialog){}

  public createToolModal(){
    this.dialog.open( RegisterToolComponent)
  }

  public createProjectModal(){
    this.dialog.open( RegisterProjectComponent)
  }

}
