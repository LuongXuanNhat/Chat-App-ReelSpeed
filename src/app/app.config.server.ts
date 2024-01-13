import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ApiService } from './ApiService/api.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ApiService,
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
