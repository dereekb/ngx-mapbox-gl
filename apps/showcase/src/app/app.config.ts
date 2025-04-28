import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideMapboxGL } from 'ngx-mapbox-gl';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideMapboxGL({
      accessToken:
        'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNtOWVjamJvYzE0bnMya3NjMGtlYzB2cjUifQ.15RQ3pM0Tmw9hWgYMITbDw',
    }),
  ],
};
