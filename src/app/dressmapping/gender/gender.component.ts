import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {
  lang='English'
  aedata;
  imageurl: string;
  gendersarray: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl
    this.getallGenders()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getallGenders(){
    this.api.GetallGenders().subscribe(res=>{
      console.log('res',res)
      this.gendersarray=res['Result']
    })
  }
  gotodressType(Id){
    setNumber('genderId',Id)
    this.router.navigate(['/DressTypeComponent'],{queryParams:{'genderId':Id}}) 
  }
  goBack(){
    this.router.back()
  } 
}
