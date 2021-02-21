import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-dress-type',
  templateUrl: './dress-type.component.html',
  styleUrls: ['./dress-type.component.css']
})
export class DressTypeComponent implements OnInit {
  lang='English'
  aedata;
  imageurl: string;
  dresstypearray: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+'DressTypes/'
    // this.params.queryParams.subscribe(res=>{
    //   console.log('res',res['genderId'])
    //   this.getAllDressType(res['genderId'])
    // })
    
    this.getAllDressType()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllDressType(){
    var genderId=getNumber('genderId')
    var TailorId=getNumber("userId")
    this.api.GetallDressType(genderId,TailorId).subscribe(res=>{
      console.log('gend',res)
      this.dresstypearray=res['Result']
    })
  }
  gotodresssubType(Id){
    
    setNumber('dressId',Id)
    this.router.navigate(['/DressSubTypeComponent'],{queryParams:{'dressId':Id}}) 
  }
  goBack(){
    this.router.navigate(['/skillupdate'])
  } 
}
