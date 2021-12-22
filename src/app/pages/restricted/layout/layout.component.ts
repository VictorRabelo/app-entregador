import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { ControllerBase } from 'src/app/controller/controller.base';
import { slideInLayoutAnimation } from '@app/animations';

import * as $ from 'jquery';
import { MessageService } from '@app/services/message.service';
import { Logout } from '@app/core/actions/auth.action';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    slideInLayoutAnimation
  ]
})
export class LayoutComponent extends ControllerBase {

  constructor(
    private title: Title,
    private message: MessageService,
  ) { 
    super();
  }

  ngOnInit() {
    
    this.title.setTitle('CDI/LTGO | Dashboard');

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.animation;
  }

  logout() {
    this.message.swal.fire({
      title: 'Atenção!',
      icon: 'warning',
      html: 'Deseja realmente sair ?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Voltar',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.store.dispatch(new Logout());
      }
    });
  }
}
