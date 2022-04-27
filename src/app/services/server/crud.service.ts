import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError,Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertController } from "@ionic/angular";
const API_URL = environment.API_URL;
const API_Key = environment.API_Key;

@Injectable({
  providedIn: 'root'
})
export class CrudService {

apiUrl:string;
headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http:HttpClient,
    private alertController:AlertController) { }
// Create
create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(err => {
          this.showAlert(err.statusText,err.name,`Failed to create`);
          return throwError(err);
        }),
      )
  }

  // Read
  list() {
    return this.http.get(`${this.apiUrl}`).pipe(
      map(data=>{
        return data
      }),
      catchError(err => {
        this.showAlert(err.statusText,err.name,`Failed to retrieve data from server!`);
        return throwError(err);
      }),
    );
  }

  // Update
  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(err => {
        this.showAlert(err.statusText,err.name,`Failed to update`);
        return throwError(err);
      })
    )
  }

  // Delete
  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(err => {
        this.showAlert(err.statusText,err.name,`Failed to delete`);
        return throwError(err);
      }),
    )
  }

  async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			message: message,
			buttons: ["Okey!"]
		});
		await alert.present();
	}
}