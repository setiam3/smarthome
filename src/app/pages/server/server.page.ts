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
import { Observable } from "rxjs";
import { ServerService } from "./../../services/server/server.service";
import { ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-server",
	templateUrl: "server.page.html",
	styleUrls: ["server.page.scss"],
})

export class ServerPage {

	// search query
	filterQuery: string = "";

	
	pageName:string = `server` ;
	
	/**
	* ServerPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public serverService: ServerService,
		public popoverController: PopoverController,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#a60009");
	
	

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
	
	


		
	
	
	server: Observable<any>;
	dataServer: any = [];
	filterDataServer: any = [];
	
	//for infinite-scroll
	lastId:number = 0;
	firstLoad:number = 20;
	perPage:number = 20;
	
	@ViewChild("IonInfiniteScroll",{static: false}) infiniteScroll: IonInfiniteScroll;
	
	
	
	/**
	* ServerPage:getItems()
	**/
	getItems(){
		this.server = this.serverService.getItems();
		this.server.subscribe(data => {
			this.dataServer = data ;
			this.lastId = 0;
			let newData : any = [];
			for (let item of data) {
				if(this.lastId <= (this.firstLoad -1) ) {
					newData[this.lastId] = item;
					//console.log(this.lastId);
					this.lastId++;
				}
			}
			this.filterDataServer = newData;
		});
	}
	
	
	/**
	* ServerPage:filterItems($event)
	* @param any $event
	*
	* @required for searchbar
	**/
	public filterItems(evt: any) {
		this.filterDataServer = this.dataServer;
		let filterVal = evt.target.value;
		if (filterVal && filterVal.trim() !== "") {
			this.filterDataServer = this.dataServer.filter((newItem) => {
				if(newItem.servername){
					return newItem.servername.toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
				}
			});
		}
	}
	
	
	/**
	* ServerPage:loadMore(event)
	* @param event $event
	**/
	public loadMore(event){
		let newData : any = [];
		let nextPage:number = this.perPage + this.lastId;
		for (let item of this.dataServer){
			if(this.lastId < this.dataServer.length){
				if(this.lastId < nextPage){
					this.filterDataServer[this.lastId] = this.dataServer[this.lastId];
					//console.log("more data",this.lastId);
					this.lastId++;
				}
			}
		}
		setTimeout(() => {
			event.target.complete();
			if( this.lastId >= this.dataServer.length){
				event.target.enable = false;
			}
		}, 500);
	}
	
	
	/**
	* ServerPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.dataServer = [] ;
		this.filterDataServer = [] ;
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.getItems();
	}
	
	
	/**
	* ServerPage:ngOnInit()
	**/
	public ngOnInit(){
		this.dataServer = [] ;
		this.filterDataServer = [] ;
		this.getItems();
	}
	




}
