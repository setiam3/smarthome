/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { retry } from "rxjs/operators";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";


@Injectable({
	providedIn: "root"
})

export class SettingService {
	
	constructor(
		public httpClient: HttpClient,
		public loadingController: LoadingController,
		public toastController: ToastController,
		public alertController: AlertController
	){



	}




	
	apiURL: string = "https://myservers.com"; //
	
	loading: any ;
	
	
	
	/**
	/ SettingService.inputFields($obj)
	* @param object $obj
	**/
	inputFields(field:any){
		let inputs = {
			"server": field.server,
			"name": field.name
		}
		return this.httpBuildQuery(inputs);
	}
	
	
	/**
	* SettingService.httpBuildQuery(obj)
	* @param object $obj
	**/
	httpBuildQuery(obj) {
		let k:any;
		let str:any = [];
		for (k in obj) {
			str.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
		}
		return str.join("&");
	}
	
	
	/**
	/ SettingService.postRequest()
	**/
	postRequest(fields:any): Observable<any>{
		//console.log(fields);
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/x-www-form-urlencoded",
			})
		}
		this.presentLoading();
		return this.httpClient.post(this.apiURL,this.inputFields(fields), httpOptions)
			.pipe(
				map(results => {
					//console.log("RAW:",results);
					this.dismissLoading();
					this.showToast();
					return results;
				}),
				catchError(err => {
					console.log("Handling error:", err);
					this.showAlert(err.statusText,err.name,err.message);
					return throwError(err);
				}),
				catchError(err => {
					console.log("caught rethrown:", err);
					return of([]);
				})
			);
	}
	
	
	/**
	* SettingService.presentLoading()
	**/
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: "Please wait...",
			spinner: "crescent",
			duration: 500
		});
		await this.loading.present();
	}
	
	
	/**
	* SettingService.dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	
	/**
	* SettingService.showToast()
	**/
	async showToast(){
		const toast = await this.toastController.create({
			message: "Successfully",
			position: "bottom",
			color: "dark",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* SettingService.showAlert()
	**/
	async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			message: message,
			buttons: ["OK"]
		});
		await alert.present();
	}
	
	



}

