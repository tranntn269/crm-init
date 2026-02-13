import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { PROJECT_TOKEN } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private dataUrl = 'data';
  public currentUser = signal<User | null>(null);
  PROJECT_TOKEN = PROJECT_TOKEN;
  private apiUrl = `https://${this.PROJECT_TOKEN}.mockapi.io/users`;

  getUserInfo(): Observable<User> {
    return this.http
      .get<User>(`${this.dataUrl}/user.json`)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  users = httpResource(() => `${this.dataUrl}/userList.json`);

  // getUsersList(page: number, size: number) {
  //   return httpResource<User[]>(() => ({
  //     url: this.apiUrl,
  //     params: {
  //       page: page.toString(),
  //       limit: size.toString(),
  //     },
  //     observe: 'response',
  //   }));
  // }

  getUsersList(page: () => number, size: () => number) {
    return httpResource<User[]>(() => ({
      url: this.apiUrl,
      params: {
        page: page().toString(),
        limit: size().toString(),
      },
      observe: 'response',
    }));
  }
}
