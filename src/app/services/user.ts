import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private dataUrl = 'data/user.json';
  public currentUser = signal<User | null>(null);

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.dataUrl).pipe(tap((user) => this.currentUser.set(user)));
  }
}
