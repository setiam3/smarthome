/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";
		

		
@Component({
	selector: "app-image-zoom",
	templateUrl: "./image-zoom.component.html",
	styleUrls: ["./image-zoom.component.scss"],
})
		
		
export class ImageZoomComponent implements OnInit {
		
	/**
	* ImageZoomComponent:constructor()
	**/
	constructor(
		public navParams: NavParams,
		public modalController: ModalController
	){
		
		

		
	}
	
	
	
	img:any;
	
	@ViewChild("slider", { read : ElementRef , static : false }) slider:ElementRef;	
	sliderOpts:any= {
		passiveListners:true,
		zoom:{
			maxRatio: 3
		},
	}
	
	ngOnInit(){
		this.img = this.navParams.get(`img`);
		console.log(`Using a mouse is not recommended`);
	}
	
	
	zoom(ZoomIn:boolean){
		let zoom = this.slider.nativeElement.swiper.zoom ;
		if(ZoomIn == true){
			zoom.in();
		}else{
			zoom.out();
		}
	}
	
	
	close(ev){
		this.modalController.dismiss();
	}

		
		
}
