import { Component , OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { environment } from "./../../../../src/environments/environment";
import { Globals } from "../../class/globals/globals";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { CrudService } from '../../services/server/crud.service';
import { Storage } from '@ionic/storage-angular';


@Component({
	selector: "app-smarthome",
	templateUrl: "smarthome.page.html",
	styleUrls: ["smarthome.page.scss"],
})

export class SmarthomePage {
	saklars:any;
	pageName:string = `smarthome` ;
	sts:string;
	data;
	/**
	* SmarthomePage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public popoverController: PopoverController,
		private globals: Globals,
		private crud:CrudService,
		private storage:Storage
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#a60009");
		//crud.apiUrl="http://localhost:3000/server";
		crud.apiUrl="http://192.168.1.1/gpio/index3.php?key=passwordku&";
		//crud.apiUrl="/assets/data/data.json";
		this.store();
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
	
	async store(){
		await this.storage.create();
	}
	/**
	* SmarthomePage:ngOnInit()
	* @param string $url = 'http://ihsana.com/'
	**/
	public ngOnInit()
	{	
		this.storage.get('gpios').then(data=>{
			if(data!==null){
				this.saklars=data;
			}else{
				this.crud.apiUrl=this.crud.apiUrl.concat("list");
				this.crud.list().subscribe(
					data=>{
						this.saklars=data['gpios'];
						this.storage.set('gpios',data['gpios']);
					}
				);
			}
		});//
	} 
	
	sChange(name,id){}

	add(){
		this.data= {
			'id':5,
			'text':'sklr5',
			'ip':'192.127.1.2'
		}
		this.crud.create(this.data);
	}
}
