import { Component, ElementRef, ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { ControllerBase } from '@app/controller/controller.base';
import { slideInLayoutAnimation } from '@app/animations';

import { MessageService } from '@app/services/message.service';
import { Logout } from '@app/core/actions/auth.action';

import * as $ from 'jquery';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    slideInLayoutAnimation
  ]
})
export class LayoutComponent extends ControllerBase {

  @ViewChild('swipeLeft', {static: false}) swipeLeft: ElementRef;
  
  swiping: boolean = false;
  
  constructor(
    private title: Title,
    private message: MessageService,
  ) { 
    super();
  }

  ngAfterViewInit() {
    // this.detectSwipe();
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

  // detectSwipe() {
  //   this.gesture = this.gestureCtrl.create({
  //     el: this.swipeLeft.nativeElement,
  //     gestureName: 'swipe-left',
  //     threshold: 0,
  //     onMove: event => this.onMove(event),
  //   }, true);

  //   this.gesture.enable();
  // }
  
  // onMove(event: GestureDetail) {
  //   return
  //   const deltaX:number = event.deltaX;
  //   const startX: number = event.startX;
    
  //   const velocityX: number = event.velocityX;
  //   const time: number = 1;

  //   if(deltaX > startX && velocityX > time) {
  //     document.body.classList.remove('sidebar-closed');
  //     document.body.classList.remove('sidebar-collapse');
  //     document.body.classList.add('sidebar-open');
  //   }
  // }
}
