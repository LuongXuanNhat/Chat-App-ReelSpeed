import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  userId: string = '';
  group!: GroupInfo;
  createMessageSubscription!: Subscription;
  updateMessageSubscription!: Subscription;
  deleteMessageSubscription!: Subscription;
  requestIntoRoomSubscription!: Subscription;

  chatform = this.builder.group({
    groupId: this.builder.control('', [Validators.required]),
    from: this.builder.control('', [Validators.required]),
    type: this.builder.control('', [Validators.required]),
    message: this.builder.control('', [Validators.required]),
  });
  @ViewChild('messageListContainer') messageListContainer!: ElementRef;
  
  constructor(private service: ApiService, private builder: FormBuilder, private socket: SocketService, private toastr: ToastrService,
    private router: Router, private clipboardService: ClipboardService){
      this.GetGroupInfor();
      this.userId = this.service.GetUserId();
  }

  ngOnInit(): void {
    this.requestIntoRoomSubscription = this.socket.receiveGroupFound().subscribe((data) => {
      // this.RequestRoom();
      console.log(data);
      
    });

    this.createMessageSubscription = this.socket.receiveNewMessage().subscribe((data) => {
      this.group.messages.push(this.insertPath(data.message));
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });
    this.updateMessageSubscription = this.socket.receiveUpdateMessage().subscribe((data) => {
      this.UpdateMessage(data.message);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
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
            this.insertsPath();
            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          } else {
            this.toastr.error(data.message, "Lỗi");
          }
        }, (error: any) => {
          this.toastr.error(error, "Lỗi");
        }
      )
    }
  }

  insertsPath() {
    this.group.messages.forEach(element => {
      if(element.avatar){
        element.avatar = this.service.GetApi() + element.avatar;
      }
    });
  }

  insertPath(message: Message) {
    if(message.avatar){
      message.avatar = this.service.GetApi() + message.avatar;
    }
    return message;
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
    this.group.messages = this.group.messages.filter((element) => element._id !== message_id);
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

  delete(messId: string) {
    this.socket.deleteMessage(this.group._id, messId);
  }

  leaveGroup(){
    this.socket.LeaveGroup(this.group._id, this.userId);
    this.toastr.info("Đã rời nhóm chat", "Thông báo");
    this.service.RemoveGroupId();
    this.router.navigate(['searchroom']);
  }

  scrollToBottom() {
    try {
      this.messageListContainer.nativeElement.scrollTop = this.messageListContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Lỗi khi cuộn xuống cuối cùng:', err);
    }
  }

  RequestRoom() {
    this.toastr.warning('Bạn có muốn thực hiện hành động này?', 'Xác nhận', {
      closeButton: true,
      timeOut: 0,
      extendedTimeOut: 0,
      disableTimeOut: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing',
      toastClass: 'ngx-toastr-confirm'
    })
    .onShown.subscribe(() => {
      document.getElementById('confirmButton')?.addEventListener('click', () => {
        this.add();
        this.toastr.clear();
      });

      document.getElementById('cancelButton')?.addEventListener('click', () => {
        this.toastr.clear();
      });
    });
  }

  add() {
    console.log('Đã chấp nhận');
  }
}
