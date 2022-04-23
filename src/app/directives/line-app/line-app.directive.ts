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
	selector: "[lineApp]"
})

export class LineAppDirective {

	@Input() message: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runLine(this.message);
	}


	
	/**
	* runLine($message)
	* @param string $message = "hi there"
	**/
	
	private runLine(message: string){
		let myMessage = message || "Hi";
		if(myMessage == ""){
			myMessage = "Hi";
		}
		let urlSchema = "line://msg/text/" + encodeURIComponent(myMessage) ;
		this.inAppBrowser.create(urlSchema,"_system");
	}


}
