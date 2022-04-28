/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { Component , OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { environment } from "./../../../../src/environments/environment";
import { Globals } from "../../class/globals/globals";
import { Storage } from "@ionic/storage-angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-server",
	templateUrl: "server.page.html",
	styleUrls: ["server.page.scss"],
})

export class ServerPage {
	
	pageName:string = `server` ;
	
	/**
	* ServerPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public storage: Storage,
		public popoverController: PopoverController,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#a60009");
	
	
this.storage.create();

		console.log(`ServerPage`,`pageName`,this.pageName);
	}
	
	/**
	* ServerPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


	servers:any=[];
listserver(){
  this.storage.get('servers').then(data=>{
			if(data!==null){
				this.servers.push(data);
			}else{
				this.router.navigateByUrl('/setting');
			}
		});//
}
	public ngOnInit(){
		this.listserver();
	}



}
