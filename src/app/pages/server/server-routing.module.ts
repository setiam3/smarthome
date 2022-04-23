/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServerPage } from "./server.page";

const routes: Routes = [
	{
		path: "",
		component: ServerPage,
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ServerPageRoutingModule {}
