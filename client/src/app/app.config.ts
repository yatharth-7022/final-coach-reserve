import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig: AppConfig = {
  apiUrl: 'https://final-coach-reserve-client.vercel.app/api',
};
