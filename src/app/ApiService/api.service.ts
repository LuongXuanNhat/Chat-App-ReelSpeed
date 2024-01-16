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
  
  FindGroup(roomId: string) {
    return this.http.get( URL_API + 'chat/find-group/' + roomId);
  }
  GetUserId() {
    return this.Decode().userId;
  }
  SetGroupId(groupId: any) {
    sessionStorage.setItem('group_id', groupId);
  }
  GetGroupId(){
    return sessionStorage.getItem('group_id') ?? '';
  }
  RemoveGroupId(){
    sessionStorage.removeItem('group_id');
  }

  GetGroupInfo(group_id: any){
    return this.http.get( URL_API + 'chat/get-group-info/'+group_id);
  }

  GetUserGroup(group_id: string) {
    return this.http.get( URL_API + 'chat/get-group-users/'+group_id)
  }

  async UpdateUser(value: any) {
    return await this.http.patch(URL_API + 'user/update-me', value);
  }
  constructor(private http: HttpClient ){
    
  }


  SetOldPath(url: string) {
    sessionStorage.setItem('old_url', url);
  }
  GetOldPath(){
    return sessionStorage.getItem('old_url') ?? '';
  }
  RemoveOldPath(){
    sessionStorage.removeItem('old_url');
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
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null) {
        return true;
    } else {
        return false;
    }
  }

  LeaveGroup(groupId: string, memberId: string){
    
  }

}
