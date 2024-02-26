import {Injectable} from '@angular/core';
import {User} from "../interfaces/user.interface";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly localStorageKey = 'users';

  getUsers(): User[] {
    const usersData = localStorage.getItem(this.localStorageKey) as string;
    return JSON.parse(usersData);
  }

  saveUsers(users: User[]): Observable<User[]> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return of(users)
  }

  addUser(user: User): Observable<User> {
    const users = this.getUsers();
    const lastId = users.length > 0 ? users[users.length - 1].id + 1 : 0;
    const addUser: User = {...user, id: lastId}
    this.saveUsers([...users, addUser])
    return of(user)
  }

  deleteUser(userId: number): Observable<number> {
    const users = this.getUsers();
    const newUsers = users.filter(user => user.id !== userId)
    this.saveUsers(newUsers)
    return of(userId)
  }

  updateUser(userInfo: User): Observable<User> {
    const users = this.getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === userInfo.id) return userInfo
      return user
    })
    this.saveUsers(updatedUsers)
    return of(userInfo)
  }
}
