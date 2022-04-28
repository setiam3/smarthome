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
import { AlertController } from "@ionic/angular";
import { SettingService } from "./../../services/setting/setting.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Storage } from "@ionic/storage-angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-setting",
	templateUrl: "setting.page.html",
	styleUrls: ["setting.page.scss"],
})

export class SettingPage {
	
	pageName:string = `setting` ;
	
	/**
	* SettingPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public alertController: AlertController,
		public settingService: SettingService,
		public formBuilder: FormBuilder,
		public storage: Storage,
		public popoverController: PopoverController,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#a60009");
	
	
this.store();
		console.log(`SettingPage`,`pageName`,this.pageName);
	}
	
	/**
	* SettingPage:showPopover()
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
	formSetting: FormGroup;
	responseSetting: Observable<any>;
	responseDataSetting: any = [];
	
	public resetFieldValues(){
		this.formSetting = this.formBuilder.group({
			server : ["", Validators.required],
			name : ["", Validators.required]
		});
	}

	public onSubmit(){
      this.storage.set('servers',this.formSetting.value);
      this.resetFieldValues();
      this.router.navigateByUrl('/smarthome');
	}

	async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			message: message,
			buttons: ["OK"]
		});
		await alert.present();
	}

	public ngOnInit(){
		this.resetFieldValues();
	}




}
