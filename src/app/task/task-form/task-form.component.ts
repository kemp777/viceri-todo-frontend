import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { TaskForm } from '../../models/task-form.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent]
})
export class TaskFormComponent {
  form: FormGroup<TaskForm>;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.form = this.fb.group<TaskForm>({
      description: this.fb.control<string>('', { nonNullable: true, validators: Validators.required }),
      priority: this.fb.control<'Alta' | 'Média' | 'Baixa' | 'Selecionar'>('Selecionar', { nonNullable: true, validators: Validators.required })
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.value.priority === 'Selecionar') {
      this.form.get('priority')?.markAsTouched();
      return;
    }

    const { description, priority } = this.form.getRawValue();

    this.taskService.createTask({
      description,
      priority: priority as 'Alta' | 'Média' | 'Baixa'
    }).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => this.errorMessage = err.error?.error || 'Erro ao criar tarefa'
    });
  }
}
