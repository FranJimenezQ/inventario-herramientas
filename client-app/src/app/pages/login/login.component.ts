import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { Store, select } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectToken } from '../../store/auth/auth.selectors';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public readonly Router = inject(Router);
  // userId: string = '';
  // password: string = '';
  loading: Observable<boolean>;
  error: Observable<string | null>;
  emailControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10)]});
  passwordControl = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(5)] });
  selectTokenSubscriber!: Subscription;
  loginForm: FormGroup<any>;

  constructor(private store: Store<{auth: AuthState}> ) {
    this.loading = this.store.pipe(select(state => state.auth.loading));
    this.error = this.store.pipe(select(state => state.auth.error));

    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });

    this.selectTokenSubscriber = this.store.pipe(select(selectToken)).subscribe(token => {
      if (token) {
        console.log(token);

        this.Router.navigate(['/dashboard']);
      }else {
        console.log('No hay token');
      }
    });

   }

   login(): void {
     if (this.emailControl.valid && this.passwordControl.valid) {
      console.log(this.loginForm.value);

      this.store.dispatch(login({ email: this.loginForm.value.email ?? '', password: this.loginForm.value.password ?? ''}));
     }else{
      console.log('No son válidos los campos', this.loginForm.get('email')?.errors, this.loginForm.get('password')?.errors);

      return
     }
   }
}
