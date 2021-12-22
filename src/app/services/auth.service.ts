import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  baseUrl = environment.apiUrl;

  constructor(
    http: HttpClient
  ) { 
    super(http);
  }

  /**
  * Login
  * @param login
  * @param password
  */
  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/oauth/login`, { login, password }).pipe(map(resp => { return resp.user }));
  }

  logout(): Promise<any> {
    return this.http.get(`${this.baseUrl}/oauth/logout`).toPromise();
  }

  getUserByToken(queryParams: any = {}): Promise<any> {
    return this.http.get(`${this.baseUrl}/oauth/me`, { params: queryParams }).toPromise();
  }

  alterSenha(dados) {
    return this.http.post<any>(`${this.baseUrl}/oauth/alter-password`, dados);
  }
}
