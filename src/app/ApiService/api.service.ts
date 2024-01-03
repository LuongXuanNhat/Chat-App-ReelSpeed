import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async Login(data: any) {
    return await this.http.post(this.url_api + 'users', data);
  }
  url_api = '';

  constructor(private http: HttpClient){
    
  }

  GetApi(){
    return this.url_api;
  }

  async Register(data: any) {
    return await this.http.post(this.url_api + 'users', data);
  }

  isAuthenticated(): boolean {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('id') !== null) {
        return true;
    } else {
        return false;
    }
  }
}
