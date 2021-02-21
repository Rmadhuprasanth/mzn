import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog"
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { ActivatedRoute } from '@angular/router';
import { Page } from "tns-core-modules/ui/page";

import { topmost } from 'tns-core-modules/ui/frame';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-skillupdate',
  templateUrl: './skillupdate.component.html',
  styleUrls: ['./skillupdate.component.css']
})
export class SkillupdateComponent implements OnInit {
  lang='English'
  aedata;
  selectedindexval: string;
  selectedheaders: string;
  imagurl: string;
  prodctsarray: any;
  rmvalue='false'
  showcloseicon: boolean;
  Removetxt="Remove"
  Removetxtae="حذف"
  tailoeimgurl: string;
  profilImageURL: string;
  loader='false'
  constructor(private page: Page,private router: RouterExtensions,public api:ApiServiceService,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.loader='true'
    setTimeout(() => {
      this.loader='false'
      this.page.actionBarHidden = false;
    }, 1000);
    remove('productId')
    this.params.queryParams.subscribe(x=>{
      if(x['pageid']){
        this.selectedheaders='1'
      }else{
        this.selectedindex('2')
        this.selectedheader('0')
      } 
    })
    this.tailoeimgurl = this.api.imageurl + 'TailorImages/'
    this.imagurl=this.api.imageurl+'Products/'
   
    this.getmappedproducts()
    this.getTailorProfile()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
getTailorProfile() {
  var TailorId = getNumber("userId");
  this.api.getTailorProfile(TailorId).subscribe(res => {
    let data = res['Result']
    this.profilImageURL= this.tailoeimgurl + data[0]['ShopOwnerImageURL']
  })
}
selectedheader(val){
  if(val=='0'){
    this.selectedheaders='0'
  }else if(val=='1'){
    this.selectedheaders='1'
  }
  }  
  selectedindex(val){
    if(val=='0'){
  
      this.router.navigate(['/homenew'])  
      this.selectedindexval='0'
    }else if(val=='1'){
      this.router.navigate(['/StorelistComponent']) 
      this.selectedindexval='1'
    }else if(val=='2'){   
      this.router.navigate(['/skillupdate']) 
      this.selectedindexval='2'
    }else if(val=='3'){
      this.router.navigate(['/Profile']) 
      this.selectedindexval='3'
    }
  }
getmappedproducts(){
  var TailorId=getNumber("userId")
  this.api.getmappedproducts(TailorId).subscribe(res=>{
    console.log('prod',res)
    this.prodctsarray=res['products']
  })
}
showremove(vall){
  if(vall == 'true'){
this.rmvalue='false'
this.showcloseicon=false
this.Removetxt="Remove"
  }else{
  this.showcloseicon=true
this.rmvalue='true'
this.Removetxt="cancel"
  }
}
showremoveae(vall){
  if(vall == 'true'){
this.rmvalue='false'
this.showcloseicon=false
this.Removetxtae="حذف"
  }else{
  this.showcloseicon=true
this.rmvalue='true'
this.Removetxtae="إلغاء"
  }
}
deletemappedProducts(prId){
  var TailorId=getNumber("userId")
let data={
  "Id":prId,
"Sellerid":TailorId
}
const options: ModalDialogOptions = {
  viewContainerRef: this.viewContainerRef,
  fullscreen: false,
  context:{ alerttxt: "Are you sure want to Delete!", alerttxtae:"هل أنت متأكد من رغبتك بالحذف؟" }
};
this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
  console.log('rerrr', res);
  setTimeout(() => {
      if(res == 'true'){
        this.api.deletemappedproducts(data).subscribe(res=>{
          console.log('ress',res) 
          this.getmappedproducts()
        })
               }
      
  }, 1000);
});
}
gotomappeddetails(prodId){
  console.log('id',prodId)
this.router.navigate(['/ProductDetailComponent'],{queryParams:{'productId':prodId}})
}
  gotomaterialmap(){
    this.router.navigate(['/material'])
  }
  gotodressMap(){
    this.router.navigate(['/GenderComponent'])
    
  }
  gotomaterialtype(){
    
    this.router.navigate(['/MaterialtypeMapComponent'])
  }
  gotomeasurementtype(){
    
    this.router.navigate(['/MeasurementMapComponent'])
  }
  gotostitchtimetype(){
    
    this.router.navigate(['/StitchtimeMapComponent'])
  }
  gotoshoBranches(){
    this.router.navigate(['/GotoBranchComponent'])

  }
  gotoproductList(){
    // this.router.navigate(['/ProductListComponent'])
    topmost().navigate('/ProductListComponent')
  }
  gotoaddnewproduct(){
    this.router.navigate(['/NewProductMappComponent'])
  }
  gotoNotifications(){
    this.router.navigate(['/NotificationsComponent'])
  
  }
}
