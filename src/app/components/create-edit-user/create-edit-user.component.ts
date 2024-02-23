import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from "@angular/material/dialog";
import {UserInterface} from "../../interfaces/user.interface";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
  ],
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent {
  userForm: FormGroup;
  isEdit: boolean

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, userInfo: UserInterface },
    private dialogRef: MatDialogRef<CreateEditUserComponent>
  ) {
    if (data.userInfo) {
      this.userForm = this.fb.group({
        id: data.userInfo.id,
        name: data.userInfo.name,
        company: data.userInfo.company.name,
        street: data.userInfo.address.street,
        website: data.userInfo.website
      });
    } else {
      this.userForm = this.fb.group({
        id: 0,
        name: [''],
        company: [''],
        street: [''],
        website: ['']
      });
    }

    this.isEdit = this.data.isEdit
    if (this.data && this.data.userInfo?.name) {
      this.userForm.patchValue(this.data);
    }
  }

  saveUser() {
    const userData = this.userForm.value;
    this.dialogRef.close(userData)
  }
}
