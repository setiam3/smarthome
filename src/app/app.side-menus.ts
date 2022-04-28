/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-28 02:56:07
**/

import { Injectable } from "@angular/core";

@Injectable()

export class AppSideMenus{
	items:any = [
    {
        "item_type": "title",
        "item_label": "Dashboard",
        "item_var": "dashboard",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "home",
        "item_color_icon_left": "undefined",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    },
    {
        "item_type": "inlink",
        "item_label": "smarthome",
        "item_var": "smarthome",
        "item_link": "\/smarthome",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "undefined",
        "item_icon_left": "color-filter-sharp",
        "item_color_icon_left": "secondary",
        "item_icon_right": "",
        "item_color_icon_right": "undefined"
    }
] ;

}
