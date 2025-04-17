import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { LoginForm } from '../../models/login-form.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
})
export class LoginComponent {
  form: FormGroup<LoginForm>;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(<LoginForm>{
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Falha no login';
      }
    });
  }
}
