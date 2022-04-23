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
 * Translate pipe
 * Just error prevention

 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */


@Pipe({
	name: "translate",
})

export class TranslatePipe implements PipeTransform {

	constructor(
		
	){



	}

	transform(value:string): string{

			return value;


	}
}
