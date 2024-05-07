import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), 
    provideClientHydration(), 
    provideHttpClient(),
    ReCaptchaV3Service,
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.siteKey}]
};
