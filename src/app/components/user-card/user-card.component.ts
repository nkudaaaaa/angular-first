import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  standalone: true,
  imports: [
    MatButton
  ],
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  constructor() {
  }

  @Input({required: true}) user!: User

  @Output() onEdited = new EventEmitter<number>();
  @Output() deleteUserEvent = new EventEmitter<number>();

  deleteUser(id: number): void {
    this.deleteUserEvent.emit(id);
  }

  onEdit(id: number): void {
    this.onEdited.emit(id)
  }

}
