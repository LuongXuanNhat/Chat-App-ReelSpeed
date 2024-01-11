import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { URL_SOCKET } from '../../constant/constantsystem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(URL_SOCKET); 
  }

  createGroup(groupDetails: any): void {
      this.socket.emit('create_group', groupDetails);
  }
  
  // Example method to listen for a "group_created" event
  receiveGroupCreated(): Observable<any> {
  return new Observable<any>((observer) => {
      this.socket.on('group_created', (data) => {
      observer.next(data);
      });
  });
  }
  
  // Example method to emit a "find_group" event
  findGroup(groupId: string): void {
      this.socket.emit('find_group', { groupId });
  }

  // Example method to listen for a "group_found" event
  receiveGroupFound(): Observable<any> {
  return new Observable<any>((observer) => {
      this.socket.on('group_found', (data) => {
      observer.next(data);
      });
  });
  }
  
  // Continue adding methods for other events as needed
  
  // Example method to emit a "text_message" event
  sendMessage(messageDetails: { message: string, group_id: string, from: string, type: string }): void {
  this.socket.emit('text_message', messageDetails);
  }

  // Example method to listen for a "new_message" event
  receiveNewMessage(): Observable<any> {
  return new Observable<any>((observer) => {
      this.socket.on('new_message', (data) => {
      observer.next(data);
      });
  });
  }
}
