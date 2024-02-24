import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from "../interfaces/user.interface";
import {UsersApiService} from "./users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly localStorageKey = 'usersData';
  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private initialLength = 0

  constructor(private api: UsersApiService) {}

  loadUsers(): Observable<User[]> {
    const storedUsers: User[] = this.loadUsersFromLocalStorage();
    if (storedUsers.length) {
      this.usersSubject$.next(storedUsers);
    } else {
      this.api.getUsers().pipe(
        tap((users: User[]) => {
          this.usersSubject$.next(users);
          this.initialLength = users.length;
          this.saveUsersToLocalStorage(users);
        })
      )
    }
    return this.users$;
  }

  deleteUser(userId: number): void {
    const users: User[] = this.usersSubject$.value;
    this.usersSubject$.next(users.filter(user => user.id !== userId));
    this.updateLocalStorage();
  }

  addUser(newUserInfo: User): void {
    this.usersSubject$.next([...this.usersSubject$.value, newUserInfo]);
    this.updateLocalStorage();
  }

  editUser(userInfo: User): void {
    const updatedUsers: User[] = this.usersSubject$.value.map(user => {
      if (user.id === userInfo.id) {
        return userInfo;
      }
      return user;
    });
    this.usersSubject$.next(updatedUsers);
    this.updateLocalStorage();
  }

  loadUsersFromLocalStorage(): User[] {
    const usersData = localStorage.getItem(this.localStorageKey);
    if (usersData) {
      const users: User[] = JSON.parse(usersData);
      this.initialLength = users.length;
      return users;
    }
    return [];
  }

  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  private updateLocalStorage(): void {
    this.saveUsersToLocalStorage(this.usersSubject$.getValue());
  }
}
