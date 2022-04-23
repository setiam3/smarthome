/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { InAppBrowserOptions } from "@awesome-cordova-plugins/in-app-browser/ngx";

@Directive({
	selector: "[whatsappApp]"
})

export class WhatsappAppDirective {

	@Input() message: string;
	@Input() phoneNumber: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runWhatsapp(this.phoneNumber,this.message);
	}


	
	/**
	* runWhatsapp($phoneNumber,$message)
	* @param string $phoneNumber = "08123435435"
	* @param string $message = "hi there"
	**/
	
	private runWhatsapp(phoneNumber: string,message: string){
		let myNumber = phoneNumber || "";
		let myMessage = message || "Hi";
		if(myMessage == ""){
			myMessage = "Hi";
		}
		let urlSchema = "https://api.whatsapp.com/send?phone=" + encodeURIComponent(myNumber) + "&text=" + encodeURIComponent(myMessage) ;
		this.inAppBrowser.create(urlSchema,"_system");
	}
	


}
