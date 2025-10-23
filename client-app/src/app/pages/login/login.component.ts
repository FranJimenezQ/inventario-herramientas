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
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgIf],
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
  selectTokenErrorSubscriber!: Subscription;
  loginForm: FormGroup<any>;
  minlength!: 4;
  mensageExitoLogin: string = '';

  constructor(private store: Store<{auth: AuthState}> ) {
    this.loading = this.store.pipe(select(state => state.auth.loading));
    this.error = this.store.pipe(select(state => state.auth.error));

    this.emailControl.setValidators([Validators.required, this.emailFormatValidator]);
    this.passwordControl.setValidators([Validators.required, Validators.minLength(5)]);
    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });

    this.selectTokenSubscriber = this.store.pipe(select(selectToken)).subscribe(token => {
      if (token) {
        this.mensageExitoLogin = 'Login exitoso';
        setTimeout(() => {
          this.Router.navigate(['/dashboard']);
        }, 1500);
      }else {
        this.passwordControl.setErrors({ invalidToken: true });
      }
    });

    this.selectTokenErrorSubscriber = this.store.pipe(select(state => state.auth.error)).subscribe(error => {
      if (error) {
        this.passwordControl.setErrors({ invalidToken: true });
      }
    });

   }

   //Email format validator
   emailFormatValidator(control: FormControl): { [key: string]: boolean } | null {
     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailPattern.test(control.value) ? null : { invalidEmail: true };
   }

   login(): void {
     if (this.emailControl.valid && this.passwordControl.valid) {
      this.store.dispatch(login({ email: this.loginForm.value.email ?? '', password: this.loginForm.value.password ?? ''}));
     }else{
      return
     }
   }

   ngOnDestroy(): void {
     this.selectTokenSubscriber?.unsubscribe();
      this.selectTokenErrorSubscriber?.unsubscribe();
   }
}
