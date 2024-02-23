import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, retry} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        delay(200),
        retry(2)
      )
  }
}
