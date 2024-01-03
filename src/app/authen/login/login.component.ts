import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../ApiService/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
            MatIconModule  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  loginform = this.builder.group({
    Account: this.builder.control('', Validators.required),
    Password: this.builder.control('', Validators.required)
  })

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: ApiService){

  }

  async login(){
    if(this.loginform.valid){
      (await this.service.Login(this.loginform.value)).subscribe(
        (data: any) => {
          if(data.isSuccessed){
  
          } else {
            this.toastr.error("Lỗi: " + data.message);
          }
        }, (error: any) => {
          this.toastr.error("Lỗi: "+ error);
        }
      )
    }
  }
}
