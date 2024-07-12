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
  HttpParams,
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

  //Hang Hoa

  //Hang Hoa

  editHangHoaService(productId: number, formData: FormData): Observable<IProduct> {
    const url = `${this.apiUrl}HangHoa/edit?id=${productId}`;
    const headers = new HttpHeaders(); // No need to set Content-Type here

    // Convert FormData to a plain object
    const plainObject = this.formDataToObject(formData);

    return this.http
      .put<IProduct>(url, plainObject, { headers })
      .pipe(catchError(this.handleError));
  }


  removeHangHoaService(idHangHoa: number): Observable<IProduct> {
    return this.http.delete<IProduct>(
      `${this.apiUrl}HangHoa/delete/${idHangHoa}`
    );
  }
  addHangHoaService(formData: FormData): Observable<IAddHangHoa> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post<IAddHangHoa>(this.apiUrl + 'HangHoa/create', data, { headers });
    return this.http
      .post<IAddHangHoa>(`${this.apiUrl}HangHoa/create`, formData)
      .pipe(catchError(this.handleError));
  }

  private formDataToObject(formData: FormData): Record<string, any> {
    const plainObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      plainObject[key] = value;
    });
    return plainObject;
  }

  //he server expects the data to be sent as a plain JavaScript object, not as a FormData object.
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Đã xảy ra lỗi không xác định';
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Mã lỗi: ${error.status}, Thông báo: ${JSON.stringify(
        error.error
      )}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
