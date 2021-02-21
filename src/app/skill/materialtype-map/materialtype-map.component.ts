import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-materialtype-map',
  templateUrl: './materialtype-map.component.html',
  styleUrls: ['./materialtype-map.component.css']
})
export class MaterialtypeMapComponent implements OnInit {
  lang='English'
  aedata;
material=[{'id':'1'},{'id':'1'},{'id':'1'}]
checkimg='~/assets/dashbord/Unchecked.png'
checkval='false'
checkimgcompany="~/assets/dashbord/Unchecked.png"
checkvalcompany="false"
checkimgCourier="~/assets/dashbord/Unchecked.png"
checkvalCourier="false"
checkimgDirect="~/assets/dashbord/Unchecked.png"
checkvalDirect="false"
  MaterialTypearray: any;
  ordertypedata;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.ordertypedata=[]
    this.getMaterialType()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getMaterialType(){
    var TailorId=getNumber("userId")
    this.api.getmaterialType(TailorId).subscribe(res=>{
      this.MaterialTypearray=res['Result']
      this.MaterialTypearray.map((x,i)=>{
        if(x['Switch'] == true){
            this.ordertypedata.push({'Id':x['id']})
        }
      })
      
    })
  }
  getcheckvalcompany(checkvalcompany,Id){
  console.log('vall',checkvalcompany,Id)
  if(checkvalcompany == 'false'){
    this.MaterialTypearray.map((x,i)=>{
      if(x['id'] == Id){
        this.MaterialTypearray[i]['Switch']=true
          this.ordertypedata.push({'Id':Id})
      }
    })
    console.log('this.ordertypedata',this.ordertypedata)
  }else if(checkvalcompany == 'true'){
    this.MaterialTypearray.map((x,i)=>{
      if(x['id'] == Id){
        this.MaterialTypearray[i]['Switch']=false
        this.ordertypedata = this.ordertypedata.filter(e => e['Id'] !== Id)
      }
    })
    
    console.log('this.uncheck',this.ordertypedata)
  }
  }
  

  insertMaterialType(){
    var TailorId=getNumber("userId")
  let temp={
    "TailorId":TailorId,
"OrderTypeId":this.ordertypedata
  }
  this.api.insertmaterialType(temp).subscribe(res=>{  
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
