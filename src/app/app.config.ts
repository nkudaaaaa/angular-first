;
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";
import {provideStore} from "@ngrx/store";
import {usersFeature} from "./components/users-list/lib";
import {usersEffect} from './components/users-list/lib'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(), provideHttpClient(withFetch()),
    provideEffects(usersEffect),
    provideStore({
      ['users']: usersFeature.reducer
    }),
    provideStoreDevtools(
      {
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75
      })
  ],

};
