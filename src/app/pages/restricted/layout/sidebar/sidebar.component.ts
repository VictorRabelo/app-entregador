import { Component, ViewEncapsulation } from '@angular/core';
import { ModalAlterPasswordComponent } from '@app/components/modal-alter-password/modal-alter-password.component';
import { ControllerBase } from '@app/controller/controller.base';
import { MessageService } from '@app/services/message.service';
import { environment } from '@env/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent extends ControllerBase {
  type: any;

  constructor(
    private modalCtrl: NgbModal,
    private message: MessageService,
  ) { 
    super();
  }

  ngOnInit() {
    this.type = localStorage.getItem(environment.api);
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  toggleSideBar(el: HTMLElement){
    let toggle = el.classList.toggle('itemToggle');
    let classList = el.classList;
    
    if(!toggle){
      classList.add("menu-is-opening");
      classList.add("menu-open");
    } else {
      classList.remove("menu-is-opening");
      classList.remove("menu-open");
    }
  }

  closeSide(){
    const mobile: number = window.innerWidth;

    if(mobile > 400) {
      return;
    }

    document.body.classList.remove('sidebar-open');
    document.body.classList.add('sidebar-closed');
    document.body.classList.add('sidebar-collapse');
  }

  alterPassword(){
    const modalRef = this.modalCtrl.open(ModalAlterPasswordComponent, { size: 'sm', backdrop: 'static' });
    modalRef.result.then(res => {
      if(res){
        this.message.toastSuccess('Senha atualizada com sucesso!');
      }
    })
  }
}
