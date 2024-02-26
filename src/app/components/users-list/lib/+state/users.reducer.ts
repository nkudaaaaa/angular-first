import {createFeature, createReducer, on} from '@ngrx/store';
import {User} from "../../../../interfaces/user.interface";
import {usersActions} from "./users.actions";
import {LoadingStatus} from "../loading-status.type";

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[],
  status: LoadingStatus,
  error: any | null
}

export const initialState: UsersState = {
  users: [],
  status: "init",
  error: null
}

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(usersActions.loadUsers, state => ({
      ...state,
      status: "loading" as const
    })),
    on(usersActions.loadUsersSuccess, (state, {users}) => ({
      ...state,
      users: users,
      status: 'loaded-successfully' as const
    })),
    on(usersActions.loadUsersError, (state, {error}) => {
      console.log((error.message));
      return {
        ...state,
        error: error.message
      }
    }),

    on(usersActions.addUserSuccess, (state, {newUser}) => {
      const lastUserId = state.users.length > 0 ? state.users[state.users.length - 1].id : 0;
      const updatedUser = {...newUser, id: lastUserId + 1};
      return {...state, users: [...state.users, updatedUser]}
    }),
    on(usersActions.addUserError, (state, {error}) => {
      console.log((error.message));
      return {
        ...state,
        error: error.message
      }
    }),

    on(usersActions.updateUserSuccess, (state, {userInfo}) => {
      const updatedUsers: User[] = state.users.map(user => {
        if (user.id === userInfo.id) {
          return userInfo
        }
        return user;
      });
      return {...state, users: updatedUsers}
    }),
    on(usersActions.updateUserError, (state, {error}) => {
      console.log((error.message));
      return {
        ...state,
        error: error.message
      }
    }),

    on(usersActions.deleteUserSuccess, (state, {id}) => ({
      ...state,
      users: state.users.filter(user => user.id !== id)
    })),
    on(usersActions.deleteUserError, (state, {error}) => {
      console.log((error.message));
      return {
        ...state,
        error: error.message
      }
    })
  )
});
