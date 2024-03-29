import { Injectable, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import {  URL_SOCKET } from '../../constant/constantsystem';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService{

  private socket!: Socket;
  constructor(private service: ApiService) {  
    this.socket = io(URL_SOCKET, {
      extraHeaders: {
        Authorization: `Bearer ${this.service.GetToken()}`
      }
    });
    this.connect();
  }
  connect(){
    
    this.socket.on("connect", () => {
      console.log('Connected to WebSocket');
      return;
    });
    console.log('Connect to WebSocket Failed');
  }

  createGroup(groupDetails: any): void {
    this.socket.emit('create_group', groupDetails);
  }
  
  receiveGroupCreated():Observable<any>  {
    return new Observable<any>((observer) =>{
      this.socket.on('group_created', (data) => {
        if(this.service.GetUserId() === data.host)
        observer.next(data);
      });
    })
  }
  
  findGroup(groupId: string): void {
      this.socket.emit('find_group', { groupId });
  }

  receiveGroupFound(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('request_group', (data) => {
        console.log("Nhận yêu cầu vào: " + data);
        observer.next(data);
      });
    });
  }

  sendMessage(messageDetails: any): void {
    this.socket.emit('text_message', messageDetails);
  }
  
  receiveNewMessage() {
    return new Observable<any>((observer) => {
      this.socket.on('new_message', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  receiveUpdateMessage() {
    return new Observable<any>((observer) => {
      this.socket.on('edited_message', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  receiveDeleteMessage() {
    return new Observable<any>((observer) => {
      this.socket.on('deleted_message', (data) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  deleteMessage(groupId: string, messId: string) {
    const deleteData = {
      group_id: groupId,
      message_id: messId,
    };
    this.socket.emit('delete_message', deleteData);
  }

  LeaveGroup(group_id: string, member_id: string){
    const leaveData = {
      group_id: group_id,
      member_id: member_id,
    };
    this.socket.emit('leave_group', leaveData);
    
  }
}
