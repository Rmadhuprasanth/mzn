import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { registerElement } from 'nativescript-angular/element-registry';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { Page } from 'tns-core-modules/ui/page';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
registerElement('StarRating', () => require('nativescript-star-ratings').StarRating);

@Component({
  selector: 'ns-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  lang='English'
  aedata;
  value=4;
  max=5
  productlist: any;
  imagurl: string;
  loader='false'
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,private page: Page,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.loader='true'
    // setTimeout(() => {
    //   this.loader='false'
    //   this.page.actionBarHidden = false;
    // }, 1000);
    remove('productId')
    this.imagurl=this.api.imageurl+'Products/'
    this.getProductList()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getProductList(){
    var TailorId=getNumber("userId")
    this.api.getAllproductlist(TailorId).subscribe(res=>{
      console.log('res',res)
      this.productlist=res['products']
        this.loader='false'
      this.page.actionBarHidden = false;
    })
  }
  gotoproductdetails(productId){
    setString('productId',productId)
this.router.navigate(['/ProductDetailComponent'])
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
    this.router.navigate(['/skillupdate'])
  } 
}
