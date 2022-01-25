import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { AuthService } from '@app/services/auth.service';
import { MessageService } from '@app/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-alter-password',
  templateUrl: './modal-alter-password.component.html',
  styleUrls: ['./modal-alter-password.component.css']
})
export class ModalAlterPasswordComponent implements OnInit, OnDestroy {

  private sub = new SubSink();

  show: boolean = false;
  
  validPassowrd: string = '';
  type: string = 'password';

  dados: any = {};

  constructor(
    private activeModal: NgbActiveModal,
    private service: AuthService,
    private message: MessageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  close(params = undefined) {
    this.activeModal.close(params);
  }
  
  submit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    
    this.spinner.show();

    if(this.dados.password !== this.dados.confirm_password) {
      this.validPassowrd = 'invalid';
      this.spinner.hide();
      
      return false;
    } else {
      this.validPassowrd = 'valid';
    }

    const request = { ...this.dados, app: true};

    this.service.alterSenha(request).subscribe(res => {
      this.spinner.hide();
      this.close(true);
    },
    error => {
      this.spinner.hide();
      console.log(error)
    })
  }

  changePassword(){
    if(this.show){
      this.type = 'text';
    } else {
      this.type = 'password'
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
