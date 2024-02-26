import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {UsersApiService} from "../../../../services/users-api.service";
import {usersActions} from "./users.actions";
import {switchMap, map, tap, take, catchError} from "rxjs/operators";
import {LocalStorageService} from "../../../../services/local-storage.service";
import {of} from 'rxjs'

export const loadUsers$ = createEffect(
  (actions$ = inject(Actions), api = inject(UsersApiService), localStorageApi = inject(LocalStorageService)) => actions$.pipe(
    ofType(usersActions.loadUsers),
    switchMap(() => {
      const users = localStorageApi.getUsers()
      if (users.length) {
        return of(usersActions.loadUsersSuccess({users}))
      } else {
        return api.getUsers().pipe(
          tap(data => localStorageApi.saveUsers(data)),
          take(1),
          map((value) => usersActions.loadUsersSuccess({users: value})),
          catchError(error => {
            return of(usersActions.loadUsersError({error}))
          })
        )
      }
    })
  ), {functional: true}
)

export const addUser$ = createEffect(
  (actions$ = inject(Actions), api = inject(UsersApiService), localStorageApi = inject(LocalStorageService)) => actions$.pipe(
    ofType(usersActions.addUser),
    switchMap(({newUserInfo}) =>
      localStorageApi.addUser(newUserInfo).pipe(
        map(value => usersActions.addUserSuccess({newUser: value})),
        catchError(error => {
          return of(usersActions.addUserError({error}))
        })
      )
    )
  ), {functional: true}
)

export const updateUser$ = createEffect(
  (actions$ = inject(Actions), localStorageApi = inject(LocalStorageService)) => actions$.pipe(
    ofType(usersActions.updateUser),
    switchMap(({userInfo}) =>
      localStorageApi.updateUser(userInfo).pipe(
        map(userInfo => usersActions.updateUserSuccess({userInfo: userInfo})),
        catchError(error => {
          return of(usersActions.updateUserError({error}))
        })
      )
    )
  ), {functional: true}
)

export const deleteUser$ = createEffect(
  (actions$ = inject(Actions), localStorageApi = inject(LocalStorageService)) => actions$.pipe(
    ofType(usersActions.deleteUser),
    switchMap(({userId}) =>
      localStorageApi.deleteUser(userId).pipe(
        map(id => usersActions.deleteUserSuccess({id: id})),
        catchError(error => {
          return of(usersActions.deleteUserError({error}))
        })
      )
    )
  ), {functional: true}
)

