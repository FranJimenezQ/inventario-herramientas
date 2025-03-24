import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { Store, select } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // userId: string = '';
  // password: string = '';
  loading: Observable<boolean>;
  error: Observable<string | null>;
  userIdControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10)]});
  passwordControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10)] });


  constructor(private store: Store<{auth: AuthState}> ) {
    this.loading = this.store.pipe(select(state => state.auth.loading));
    this.error = this.store.pipe(select(state => state.auth.error));
   }

   login(): void {
     if (this.userIdControl.invalid || this.passwordControl.invalid) {
      this.store.dispatch(login({ userId: this.userIdControl.value ?? '', password: this.passwordControl.value ?? ''}));
     }
   }
}
