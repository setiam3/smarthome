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
import { SafeUrl } from "@angular/platform-browser";

/**
 * TrustUrl pipe
 * sanitizing URL

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "trustUrl",
})

export class TrustUrlPipe implements PipeTransform {

	constructor(
		public domSanitizer: DomSanitizer
	){



	}

	transform(value:any): SafeUrl{

			return this.domSanitizer.bypassSecurityTrustUrl(value);


	}
}
