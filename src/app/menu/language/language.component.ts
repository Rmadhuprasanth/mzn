import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  lang='English'
  aedata;
  loader='false'
  langarray=[{'Id':'1','Name':'English','identifier':'English'},{'Id':'2','Name':'Arabic','identifier':'عربى'}]
  selectedlang: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    
   this.lang= localStorage.getItem('Language')
   this.getaedat()
    this.selectedlang= localStorage.getItem('Language')
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  selectLang(lang){
    this.selectedlang=lang
  }
  setLang(){
    localStorage.setItem('Language', this.selectedlang)
    this.router.navigate(['/SettingsComponent'])
  }
  goBack(){
    this.router.navigate(['/SettingsComponent'])
  }
}
