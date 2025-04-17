import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterForm } from '../../models/register-form.model'

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class RegisterComponent implements OnInit {
  form: FormGroup<RegisterForm>;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(<RegisterForm>{
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required)
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    (this.form.get('confirmPassword') as FormControl<string>)?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.markAsTouched();
    });
  }

  passwordMatchValidator(group: FormGroup<RegisterForm>) {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erro ao cadastrar usuário.';
      }
    });
  }
}
