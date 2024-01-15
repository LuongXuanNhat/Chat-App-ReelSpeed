import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../ApiService/socket.service';
import { Router } from '@angular/router';
import { GroupInfo, Message } from '../../model/model';
import { ClipboardService } from 'ngx-clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule,
           MatTooltipModule, CommonModule, ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy{

  group!: GroupInfo;
  createMessageSubscription!: Subscription;
  updateMessageSubscription!: Subscription;
  deleteMessageSubscription!: Subscription;
  chatform = this.builder.group({
    groupId: this.builder.control('', [Validators.required]),
    from: this.builder.control('', [Validators.required]),
    type: this.builder.control('', [Validators.required]),
    message: this.builder.control('', [Validators.required]),
  });

  constructor(private service: ApiService, private builder: FormBuilder, private socket: SocketService, private toastr: ToastrService,
    private router: Router, private clipboardService: ClipboardService){
      this.GetGroupInfor();
  }

  ngOnInit(): void {
    this.createMessageSubscription = this.socket.receiveNewMessage().subscribe((data) => {
      this.group.messages.push(data.message);
    });
    this.updateMessageSubscription = this.socket.receiveUpdateMessage().subscribe((data) => {
      this.UpdateMessage(data.message);
    });
    this.deleteMessageSubscription = this.socket.receiveDeleteMessage().subscribe((data) => {
      this.DeleteMessage(data.message_id);
    });
  }
  ngOnDestroy(): void {
    this.createMessageSubscription.unsubscribe();
    this.updateMessageSubscription.unsubscribe();
    this.deleteMessageSubscription.unsubscribe();
  }

  GetGroupInfor(){
    if(this.service.GetGroupId()){
      this.service.GetGroupInfo(this.service.GetGroupId()).subscribe(
        (data: any) => {
          if(data.status === 'success'){
            this.group = data.data;
            console.log(this.group.messages);
          } else {
            this.toastr.error(data.message, "Lỗi");
          }
        }, (error: any) => {
          this.toastr.error(error, "Lỗi");
        }
      )
    }
  }

  copyToClipboard() {
    this.clipboardService.copy(this.group.groupId);
    this.toastr.info("Đã sao chép");
  }

  send() {
    this.chatform.patchValue({
      groupId: this.group.groupId,
      from    : this.service.GetUserId(),
      type    : typeof this.chatform.value.message,
    });
    if (this.chatform.valid) {
      this.socket.sendMessage(this.chatform.value);
      this.chatform.patchValue({ message: ''});
    }
  }

  DeleteMessage(message_id: any) {
    this.group.messages = this.group.messages.filter((element) => element.sender !== message_id);
  }
  UpdateMessage(message: Message) {
    const newArray = this.group.messages.map((element) => {
      if (message.sender === element.sender) {
        return { ...element, propertyName: message.text };
      }
      return element;
    });
    this.group.messages = newArray;
  }
}
