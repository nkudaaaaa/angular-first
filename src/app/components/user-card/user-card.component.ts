import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInterface} from "../../interfaces/user.interface";
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

  @Input() user!: UserInterface

  @Output() onEdited: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteUserEvent: EventEmitter<number> = new EventEmitter<number>();

  deleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

  onEdit(): void {
    this.onEdited.emit(this.user.id)
  }

}
