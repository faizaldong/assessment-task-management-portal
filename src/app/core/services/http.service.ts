import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly #baseUrl = 'assets/mock/data.json';

  constructor(private readonly http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.#baseUrl);
  }
}