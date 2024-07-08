import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { IUserDetail } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey: string = 'token';
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  http = inject(HttpClient);

  constructor() {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/login`, data)
      .pipe(
        map((response) => {
          if (response.statusCode === 200) {
            localStorage.setItem(this.tokenKey, response.value);
            this.loggedIn.next(true);
            const decodedToken = this.getUserDetail();
          } else {
            throw new Error('Login failed');
          }
          return response;
        }),
        catchError((error) => {
          this.loggedIn.next(false);
          return of({
            statusCode: 401,
            message: 'Login failed',
            value: '',
          } as AuthResponse);
        })
      );
  }

  checkAuthStatus() {
    const isLoggedIn = this.isLoggedIn();
    this.loggedIn.next(isLoggedIn);
  }

  getDetail(): Observable<IUserDetail> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IUserDetail>(this.apiUrl + 'Account/detail', {
      headers,
    });
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const userdetail = {
      id: decoded.nameid,
      fullname: decoded.name,
      email: decoded.email,
      role: decoded.role || null,
    };
    return userdetail;
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    var decode = jwtDecode(token);
    var isTokenExpired = Date.now() >= decode['exp']! * 1000;
    if (isTokenExpired) this.logOut();
    return isTokenExpired;
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  };

  getAll = (): Observable<IUserDetail[]> =>
    this.http.get<IUserDetail[]>(this.apiUrl + 'Account');
}
