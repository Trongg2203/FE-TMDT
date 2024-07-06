import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUserDetail } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = environment.apiUrl;
  constructor(private http:HttpClient) { }


  getUserById():Observable<IUserDetail>{
   return this.http.get<IUserDetail>(this.apiUrl + 'Account/detail');
  }
}
