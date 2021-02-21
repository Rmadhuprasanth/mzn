import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-goto-country',
  templateUrl: './goto-country.component.html',
  styleUrls: ['./goto-country.component.css']
})
export class GotoCountryComponent implements OnInit {
  lang='English'
  aedata;
  imageurl: string;
  countries: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+'Flags/'
    this.getcountry()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }

  getcountry() {
    this.api.getcountry().subscribe((result) => {
          console.log('re',result)
          this.countries=result['Result']
        }, (error) => { 
            console.log(error); 
        });
}
  goBack(){
    this.router.back()
  }
  gotostate(Id){
    
    setNumber('countryId',Id)
this.router.navigate(['/GotoStateComponent'],{queryParams:{'countryId':Id}})
  }
}
