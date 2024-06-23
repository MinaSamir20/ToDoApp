import { ToDo } from './../Models/to-do';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  saveDataLocally(data: ToDo): void {
    const existingData: ToDo[] = JSON.parse(localStorage.getItem('offlineTodos') || '[]');
    existingData.push(data);
    localStorage.setItem('offlineTodos', JSON.stringify(existingData as ToDo[]));
    console.log('Data saved locally');
  }

  async syncData(apiUrl: string): Promise<void> {
    const offlineData: any = JSON.parse(localStorage.getItem('offlineTodos') || '[]');
    if (offlineData.length > 0) {
      try {
        await this.http.post(apiUrl, offlineData).toPromise();
        localStorage.removeItem('offlineTodos');
        console.log('Data synchronized with server');
      } catch (error) {
        console.error('Error synchronizing data with server', error);
      }
    }
  }

  getLocalData(): ToDo[] {
    return JSON.parse(localStorage.getItem('offlineTodos') || '[]') as ToDo[];
  }






  getToDoList(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }
  getTodoById(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(`${this.apiUrl}/${id}`);
  }
  createToDo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, JSON.stringify(todo));
  }
  updateTodo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.apiUrl}/${todo.id}`, todo);
  }
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
