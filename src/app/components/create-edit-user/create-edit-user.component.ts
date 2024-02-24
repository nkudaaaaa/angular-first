import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from "@angular/material/dialog";
import {User} from "../../interfaces/user.interface";
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
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, userInfo?: User },
    private dialogRef: MatDialogRef<CreateEditUserComponent>
  ) {
    console.log(data.userInfo+'qqqqaqaq')
    this.userForm = this.fb.group({
      id: data.userInfo?.id || 0,
      name: data.userInfo?.name || '',
      company: data.userInfo?.company.name || '',
      street: data.userInfo?.address.street || '',
      website: data.userInfo?.website || ''
    });

    this.isEdit = this.data.isEdit
  }

  saveUser(): void {
    this.dialogRef.close(this.userForm.value)
  }
}
