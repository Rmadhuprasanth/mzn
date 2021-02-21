import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-measurement-map',
  templateUrl: './measurement-map.component.html',
  styleUrls: ['./measurement-map.component.css']
})
export class MeasurementMapComponent implements OnInit {
  lang='English'
  aedata;
  checkimg='~/assets/dashbord/Unchecked.png'
  checkval='false'
  checkimgcompany="~/assets/dashbord/Unchecked.png"
  checkvalcompany="false"
  checkimgCourier="~/assets/dashbord/Unchecked.png"
  checkvalCourier="false"
  checkimgDirect="~/assets/dashbord/Unchecked.png"
  checkvalDirect="false"
  MeasurementsTypearray: any;
    ordertypedata;
    constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }
  
    ngOnInit(): void {
      this.lang= localStorage.getItem('Language')
      this.getaedat()
      this.ordertypedata=[]
      this.getMeasurementType()
    }
    getaedat(){
      this.aedata=this.aetext.getArabicConent()
    }
    getMeasurementType(){
      var TailorId=getNumber("userId")
      this.api.getGetMeasurements(TailorId).subscribe(res=>{
        console.log('esss',res)
        this.MeasurementsTypearray=res['Result']
        this.MeasurementsTypearray.map((x,i)=>{
          if(x['Switch'] == true){
              this.ordertypedata.push({'Id':x['Id']})
          }
        })
        
      console.log('this.uncheck',this.ordertypedata)
      })
    }
    getcheckvalcompany(checkvalcompany,Id){
    console.log('vall',checkvalcompany,Id)
    if(checkvalcompany == 'false'){
      this.MeasurementsTypearray.map((x,i)=>{
        if(x['Id'] == Id){
          this.MeasurementsTypearray[i]['Switch']=true
            this.ordertypedata.push({'Id':Id})
        }
      })
      console.log('this.ordertypedata',this.ordertypedata)
    }else if(checkvalcompany == 'true'){
      this.MeasurementsTypearray.map((x,i)=>{
        if(x['Id'] == Id){
          this.MeasurementsTypearray[i]['Switch']=false
          this.ordertypedata = this.ordertypedata.filter(e => e['Id'] !== Id)
        }
      })
      
      console.log('this.uncheck',this.ordertypedata)
    }
    }
    
  
    insertMeasurementType(){
      var TailorId=getNumber("userId")
    let temp={
      "TailorId":TailorId,
  "MeasurementTypeId":this.ordertypedata
    }
    this.api.insertMeasurementSkills(temp).subscribe(res=>{  
      console.log('res',res)
      if(res['Result']=='1'){
        this.router.navigate(['/skillupdate'])
      }
    })
    }
    goBack(){
      this.router.back()
    }
}
