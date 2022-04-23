/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { Pipe, PipeTransform } from "@angular/core";

/**
 * PhpTime pipe
 * Used to change the php format timestamp to JavaScript format

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "phpTime",
})

export class PhpTimePipe implements PipeTransform {

	constructor(
		
	){



	}

	transform(num:string): number{

			return parseInt(num) * 1000 ;

	}
}
