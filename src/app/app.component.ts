import { Component } from '@angular/core';
import { ControllerBase } from './controller/controller.base';

import { NgxSpinnerService } from 'ngx-spinner';
import { RouterOutlet } from '@angular/router';
import { slideInAppAnimation } from './animations';
import { BaseService } from './services/base.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAppAnimation
  ]
})
export class AppComponent extends ControllerBase {
  
  title = 'CDI/LTGO';

  constructor(
    private spinner: NgxSpinnerService,
    private service: BaseService,
    private auth: AuthService
  ) {
    super();
    service.setCurrentUrl(this.getUrlCurrent());
    auth.setCurrentUrl(this.getUrlCurrent());
  }

  ngOnInit() {

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.animation;
  }
}
