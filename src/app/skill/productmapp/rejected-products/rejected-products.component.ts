import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { RouterExtensions } from 'nativescript-angular/router';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-rejected-products',
  templateUrl: './rejected-products.component.html',
  styleUrls: ['./rejected-products.component.css']
})
export class RejectedProductsComponent implements OnInit {
  lang='English'
  aedata;
  productlist: any;
  imagurl: string;
  showdata: boolean;
  showtext: boolean;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('rejectprId')
    this.imagurl=this.api.imageurl+'Products/'
    this.getrjectedProjects()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getrjectedProjects(){
  var TailorId=getNumber("userId")
  // var TailorId=398
  this.api.getRejectedProjects(TailorId).subscribe(res=>{
    console.log('res',res)
    this.productlist=res
    if(this.productlist.length !=0){
      this.showdata=true
      this.showtext=false
    }else{
      this.showdata=false
      this.showtext=true
    }
  })
}
gotorejectdetails(Id){
setString('rejectprId',Id)
this.router.navigate(['/RejectedDetailsComponent'])
}
searchItem(e){
  let search = e.value;
  if (search && search.trim() != '' ) {
    this.productlist = this.productlist.filter(data => {
      console.log('gh',data)
      if (data['ProductName'] != null && data['ProductName'] != undefined && data['ProductName'] != "") {
        return (data['ProductName'].toLowerCase().indexOf(search.toLowerCase()) > -1);
      }
    });
  } else {
    this.ngOnInit();
   }
}
goBack(){
  this.router.back()
} 

}
