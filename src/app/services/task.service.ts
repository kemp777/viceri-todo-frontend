import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import {CreateTaskPayload} from '../models/create-task-payload.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(data: CreateTaskPayload): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, data);
  }

  markAsDone(id: string) {
    return this.http.patch(`${this.apiUrl}/${id}/done`, {});
  }

}
