/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { Component } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AppSideMenus } from "./app.side-menus";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@awesome-cordova-plugins/splash-screen/ngx";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { InAppBrowser,InAppBrowserOptions } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { Device } from "@awesome-cordova-plugins/device/ngx";
import { Globals } from "./class/globals/globals";
import { environment } from "./../../src/environments/environment";



@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent {

	appTitle:string = "Smarthome";
	appSubTitle:string = "Smarthome";
	appMenus:any = [] ;



	/**
	* Smarthome:constructor()
	**/

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private menuController: MenuController,
		private platform: Platform,
		private statusBar: StatusBar,
		private navController: NavController,
		private splashScreen: SplashScreen,
		private device: Device,
		private appSideMenus: AppSideMenus,
		private window: Window,
		private globals: Globals){
			//initialization items for static menu
			this.appMenus = this.appSideMenus.items;
			//initialization app
			this.initializeApp();
	}
	

	/**
	* Smarthome:initializeApp()
	**/

	initializeApp() {
		this.platform.ready().then(() => {

			// set status bar
			this.statusBar.backgroundColorByHexString("#a60009");

			// hide splashscreen
			this.splashScreen.hide();


		});


		
	}

}
