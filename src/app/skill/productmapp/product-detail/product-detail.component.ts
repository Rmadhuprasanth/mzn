import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog"
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';

import { Page } from "tns-core-modules/ui/page";
import { Toasty, ToastPosition } from 'nativescript-toasty';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({ 
  selector: 'ns-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  lang='English'
  aedata;
  myData=[{'Id':1},{'Id':2}]
  sizearray: any;
  colorarrray;
  bgimg= "url('~/assets/background.jpg')"
  selectedSize;
  selectedcolor;
  productdetailsarray;
  imagurl: string;
  catId;
  prodImages: any;
  isactiveimg='~/assets/dashbord/Unchecked.png';
  isactivecheck=false
  editonlyisActive: boolean;
  loader='false'
  pageid: string;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute, private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,private page: Page,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.loader='true'
    // setTimeout(() => {
    //   this.loader='false'
    //   this.page.actionBarHidden = false;
    // }, 1000);
    this.getcolor()
    this.getSize()
    this.catId=[]
    this.prodImages=[]
    this.selectedSize=[]
    this.selectedcolor=[]
    this.imagurl=this.api.imageurl+'Products/' 
    this.productdetailsarray={
         "Id":"",
         "CategoryId":"",
         "CategoryName":"",
         "ProductName":"",
         "ProductDescription":"",
         "ProductImage":"",
         "SKU":null,
         "SellerId":"",
         "ProductDescriptionInArabic":"",
         "IsProduct":"",
         "BrandName":"",
         "NewPrice":"",
         "Amount":null,
         "IsActive":"",
    }
  this.params.queryParams.subscribe(x=>{
    if(x['productId']){
this.getmappedDetails(x['productId'])
this.pageid='skill'
this.editonlyisActive=true
    }else{
      this.getproductdetails()
    }
  })

  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getproductdetails(){
    let productId=getString("productId")
    if(productId){
      this.api.getproductlistdetails(productId).subscribe(detail=>{
console.log('detail',detail)
if(detail['productImages']){
this.myData=detail['productImages']
}
if(detail['products']['CategoryId']){
  this.catId.push({'Id':detail['products']['CategoryId']})
}
if(detail['products']){
this.productdetailsarray['Id']= detail['products']['Id']
this.productdetailsarray['CategoryId']= detail['products']['CategoryId']
this.productdetailsarray['CategoryName']= detail['products']['CategoryName']
this.productdetailsarray['ProductName']= detail['products']['ProductName']
this.productdetailsarray['ProductDescription']= detail['products']['ProductDescription']
this.productdetailsarray['ProductImage']= detail['products']['ProductImage']
this.productdetailsarray['SKU']= detail['products']['SKU']
this.productdetailsarray['SellerId']= detail['products']['SellerId']
this.productdetailsarray['ProductDescriptionInArabic']= detail['products']['ProductDescriptionInArabic']
this.productdetailsarray['IsProduct']= detail['products']['IsProduct']
this.productdetailsarray['BrandName']= detail['products']['BrandName']
this.productdetailsarray['NewPrice']= detail['products']['NewPrice']
this.productdetailsarray['Amount']= detail['products']['Amount']
this.productdetailsarray['IsActive']= detail['products']['IsActive']
if(detail['products']['IsActive'] == true){
  this.isactivecheck=true
  this.isactiveimg='~/assets/dashbord/Check box.png'
  this.productdetailsarray['IsActive']=true
}else{
  this.isactivecheck=false
  this.isactiveimg='~/assets/dashbord/Unchecked.png'
  this.productdetailsarray['IsActive']=false
}
  
}
this.loader='false'
this.page.actionBarHidden = false;
      })
    }
  }

  getmappedDetails(productId){
    var TailorId=getNumber("userId")
    this.api.getmappedproddetails(productId,TailorId).subscribe(detail=>{
console.log('res',detail)
  if(detail['products']['CategoryId']){
    this.catId.push({'Id':detail['products']['CategoryId']})
  }
 
  if(detail['products']){
  this.productdetailsarray['Id']= detail['products']['Id']
  this.productdetailsarray['CategoryId']= detail['products']['CategoryId']
  this.productdetailsarray['CategoryName']= detail['products']['CategoryName']
  this.productdetailsarray['ProductName']= detail['products']['ProductName']
  this.productdetailsarray['ProductDescription']= detail['products']['ProductDescription']
  this.productdetailsarray['ProductImage']= detail['products']['ProductImage']
  this.productdetailsarray['SKU']= detail['products']['SKU']
  this.productdetailsarray['SellerId']= detail['products']['SellerId']
  this.productdetailsarray['ProductDescriptionInArabic']= detail['products']['ProductDescriptionInArabic']
  this.productdetailsarray['IsProduct']= detail['products']['IsProduct']
  this.productdetailsarray['BrandName']= detail['products']['BrandName']
  this.productdetailsarray['NewPrice']= detail['products']['NewPrice']
  this.productdetailsarray['Amount']= detail['products']['Amount']
  this.productdetailsarray['IsActive']= detail['products']['IsActive']
  if(detail['products']['IsActive'] == true){
    this.isactivecheck=true
    this.isactiveimg='~/assets/dashbord/Check box.png'
    this.productdetailsarray['IsActive']=true
  }else{
    this.isactivecheck=false
    this.isactiveimg='~/assets/dashbord/Unchecked.png'
    this.productdetailsarray['IsActive']=false
  }
  };
  
if(detail['productImages'].length !=0){
  this.myData=detail['productImages']
  }

  if(detail['sizes']){
    for(let i=0; i<detail['sizes'].length; i++){
      for(let j=0; j<this.sizearray.length; j++){
        if(detail['sizes'][i]['Id'] == this.sizearray[j]['Id']){
          this.sizearray[j]['IsMapped']=true
          this.selectedSize.push({'Id':detail['sizes'][i]['Id']})
        }
      }
    }
  }
  if(detail['colors'].length !=0){
    let colorarr=detail['colors']
    for(let i=0; i<colorarr.length; i++){
      for(let j=0; j<this.colorarrray.length; j++){
        if(colorarr[i]['Id'] == this.colorarrray[j]['Id']){
          this.colorarrray[j]['IsMapped']=true
          this.selectedcolor.push({'Id':colorarr[i]['Id']})
        }
      }
    }
  };
  this.loader='false'
  this.page.actionBarHidden = false;
    })
  }
  getcolor(){
    this.api.getColor().subscribe(color=>{
      this.colorarrray=color
      this.colorarrray = this.colorarrray.filter(e => (e['ColorCode'] !== "#FF0000\t" && e['ColorCode'] !== "#800000\t" && e['ColorCode'] !== "this.colorvalue"))
      this.colorarrray.map((x,i)=>{
this.colorarrray[i]['IsMapped']=false
      })
      // console.log('colorarrray',this.colorarrray)
    })
  }
  getBrand(){
    this.api.getBrand().subscribe(brand=>{
      console.log('brand',brand)
    })
  }
  getSize(){
    this.api.getSize().subscribe(size=>{
      // console.log('size',size)
      this.sizearray=size
    })
  }

  getcheckvalsize(checkvalcompany,Id){
    if(checkvalcompany == false){
      this.sizearray.map((x,i)=>{
        if(x['Id'] == Id){
          this.sizearray[i]['IsMapped']=true
            this.selectedSize.push({'Id':Id})
        }
      })
    }else if(checkvalcompany == true){
      this.sizearray.map((x,i)=>{
        if(x['Id'] == Id){
          this.sizearray[i]['IsMapped']=false
          this.selectedSize = this.selectedSize.filter(e => e['Id'] !== Id)
        }
      })
    }
    }
    getcheckvalcolor(colorcheck,Id){
      console.log('vall',colorcheck,Id)
      if(colorcheck == false){
        this.colorarrray.map((x,i)=>{
          if(x['Id'] == Id){
            this.colorarrray[i]['IsMapped']=true
              this.selectedcolor.push({'Id':Id})
          }
        })
        console.log('this.ordertypedata',this.selectedcolor)
      }else if(colorcheck == true){
        this.colorarrray.map((x,i)=>{
          if(x['Id'] == Id){
            this.colorarrray[i]['IsMapped']=false
            this.selectedcolor = this.selectedcolor.filter(e => e['Id'] !== Id)
          }
        })
        
        console.log('this.uncheck',this.selectedcolor)
      }
    }
    isActive(isActive){
      if(isActive == false){
        this.isactivecheck=true
        this.isactiveimg='~/assets/dashbord/Check box.png'
        this.productdetailsarray['IsActive']=true
      }else{
        this.isactivecheck=false
        this.isactiveimg='~/assets/dashbord/Unchecked.png'
        this.productdetailsarray['IsActive']=false
      }
    }
    insertproduct(){  
      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context:{ alerttxt: "Are you sure want to Map this Product!", alerttxtae:"هل تريد تعيين هذا المنتج؟" }
      };
      this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
        console.log('rerrr', res);
        setTimeout(() => {
            if(res == 'true'){
              if(this.selectedSize.length != 0){
                this.selectedSize
              }else{
                this.selectedSize=[{"Id":''}]
              };
              if(this.selectedcolor.length != 0 ){
                this.selectedcolor
              }else{
                this.selectedcolor=[{"Id":''}]
              }
              var TailorId=getNumber("userId")
              let data={
                "ProductId":this.productdetailsarray['Id'],
                "sellerId":TailorId,
                "SKU":this.productdetailsarray['SKU'],
                "price":this.productdetailsarray['Amount'],
                "SizeId": this.selectedSize,
                "ColorId":this.selectedcolor,
                "IsActive":this.productdetailsarray['IsActive'],
              }
              console.log('data',data) 
              if(data['price'] !=null && data['price'] !=0){
  if(data['SKU'] !=null){
    this.api.insertproductdetails(data).subscribe(res=>{
      console.log('res',res)
      if(res['Result'] == '1'){
        const toast = new Toasty({ text: 'SuccessFully Updated' });
        toast.textColor = '#fff';
        toast.backgroundColor ='gray';
         toast.show();
        this.router.navigate(['/skillupdate'],{queryParams:{'pageid':'proddetails'}})
      }else{
        const toast = new Toasty({ text: 'Select Amount !' });
        toast.textColor = '#fff';
        toast.backgroundColor ='gray';
        toast.position=ToastPosition.CENTER
         toast.show();
      }
    })
  }else{
    if(this.lang=='English'){
      dialogs.alert("Please Enter SkU !").then(()=> {
      });
    }else{
      dialogs.alert("أدخل كود نعريف المنتج").then(()=> {
      });
    }
  }

              }else{

                if(this.lang=='English'){
                  dialogs.alert("Please Enter Price!").then(()=> {
                  });
                }else{
                  dialogs.alert("الرجاء إدخال السعر").then(()=> {
                  });
                }
              }
            }
          })
          })
 
    }
  goBack(){
    if(this.pageid == 'skill'){

      this.router.navigate(['/skillupdate'],{queryParams:{'pageid':'proddetails'}})
    }else{
      
    this.router.navigate(['/ProductListComponent'])
    }
  } 
}
