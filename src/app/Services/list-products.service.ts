import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  IAddHangHoa,
  IAddLoaiHangHoa,
  IProduct,
  IProducts,
} from '../interfaces/product';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListProductsService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + 'HangHoa/getall');
  }
  getProductById(idHangHoa: number): Observable<IProduct> {
    return this.http.get<IProduct>(
      this.apiUrl + 'HangHoa/getbyid/' + idHangHoa
    );
  }

  // admin add LoaiHangHoa

  addLoaiHangHoaService(data: any): Observable<IAddLoaiHangHoa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IAddLoaiHangHoa>(
      this.apiUrl + 'LoaiHangHoa/create',
      data,
      { headers }
    );
  }

  addHangHoaService(formData: FormData): Observable<IAddHangHoa> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post<IAddHangHoa>(this.apiUrl + 'HangHoa/create', data, { headers });
    return this.http
      .post<IAddHangHoa>(`${this.apiUrl}HangHoa/create`, formData)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Đã xảy ra lỗi không xác định';
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Mã lỗi: ${error.status}, ` + `Thông báo: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
