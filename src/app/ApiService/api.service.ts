import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { URL_API } from '../../constant/constantsystem';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService{
  async UpdateUser(value: any) {
    return await this.http.patch(URL_API + 'user/update-me', value);
  }
  constructor(private http: HttpClient ){
    
  }


  SetOldPath(url: string) {
    localStorage.setItem('old_url', url);
  }
  GetOldPath(){
    return localStorage.getItem('old_url') ?? '';
  }
  async UpdateAvatar(avatar: FormData): Promise<Observable<any>> {
    return await this.http.post(URL_API + 'user/update-avatar/', avatar);
  }
  async GetUserInfor() {
    return await this.http.get(URL_API + 'user/get-me');
  }
  GetEmail(): string  {
    return localStorage.getItem('email') ?? '';
  }
  Logout() {
    localStorage.clear();
  }
  SetEmail(email: string){
    localStorage.setItem('email', email);
  }
  async SetToken(token: string) {
    await localStorage.setItem('token', token);
  }
  GetToken(){
    return localStorage.getItem('token') ?? '';
  }
  Decode() {
    const jwt = this.GetToken();
    try {
      const decoded: any = jwtDecode(jwt);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  async Login(data: any) {
    return await this.http.post(URL_API + 'auth/login', data);
  }

  GetApi(){
    return URL_API;
  }

  async Register(data: any) {
    return await this.http.post(URL_API + 'auth/register', data);
  }
  async ConfirmEmail(data: any) {
    return await this.http.post(URL_API + 'auth/verify', data);
  }
  isAuthenticated(){
    if (localStorage.getItem('token') !== null) {
        return true;
    } else {
        return false;
    }
  }
}
