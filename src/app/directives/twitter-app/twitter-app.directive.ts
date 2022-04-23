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
	selector: "[twitterApp]"
})

export class TwitterAppDirective {

	@Input() message: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runTwitter(this.message);
	}


	
	/**
	* runTwitter($message)
	* @param string $message = "hi there"
	**/
	
	private runTwitter(message: string){
		let myMessage = message || "Hi";
		if(myMessage == ""){
			myMessage = "Hi";
		}
		let urlSchema = "twitter://post?message=" + encodeURIComponent(myMessage) ;
		this.inAppBrowser.create(urlSchema,"_system");
	}
	


}
