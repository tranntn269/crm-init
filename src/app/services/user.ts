import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private dataUrl = 'data';
  public currentUser = signal<User | null>(null);

  getUserInfo(): Observable<User> {
    return this.http
      .get<User>(`${this.dataUrl}/user.json`)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  users = httpResource(() => `${this.dataUrl}/userList.json`);
}
