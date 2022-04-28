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
import { Observable } from "rxjs";
import { SmarthomeService } from "./../../services/smarthome/smarthome.service";
import { ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-smarthome",
	templateUrl: "smarthome.page.html",
	styleUrls: ["smarthome.page.scss"],
})

export class SmarthomePage {

	// search query
	filterQuery: string = "";

	
	pageName:string = `smarthome` ;
	
	/**
	* SmarthomePage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public smarthomeService: SmarthomeService,
		public storage: Storage,
		public popoverController: PopoverController,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#a60009");
	
	
this.storage.create();
		console.log(`SmarthomePage`,`pageName`,this.pageName);
	}
	
	/**
	* SmarthomePage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		smarthome: Observable<any>;
	dataSmarthome: any = [];
	filterDataSmarthome: any = [];
	lastId:number = 0;
	firstLoad:number = 20;
	perPage:number = 20;
	server:String;
	gpio:String;
	@ViewChild("IonInfiniteScroll",{static: false}) infiniteScroll: IonInfiniteScroll;
	async getItems(){
		this.server= await this.storage.get('servers');
		this.gpio=await this.storage.get('gpios');
		if(this.server!==null){
			if(this.gpio!==null){
				this.dataSmarthome = this.gpio['gpios'] ;
					this.lastId = 0;
					let newData : any = [];
					for (let item of this.gpio['gpios']) {
						if(this.lastId <= (this.firstLoad -1) ) {
							newData[this.lastId] = item;
							this.lastId++;
						}
					}
					this.filterDataSmarthome = newData;
			}else{
				this.smarthomeService.urlListItem=this.server['server']+"&status";
				this.smarthome = this.smarthomeService.list();
				this.smarthome.subscribe(data => {
					this.dataSmarthome = data.gpios ;
					this.lastId = 0;
					let newData : any = [];
					for (let item of data.gpios) {
						if(this.lastId <= (this.firstLoad -1) ) {
							newData[this.lastId] = item;
							this.lastId++;
						}
					}
					this.filterDataSmarthome = newData;
                  this.storage.set('gpios',data);
				});
			}
		}else{
			this.router.navigateByUrl('/setting');
		}
	}
	
	public filterItems(evt: any) {
		this.filterDataSmarthome = this.dataSmarthome;
		let filterVal = evt.target.value;
		if (filterVal && filterVal.trim() !== "") {
			this.filterDataSmarthome = this.dataSmarthome.filter((newItem) => {
				if(newItem.name){
					return newItem.name.toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
				}
			});
		}
	}
	
	public loadMore(event){
		let newData : any = [];
		let nextPage:number = this.perPage + this.lastId;
		for (let item of this.dataSmarthome){
			if(this.lastId < this.dataSmarthome.length){
				if(this.lastId < nextPage){
					this.filterDataSmarthome[this.lastId] = this.dataSmarthome[this.lastId];
					this.lastId++;
				}
			}
		}
		setTimeout(() => {
			event.target.complete();
			if( this.lastId >= this.dataSmarthome.length){
				event.target.enable = false;
			}
		}, 500);
	}
	
	public doRefresh(refresher){
		this.dataSmarthome = [] ;
		this.filterDataSmarthome = [] ;
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.getItems();
	}
	
	public ngOnInit(){
		this.dataSmarthome = [] ;
		this.filterDataSmarthome = [] ;
		this.getItems();
	}
	allon(){
		if(this.server!==null){
			this.smarthomeService.urlListItem=this.server['server']+"&allon";
			this.smarthome = this.smarthomeService.list();
			this.smarthome.subscribe(data=>{
				this.ngOnInit();
			});
		}
	}
	alloff(){
		if(this.server!==null){
			this.smarthomeService.urlListItem=this.server['server']+"&alloff";
			this.smarthome = this.smarthomeService.list();
			this.smarthome.subscribe(data=>{
				this.ngOnInit();
			});
		}
	}
	sChange(e,gpio){
		if(this.server!==null){
			this.smarthomeService.urlListItem=this.server['server']+"&toggle="+gpio;
			this.smarthome = this.smarthomeService.list();
			this.smarthome.subscribe(data=>{
				this.ngOnInit();
			});
		}
    }



}
