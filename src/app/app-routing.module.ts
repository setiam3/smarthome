/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		redirectTo: "smarthome",
		pathMatch: "full"
	},
	{
		path: "server",
		loadChildren: () => import("./pages/server/server.module").then(m => m.ServerPageModule)
	},
	{
		path: "setting",
		loadChildren: () => import("./pages/setting/setting.module").then(m => m.SettingPageModule)
	},
	{
		path: "smarthome",
		loadChildren: () => import("./pages/smarthome/smarthome.module").then(m => m.SmarthomePageModule)
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
