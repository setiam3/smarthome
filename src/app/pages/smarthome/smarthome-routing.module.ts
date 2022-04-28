/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmarthomePage } from "./smarthome.page";

const routes: Routes = [
	{
		path: "",
		component: SmarthomePage,
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SmarthomePageRoutingModule {}
