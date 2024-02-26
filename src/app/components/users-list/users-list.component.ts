import {Component, OnInit} from '@angular/core';
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../../interfaces/user.interface";
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe} from "@angular/common";
import {tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {selectStatus, usersActions} from "./lib";
import {selectUsers} from "./lib";
import {Observable} from "rxjs";
import {LoadingStatus} from "./lib/loading-status.type";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: true,
  imports: [
    UserCardComponent,
    MatButtonModule,
    AsyncPipe
  ],
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  users$: Observable<User[]>
  status$: Observable<LoadingStatus>

  constructor(private dialog: MatDialog, private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.status$ = this.store.select(selectStatus)
  }

  ngOnInit(): void {
    this.store.dispatch(usersActions.loadUsers());
  }

  openCreateEditUserDialog(user?: User): void {
    const userInfo = user
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '265px',
      data: {isEdit: Boolean(userInfo), userInfo}
    });
    dialogRef.afterClosed().pipe(
      tap(result => {
        if (result) {
          const data: User = {
            ...result,
            address: {street: result.street},
            company: {name: result.company}
          }
          !!userInfo ? this.store.dispatch(usersActions.updateUser({userInfo: data})) : this.store.dispatch(usersActions.addUser({newUserInfo: data}))
        }
      })).subscribe();
  }

  deleteUser(userId: number): void {
    this.store.dispatch(usersActions.deleteUser({userId}))
  }
}
