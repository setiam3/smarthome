/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { SafeHtml } from "@angular/platform-browser";

/**
 * TrustHtml pipe
 * Display HTML without sanitizing/filtering

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "trustHtml",
})

export class TrustHtmlPipe implements PipeTransform {

	constructor(
		public domSanitizer: DomSanitizer
	){



	}

	transform(value:any): SafeHtml{

			return this.domSanitizer.bypassSecurityTrustHtml(value);


	}
}
