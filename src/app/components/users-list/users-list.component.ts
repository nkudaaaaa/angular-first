import {Component} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../../interfaces/user.interface";
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe} from "@angular/common";
import {tap} from "rxjs/operators";

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
export class UsersListComponent {

  constructor(public usersService: UsersService, private dialog: MatDialog) {
    this.usersService.loadUsers()
  }

  openCreateEditUserDialog(isEdit: boolean, user?: User): void {
    const userInfo = user // без переменной почему-то всегда undefined передается
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '265px',
      data: {isEdit, userInfo}
    });

    dialogRef.afterClosed().pipe(
      tap(result => {
        if (result) {
          const data: User = {
            ...result,
            address: {street: result.street},
            company: {name: result.company}
          }
          isEdit ? this.usersService.editUser(data) : this.usersService.addUser(data);
        }
      })).subscribe();
  }

  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId);
  }
}
