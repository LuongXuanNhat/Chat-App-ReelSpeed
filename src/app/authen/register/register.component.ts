import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from '../../ApiService/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule,
            MatInputModule, ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  registerform = this.builder.group({
    Email: this.builder.control('', Validators.required),
    Password: this.builder.control('', Validators.required),
    Confirm: this.builder.control('', Validators.required)
  })

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService){

  }

  async register(){
    if(this.registerform.valid){
      if(this.registerform.value.Password === this.registerform.value.Confirm){
        (await this.service.Register(this.registerform.value)).subscribe(
          (res: any) => {
            const resultObj = res.resultObj;
            this.toastr.success('Vui lòng nhập mã xác nhận được gửi đến email của bạn', 'Đăng ký thành công');
          },
          (error: any) => {
            const message = error.error.message;
            if (message == null) {
              this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
            } else {
              this.toastr.error(message);
            }
          }
        );
      } else {
        this.toastr.warning('Mật khẩu không khớp!')
      }
      
    } else {
      const email = this.registerform.get('email') ?? null;
      const pass = this.registerform.get('password') ?? null;

      if (email && email.hasError('email')) {
        this.toastr.warning('Email không hợp lệ. Hãy nhập một địa chỉ email hợp lệ.');
      } else if (pass && pass.hasError('pattern')) {
        this.toastr.warning('Mật khẩu ít nhất phải có 6 ký tự và bao gồm: Hoa, thường, số và ký tự đặc biệt');
      } else {
        this.toastr.warning('Vui lòng nhập đầy đủ thông tin!');
      }

      
    }
  }
}
