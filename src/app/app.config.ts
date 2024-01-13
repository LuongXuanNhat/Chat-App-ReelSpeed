import { ApplicationConfig, } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './authen/http/auth.interceptor';
import { errorInterceptor } from './authen/http/error.interceptor';
import { ApiService } from './ApiService/api.service';
import { SocketService } from './ApiService/socket.service';

export const appConfig: ApplicationConfig = {
  providers: [
    SocketService,
    ApiService,
    provideRouter(routes), 
    provideHttpClient(  
      withFetch(), 
      withInterceptors([
        authInterceptor
    ],), ),
    provideAnimations(), 
    provideToastr({
      timeOut: 1500,
      positionClass: 'custom-toast', 
      closeButton: true,
      
    }),
    
  ],
};
