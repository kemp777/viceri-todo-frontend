import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.css' ],
  imports: [ CommonModule, RouterLink, NavbarComponent ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => this.tasks = data,
      error: (err) => this.error = err.error?.error || 'Erro ao carregar tarefas'
    });
  }

  markAsDone(taskId: string): void {
    this.taskService.markAsDone(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      },
      error: (err) => {
        this.error = err.error?.error || 'Erro ao marcar tarefa como concluída.';
      }
    });
  }
}
