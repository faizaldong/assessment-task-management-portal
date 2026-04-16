import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  login(username: string, password: string): Observable<User | null> {
    return this.httpService.getData().pipe(
      map(data => {
        const user = data.auth.users.find(
          (u: User) => u.username === username && u.password === password
        );
        return user || null;
      })
    );
  }
}