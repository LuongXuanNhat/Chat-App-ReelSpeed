import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenComponent } from '../authen/authen.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SocketService } from '../ApiService/socket.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateGroupComponent } from './create-group/create-group.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule,
     CommonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy{
  groupName!: string;
  publicGroup!: boolean;

  groupCreated: boolean = false;
  groupId!: string;
  messages: any[] = [];

  private groupFoundSubscription!: Subscription;
  roomId: string = '';
  waiting!: boolean;

  constructor(private service: ApiService, private toastr: ToastrService, private router: Router, 
    private dialog: MatDialog, private socket: SocketService, private builder: FormBuilder){
    this.waiting = false;
  }
  ngOnInit(): void {
    this.groupFoundSubscription = this.socket.receiveGroupFound().subscribe((data) => {
      this.messages.push(data); 
    });
  }
  async Find() {
    if(await this.service.isAuthenticated()){
      // if(this.roomId.trim()){
      //   this.waiting = !this.waiting;
      //   (await this.service.FindGroup(this.roomId)).subscribe(
      //     (data: any) => {
      //       if(data.isSuccessed){
    
      //       } else {
      //         this.toastr.error("Lỗi: " + data.message);
      //       }
      //     }, (error: any) => {
      //       this.toastr.error("Lỗi: "+ error);
      //     }
      //   )
      // }
      this.toastr.info("Không tìm thấy phòng");
      return;
    }
      
    this.toastr.info("Hãy đăng nhập trước khi vào phòng");
    this.login();
  }
  async createGroup() {
    if(await this.service.isAuthenticated()){
      this.dialog.open(CreateGroupComponent, {
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '600ms',
        width: '30%',
        height: '50%',
        minWidth: '300px',
        minHeight: '380px'
      });
    } else {
      this.toastr.info("Hãy đăng nhập trước khi tạo phòng");
      this.login();
    }
  }
  GetWaiting(): boolean {
    return this.waiting;
  }
  login() {
    this.dialog.open(AuthenComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '600ms',
      width: '30%',
      height: '53%',
      minWidth: '300px',
      minHeight: '300px'
    });
  }


  ngOnDestroy(): void {
    this.groupFoundSubscription.unsubscribe();
  }
}
