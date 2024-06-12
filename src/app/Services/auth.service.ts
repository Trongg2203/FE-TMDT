import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  apiUrl:string = environment.apiUrl;
  private tokenKey:string = 'token';

  constructor(private http:HttpClient) { }

  login(data:LoginRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}Account/login`,data).pipe(
      map((response) => {
        if(response.statusCode === 200) {
          localStorage.setItem(this.tokenKey, response.value);
        }
        return response;
      })
    );
  }

 

  isLoggedIn = ():boolean => {
    const token = this.getToken();
    if(!token) return false;
    return !this.isTokenExpired();
  }

  // kiểm tra xem token của người dùng có hết hạn không
  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;
    var decode = jwtDecode(token);
    var isTokenExpired = Date.now() >= decode['exp']! * 1000;
    if(isTokenExpired) this.logOut();
    return isTokenExpired;
  }
  logOut() {
    localStorage.removeItem(this.tokenKey);
  }
  //lây token
  private getToken = ():string | null => localStorage.getItem(this.tokenKey) || '';
}