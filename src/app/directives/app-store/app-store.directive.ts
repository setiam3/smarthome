/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { InAppBrowserOptions } from "@awesome-cordova-plugins/in-app-browser/ngx";

@Directive({
	selector: "[appStore]"
})

export class AppStoreDirective {

	@Input() appURL: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runAppStore(this.appURL);
	}


	
	/**
	* runAppStore(appURL)
	* @param string appURL = "https://apps.apple.com/us/app/xxxx/id123456"
	**/
	
	private runAppStore(appURL: string){
		this.inAppBrowser.create(appURL,"_system");
	}
	


}
