/**
* @author azietuasikal <setiam3@gmail.com>
* @copyright Smarthome 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-04-20 02:36:25
**/

import { Injectable } from "@angular/core";

@Injectable()

export class AppSideMenus{
	items:any = [
    {
        "item_type": "title",
        "item_label": "Dashboard",
        "item_var": "dashboard",
        "item_link": "\/home",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "home",
        "item_color_icon_left": "default",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Menu 1",
        "item_var": "menu_1",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "color-filter-sharp",
        "item_color_icon_left": "secondary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "title",
        "item_label": "Help",
        "item_var": "help",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "help-circle",
        "item_color_icon_left": "default",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "playstore",
        "item_label": "Rate This App",
        "item_var": "rate_this_app",
        "item_link": "\/",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "logo-google-playstore",
        "item_color_icon_left": "primary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "Privacy Policy",
        "item_var": "privacy_policy",
        "item_link": "\/privacy-policy",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "lock-closed-outline",
        "item_color_icon_left": "secondary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "FAQs",
        "item_var": "faqs",
        "item_link": "\/faqs",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "help-circle",
        "item_color_icon_left": "secondary",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    },
    {
        "item_type": "inlink",
        "item_label": "About US",
        "item_var": "about_us",
        "item_link": "\/about-us",
        "item_value": "",
        "item_desc": "",
        "item_color_label": "default",
        "item_icon_left": "people-circle",
        "item_color_icon_left": "danger",
        "item_icon_right": "",
        "item_color_icon_right": "default"
    }
] ;

}
