import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';
import {usersFeatureKey} from "./users.reducer";


export const selectUsersState = createFeatureSelector<UsersState>(usersFeatureKey);

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectStatus = createSelector(
  selectUsersState,
  (state) => state.status
)
