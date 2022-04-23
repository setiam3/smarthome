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
import { Platform } from "@ionic/angular";

@Directive({
	selector: "[appWebview]"
})

export class AppWebviewDirective {

	@Input() url: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser,
		private platform: Platform
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runWebview(this.url);
	}


	
	
	/**
	* Options for the Cordova InAppBrowser Plugin
	* @reference: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/
	**/
	
	appWebviewOption : InAppBrowserOptions = {
		location : "no",
		hidden : "no",
		zoom : "no",
		hardwareback : "yes",
		mediaPlaybackRequiresUserAction : "no",
		shouldPauseOnSuspend : "no",
		//closebuttoncaption : "Close",
		disallowoverscroll : "no",
		toolbar : "no",
		enableViewportScale : "no",
		allowInlineMediaPlayback : "no",
		presentationstyle : "pagesheet",
		fullscreen : "yes",
	}
	
	
	/**
	* runWebview($url)
	* @param string $url = "http://ihsana.com"
	**/
	
	private runWebview(url: string){
		let urlAddr = url || "http://ihsana.com";
		if (this.platform.is("ios")){
			this.inAppBrowser.create(urlAddr,"_system");
		}else{
			this.inAppBrowser.create(urlAddr,"_blank",this.appWebviewOption);
		}
	}
	


}
