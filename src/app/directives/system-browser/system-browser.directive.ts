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
	selector: "[systemBrowser]"
})

export class SystemBrowserDirective {

	@Input() url: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runSystemBrowser(this.url);
	}


	
	/**
	* runSystemBrowser($url)
	* @param string $url = "http://ihsana.com"
	**/
	
	private runSystemBrowser(url: string){
		let urlAddr = url || "http://ihsana.com";
		this.inAppBrowser.create(urlAddr,"_system");
	}
	


}
