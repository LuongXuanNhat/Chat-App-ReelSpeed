import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../constant/constantsystem';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, CommonModule, MatIconModule, 
      MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

  
  user!: User ;
  url!: '';
  isEditMode: boolean = false;
  userform = this.builder.group({
    fullname: this.builder.control('', [Validators.required, Validators.minLength(6)]) ,
  })

  constructor(private service: ApiService, private toastr: ToastrService, private builder: FormBuilder){

  }
  ngOnInit(): void {
    this.GetInfor();
  }
  async GetInfor() {
    (await this.service.GetUserInfor()).subscribe(
      (data: any) => {
        if(data.status === 'success'){
          this.user = data.data;
          this.userform.get('fullname')?.setValue(this.user.fullname);
          this.user.avatar = this.service.GetApi() + this.user.avatar;
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.info(error, 'Thông báo');
      }
    )
  }
  toggleEditMode() {
    if(this.isEditMode){
      this.userform.get('fullname')?.setValue(this.user.fullname);
    } 
    this.isEditMode = !this.isEditMode;
  }
  checkSize(file: any):boolean {
    const fileSize = file.size; 
    const maxSize = 1024 * 1024; 
  
    if (fileSize > maxSize) {
      this.toastr.warning('Kích thước ảnh không được vượt quá 1MB.');
      return true;
    } 
    return false;
  }
  async ChangeAvatar(event: any) {
    const file: File = event.target.files[0];
    if(this.checkSize(file)){
      return;
    }
    const formData: FormData = new FormData();
    formData.append('avatar', file);
    (await this.service.UpdateAvatar(formData)).subscribe(
      (data: any) => {
        if(data.status === 'success'){
          this.toastr.success("Cập nhập thành công", "Thông báo");
          this.user.avatar = data.avatar;
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }

  async Submit() {
    if(this.userform.valid){
      (await this.service.UpdateUser(this.userform.value)).subscribe(
        (data: any) => {
          if(data.status === 'success'){
            this.toastr.success("Cập nhập thành công", "Thông báo");
            this.isEditMode = !this.isEditMode;
          } else {
            this.toastr.error(data.message, "Lỗi");
          }
        }, (error: any) => {
          this.toastr.error(error, "Lỗi");
        }
      )
    }
  }
}
