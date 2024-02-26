import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../../../interfaces/user.interface";

export const usersActions = createActionGroup({
  source: 'users',
  events: {
    loadUsers: emptyProps(),
    deleteUser: props<{ userId: number }>(),
    updateUser: props<{ userInfo: User }>(),
    addUser: props<{ newUserInfo: User }>(),

    loadUsersSuccess: props<{ users: User[] }>(),
    deleteUserSuccess: props<{ id: number }>(),
    updateUserSuccess: props<{ userInfo: User }>(),
    addUserSuccess: props<{ newUser: User }>(),

    loadUsersError: props<{ error: Error }>(),
    deleteUserError: props<{ error: Error }>(),
    updateUserError: props<{ error: Error }>(),
    addUserError: props<{ error: Error }>(),
  }
});

