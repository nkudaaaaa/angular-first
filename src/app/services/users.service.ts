import { Injectable } from '@angular/core';
import {BehaviorSubject, delay} from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserInterface } from "../interfaces/user.interface";
import { UsersApiService } from "./users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly localStorageKey = 'usersData';
  private readonly usersSubject$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private initialLength: number = 0;

  constructor(private api: UsersApiService) {
    const storedUsers = this.loadUsersFromLocalStorage();
    if (storedUsers && storedUsers.length > 0) {
      this.usersSubject$.next(storedUsers);
    } else {
      this.loadUsers();
    }
  }

  private loadUsers(): void {
    this.api.getUsers().pipe(
      tap((users: UserInterface[]) => {
        this.usersSubject$.next(users);
        this.initialLength = users.length;
        this.saveUsersToLocalStorage(users);
      }),
      delay(1000)
    ).subscribe();
  }

  deleteUser(userId: number): void {
    const users: UserInterface[] = this.usersSubject$.getValue();
    this.usersSubject$.next(users.filter(user => user.id !== userId));
    this.updateLocalStorage();
  }

  addUser(newUserInfo: UserInterface) {
    this.usersSubject$.next([...this.usersSubject$.value, newUserInfo]);
    this.updateLocalStorage();
  }

  editUser(userInfo: UserInterface) {
    const updatedUsers = this.usersSubject$.value.map(user => {
      if (user.id === userInfo.id) {
        return userInfo;
      }
      return user;
    });
    this.usersSubject$.next(updatedUsers);
    this.updateLocalStorage();
  }

  loadUsersFromLocalStorage(): UserInterface[] | null {
    const usersData = localStorage.getItem(this.localStorageKey);
    if (usersData) {
      const users: UserInterface[] = JSON.parse(usersData);
      this.initialLength = users.length;
      return users;
    }
    return null;
  }

  private saveUsersToLocalStorage(users: UserInterface[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  private updateLocalStorage(): void {
    this.saveUsersToLocalStorage(this.usersSubject$.getValue());
  }
}
