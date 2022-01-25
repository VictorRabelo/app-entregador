import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '@app/services/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit, OnDestroy {

  private sub = new SubSink();

  loading: boolean = false;

  @Input() data: any;
  @Input() crud: string;

  dados: any = {};
  title: string = 'cliente';

  constructor(
    private activeModal: NgbActiveModal,
    private service: ClienteService
    ) {}
    
    ngOnInit() {
      if(this.data){
        this.getById(this.data);
      }
  }

  close(params = undefined) {
    this.activeModal.close(params);
  }

  getById(id) {
    this.loading = true;
    this.sub.sink = this.service.getById(id).subscribe(
      (res: any) => {
        this.loading = false;
        this.dados = res;
      },
      error => {
        console.log(error)
      });
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    
    if (this.dados.id) {
      this.update();
    } else {
      this.create();
    }

  }

  create() {
    this.loading = true;

    this.service.store(this.dados).subscribe(
      (res: any) => {
        res.message = "Cadastro bem sucedido!"
        this.close(res);
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    )
  }

  update() {
    this.loading = true;

    this.service.update(this.dados).subscribe(
      (res: any) => {
        res.message = "Atualização bem sucedido!"
        this.close(res);
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
