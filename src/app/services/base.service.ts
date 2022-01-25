import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private currentUrlSubject: BehaviorSubject<string>;
  public currentUrl: Observable<string>;
  
  constructor() { 
    this.currentUrlSubject = new BehaviorSubject<string>(this.getUrlCurrent());
    this.currentUrl = this.currentUrlSubject.asObservable();
  }

  getCurrentUrl() {
    return this.currentUrl;
  }
  
  setCurrentUrl(url: string): void {
    this.currentUrlSubject.next(url);
  }

  getUrlCurrent(): string {
    let api: string = localStorage.getItem(environment.api);

    if(api == 'ltgo') {
        api = environment.apiUrlLtgo;
    }
  
    if(api == 'cdi') {
        api = environment.apiUrlCdi;
    }
    
    return api;
  }
}