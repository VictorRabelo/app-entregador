import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Locale PT-BR
import localePtBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePtBR);

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from '@app/pages/restricted/layout/layout.module';
import { UtilModule } from './util/util.module';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Helpers
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HttpProgressInterceptor } from './helpers/http-progress.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

// Ngx
import { NgxIziToastModule } from 'ngx-izitoast';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

// PrimeNG
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Ng2
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Ng Bootstrap
import { NgbButtonsModule, NgbDropdownModule, NgbModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Material Angular
import { MatStepperModule, MatTabsModule, MatButtonModule, MatIconModule } from '@angular/material';

// State of application - Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './core/reducers';
import { authReducer } from './core/reducers/auth.reducers';
import { AuthEffects } from './core/effects/auth.effect';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    ComponentsModule,
    UtilModule,
    LayoutModule,
    
    ToastModule,
    RippleModule,
    FileUploadModule,
    
    ProgressSpinnerModule,
    
    Ng2SearchPipeModule,
    
    NgxIziToastModule,
    NgxSpinnerModule,
    
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,

    NgbModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,

    NgxMaskModule.forRoot(),
    
    StoreModule.forRoot(reducers, { 
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forRoot([AuthEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  // RxJS_Services,{ provide: HTTP_INTERCEPTORS, useClass: HTTPListener, multi: true }
