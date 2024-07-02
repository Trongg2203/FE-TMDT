import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IOrderDetails, IPostHoaDonXuat, IPostThongTinXuat } from '../interfaces/checkout';
import { environment } from '../../environments/environment';
import { AddBillResponse, ICheckOutRes } from '../interfaces/checkout-response';
import { AuthService } from './auth.service';
import { IOrderDetailRequest, IOrderRequest } from '../interfaces/orderDetail-request';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addbill(data:IOrderRequest) : Observable<any>  {
    return this.http.post<any>(`${this.apiUrl}HoaDonXuat/create`,data);
  }

  addBillinfor(data:IOrderDetailRequest) :Observable<AddBillResponse>{
    return this.http.post<AddBillResponse>(`${this.apiUrl}ThongTinXuat/Create`,data);
  }
//https://localhost:5000/api/XuatHangHoa/GetByIdUser?id=f781591b-c082-475c-8226-65f4f4241cda
  getOrder(){
    return this.http.get<any[]>(`${this.apiUrl}HoaDonXuat/getbyiduser`);
  }
}