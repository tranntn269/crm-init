import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private dataUrl = 'data/user.json';
  public currentUser = toSignal(this.getUserInfo());
  // public currentUser = signal<User | null>({
  //   username: 'Sarah Smith',
  //   roles: ['STAFF', 'TESTER'],
  //   departments: ['TECH'],
  // });

  getUserInfo(): Observable<User> {
    return this.http
      .get<User>(this.dataUrl)
      .pipe(tap((user) => console.log('Fetched user info:', user)));
  }
}
