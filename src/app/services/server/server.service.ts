/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { retry } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { HttpHeaders } from "@angular/common/http";



@Injectable({
	providedIn: "root"
})

export class ServerService {
	
	constructor(
		public httpClient: HttpClient,
		public loadingController: LoadingController,
		public toastController: ToastController,
		public alertController: AlertController
	){



	}




	urlListItem : string = "assets/data/server.json";
	loading: any ;
	apiUrl:string="http://localhost:3000/todos";
	headers = new HttpHeaders().set('Content-Type', 'application/json');

	/**
	* getItems()
	**/
	getItems(): Observable<any>{
		let apiUrl = this.urlListItem;
		//console.log("apiUrl", apiUrl);
		this.presentLoading();
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(apiUrl,httpOptions)
			.pipe(
				map(results => {
					console.log(`services`,`getItems`,results);
					this.dismissLoading();
					this.showToast(`Successfully retrieved data!`);
					return results;
				}),
				catchError(err => {
					console.log(`services`,`getItems`,`catchError`, err);
					this.showAlert(err.statusText,err.name,`Failed to retrieve data from server!`);
					return throwError(err);
				}),
				catchError(err => {
					console.log(`services`,`getItems`,`rethrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* presentLoading()
	**/
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: `Please wait...!`,
			spinner: "crescent",
			duration: 2000
		});
		await this.loading.present();
	}
	
	
	/**
	* dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	
	/**
	* showToast(message)
	**/
	async showToast(message:string){
		const toast = await this.toastController.create({
			message: message,
			position: "bottom",
			color: "dark",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* showAlert(header,subheader,message)
	**/
	async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			message: message,
			buttons: ["Okey!"]
		});
		await alert.present();
	}
// Create
create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Read
  list() {
    return this.httpClient.get(`${this.apiUrl}`);
  }

  // Update
  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Delete
  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };



}

