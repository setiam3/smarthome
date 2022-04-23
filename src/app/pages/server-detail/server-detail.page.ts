/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { Component , OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { environment } from "./../../../../src/environments/environment";
import { Globals } from "../../class/globals/globals";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ServerService } from "./../../services/server/server.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-server-detail",
	templateUrl: "server-detail.page.html",
	styleUrls: ["server-detail.page.scss"],
})

export class ServerDetailPage {

	//url parameter
	public id : string;

	
	pageName:string = `server-detail` ;
	
	/**
	* ServerDetailPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public serverService: ServerService,
		public popoverController: PopoverController,
		public activatedRoute: ActivatedRoute,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#a60009");
	
	
		this.id = this.activatedRoute.snapshot.paramMap.get("id");

		console.log(`ServerDetailPage`,`pageName`,this.pageName);
	}
	
	/**
	* ServerDetailPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	
	server: Observable<any>;
	dataServer: any = {};
	
	/**
	* ServerDetailPage:getJSON(url: string)
	**/
	public getItem(){
		this.server = this.serverService.getItems();
		this.server.subscribe(data => {
			for (let item of data){
				if( item.id.toString() === this.id.toString()){
					this.dataServer = item ;
				}
				//console.log(item.id.toString(),this.id.toString());
			};
		});
	}
	
	
	
	/**
	* ServerDetailPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.dataServer = {};
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.getItem();
	}
	
	
	/**
	* ServerDetailPage:ngOnInit()
	**/
	public ngOnInit(){
		this.dataServer = {};
		this.getItem();
	}
	




}
