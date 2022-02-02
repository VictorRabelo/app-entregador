// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, UserLoaded, UserRequested } from '../actions/auth.action';
import { AuthService } from '@app/services/auth.service';
import { AppState } from '../reducers';
import { environment } from '../../../environments/environment';
import { isUserLoaded } from '../selectors/auth.selector';
@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    tap(action => {
      localStorage.setItem(environment.authTokenKey, action.payload.token);
      localStorage.setItem(environment.authTokenKeyCdi, action.payload.tokenApi);
      this.store.dispatch(new UserRequested());
    }),
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      this.removeStorage();
      this.router.navigate(['/signin'], { queryParams: { returnUrl: this.returnUrl } });
    })
  );

  @Effect({ dispatch: false })
  loadUser$ = this.actions$
    .pipe(
      ofType<UserRequested>(AuthActionTypes.UserRequested),
      withLatestFrom(this.store.pipe(select(isUserLoaded))),
      filter(([action, _isUserLoaded]) => !_isUserLoaded),
      mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
      tap(_user => {
        if (_user) {
          this.store.dispatch(new UserLoaded({ user: _user }));
        } else {
          this.store.dispatch(new Logout());
        }
      })
    );

  @Effect()
  init$: Observable<Action> = defer(() => {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let observableResult = of({ type: 'NO_ACTION' });
    if (userToken) {
      const tokenApi = localStorage.getItem(environment.authTokenKeyCdi);
      observableResult = of(new Login({ token: userToken, tokenApi: tokenApi }));
    }
    return observableResult;
  });

  private returnUrl: string;

  constructor(private actions$: Actions,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  removeStorage(): void {
    localStorage.clear();
  }
}
