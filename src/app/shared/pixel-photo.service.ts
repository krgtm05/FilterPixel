import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Iqu3XfngrulSWC3ykD51YKfje4D87qrSFreeubgECOvvKobJb08P80go',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PixelPhotoService {
  constructor(private http: HttpClient) {}
  getData(search: string, perPage: number): Observable<any> {
    const url = `https://api.pexels.com/v1/search?query=${search}&per_page=${perPage}`;
    console.log(search);
    console.log(perPage);
    return this.http
      .get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    return throwError(error.message || 'Server Error');
  }
}
