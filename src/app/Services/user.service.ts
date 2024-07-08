import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IAdminRegisterAccount, IUserDetail } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getUserById(): Observable<IUserDetail> {
    return this.http.get<IUserDetail>(this.apiUrl + 'Account/detail');
  }

  //admin
  getAllUsersService(): Observable<IUserDetail[]> {
    return this.http.get<IUserDetail[]>(this.apiUrl + 'Account/getalluser');
  }

  createUserService(userData: any): Observable<IAdminRegisterAccount> {
    return this.http.post<IAdminRegisterAccount>(
      this.apiUrl + 'Account/registeradmin',userData
    );
  }

  removeUserService(idUser: string): Observable<any> {
    const params = new HttpParams().set('id', idUser);
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.delete(`${this.apiUrl}Account/delete`, { params, headers });
  }
}
