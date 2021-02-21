import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-dress-sub-type',
  templateUrl: './dress-sub-type.component.html',
  styleUrls: ['./dress-sub-type.component.css']
})
export class DressSubTypeComponent implements OnInit {
  lang='English'
  aedata;
  imageurl: string;
  subtypearray: any;


  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+'DressSubType/'
    // this.params.queryParams.subscribe(res=>{
    //   console.log('res',res['dressId'])
    //   this.getAllDresssubType(res['dressId'])
    // })
    
    this.getAllDresssubType()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllDresssubType(){
    var dressId=getNumber('dressId')
    var TailorId=getNumber("userId")
    this.api.GetallDressSubType(dressId,TailorId).subscribe(res=>{
      console.log('subtype',res)
      this.subtypearray=res['Result']
    })
  }
  gotodetails(Id){
    setNumber('subdressdressId',Id)
    this.router.navigate(['/DressDetailComponent'],{queryParams:{'subtypeId':Id}}) 
  }
  goBack(){
    this.router.navigate(['/DressTypeComponent'])
  }

}
