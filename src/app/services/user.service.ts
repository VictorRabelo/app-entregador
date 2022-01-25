import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
    
  urlApi: string;

  constructor(private http: HttpClient) { 
    super();
    this.currentUrl.subscribe(x => this.urlApi = x);
      
  }

  setUrl(url: string): void {
    this.urlApi = url;
  }

  getAll() {
    return this.http.get<any>(`${this.urlApi}/users`).pipe(map(res =>{ return res.response }));
  }

  getById(id: number) {
    return this.http.get<any>(`${this.urlApi}/users/${id}`).pipe(map(res =>{ return res.response }));
  }

  store(store: any){
    return this.http.post<any>(`${this.urlApi}/users`, store);
  }

  update(update: any){
    return this.http.put<any>(`${this.urlApi}/users/${update.id}`, update).pipe(map(res =>{ return res.response }));
  }

  delete(id: number){
    return this.http.delete<any>(`${this.urlApi}/users/${id}`);
  }
}
