import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog"
import { CategoryModalComponent } from '~/app/common/category-modal/category-modal.component';
import { CameramodalComponent } from '~/app/common/cameramodal/cameramodal.component';
import * as Camera from "nativescript-camera";

import * as fileupload from "nativescript-background-http"
import { CountryDialogComponent } from '~/app/authentication/country-dialog/country-dialog.component';
import * as imagepicker from "nativescript-imagepicker";
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";
import { Guid } from "guid-typescript";
import { Toasty, ToastPosition } from 'nativescript-toasty';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from 'tns-core-modules/ui/page';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-new-product-mapp',
  templateUrl: './new-product-mapp.component.html',
  styleUrls: ['./new-product-mapp.component.css']
})
export class NewProductMappComponent implements OnInit {  
  lang='English'
  aedata;
  sizearray: any;
  colorarrray;
  selectedSize;
  selectedcolor;
  brandarray;
  selectedbrand;
  public guiid: Guid;
  updatedata;
  CatogeryId: any;
  imagename;
  slectedimg;
  showshopimgs;
  imgparams;
  ownprimg='~/assets/dashbord/Unchecked.png';
  ownproductcheck=false
  loader='false'
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute
    ,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,private page: Page,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
  
    this.imgparams=[]
    this.slectedimg="~/assets/productmapp/prodBg.jpg";
    this.imagename=[]
    this.showshopimgs=[]
    this.updatedata={
      "ProductName":null,
      "ProductDescription":null,
      "Amount":null,
      "ProductNameInArabic":null,
      "ProductDescriptionInArabic":null,
      "SKU":null,
    }
    this.guiid = Guid.create();
    this.selectedSize=[]
    this.selectedcolor=[]
    this.selectedbrand=[]
  this.getcolor()
  this.getBrand()
  this.getSize()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getcolor(){
    this.api.getColor().subscribe(color=>{
      this.colorarrray=color
      this.colorarrray = this.colorarrray.filter(e => (e['ColorCode'] !== "#FF0000\t" && e['ColorCode'] !== "#800000\t" && e['ColorCode'] !== "this.colorvalue"))
      this.colorarrray.map((x,i)=>{
this.colorarrray[i]['IsMapped']=false
      })
      
// console.log('tttt',JSON.stringify(this.colorarrray))
    })
  }
  getBrand(){
    this.api.getBrand().subscribe(brand=>{
      this.brandarray=brand
      this.brandarray.map((x,i)=>{
this.brandarray[i]['IsMapped']=false
      })
    })
  }
  getSize(){
    this.api.getSize().subscribe(size=>{
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
        
        console.log('this.uncheck', this.colorarrray)
      }
    }
    getcheckvalbrand(brandcheck,Id){
      console.log('vall',brandcheck,Id)
      this.brandarray.map((x,i)=>{
          this.brandarray[i]['IsMapped']=false
      });

      if(brandcheck == false){
        this.brandarray.map((x,i)=>{
          if(x['Id'] == Id){
            this.brandarray[i]['IsMapped']=true
              this.selectedbrand=Id
          }
        })
        console.log('this.ordertypedata',this.selectedbrand)
      }else if(brandcheck == true){
        this.brandarray.map((x,i)=>{
          if(x['Id'] == Id){
            this.brandarray[i]['IsMapped']=false
          }
        })
        
        console.log('this.uncheck',this.selectedbrand)
      }
    }
    opencategormodal(){
      
      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context:{lengths:this.CatogeryId} 
      };
      this.modalService.showModal(CategoryModalComponent, options).then(res => {
        console.log('rerrr', res);
        this.CatogeryId=res
      })
    }

    gotocammadal() {
      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: {}
      };
      this.modalService.showModal(CameramodalComponent, options).then(res => {
        console.log('rerrr', res);
        if (res == 'Camera') {
          this.openprofilecamera()
        } else if (res == 'Gallery') {
          this.openprofilegallery()
        }
      });
    }
    removeimg(img){
      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context:{ alerttxt: "Are you sure want to Remove ?", alerttxtae:"هل أنت متأكد من رغبتك بالحذف؟" }
      };
      this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
        console.log('rerrr', res);
        setTimeout(() => {
            if(res == 'true'){
              this.showshopimgs.map(x=>{
                if(x['small'] == img){
                  this.showshopimgs = this.showshopimgs.filter(e => e['small'] !== img)
                  if(this.showshopimgs.length !=0){
                  this.showshopimgs.map(y=>{
                  
                    this.slectedimg=y['small'] 
                  })
                  }else{
                    this.slectedimg="~/assets/productmapp/prodBg.jpg"
                  }
                }
              });
              this.imgparams.map((x,i)=>{
                if(x['filename'] == img['_android']){
                  this.imgparams = this.imgparams.filter(e => e['filename'] !== img['_android'])
                }
              console.log('this.imgparams', this.imgparams);
              })
            }
        },500)
      })
      
    }
    gettappedimages(img){
      this.slectedimg=img
    }
    isownproduct(isOwn){
      if(isOwn == false){
        this.ownproductcheck=true
        this.ownprimg='~/assets/dashbord/Check box.png'
      }else{
        
        this.ownproductcheck=false
        this.ownprimg='~/assets/dashbord/Unchecked.png'
      }
    }
 insertnewProduct(){
  
   const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context:{ alerttxt: "Are you sure want to Add Product!", alerttxtae:"هل تريد إضافة منتج جديد؟" }
  };
  this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
    console.log('rerrr', res);
    this.loader='true'
    setTimeout(() => {
        if(res == 'true'){
   let sleimgs=[]
   if( this.imgparams.length !=0){
  this.imgparams.map(x=>{
    sleimgs.push([{ name: "Guid", value:this.guiid['value']},x])
  })
  sleimgs.map((x,i)=>{
     console.log('x',x)
     var url = this.api.serverUrl+'/FileUpload/ImageUploadFile?';
     var session = fileupload.session("Products");
     var request = {
       url: url,
       method: "POST",
       headers: {
         "Content-Type": "multipart/form-data",
         'Accept': '*/*',
       },
       fileKey: 'Products',
       description: "Uploading ",
       androidAutoDeleteAfterUpload: false,
       androidNotificationTitle: 'Products',
     };
     
     console.log('ggggg',this.imgparams)
     var task = session.multipartUpload(x, request);
   
     task.on("error", (e) => {
       console.log(`Error processing upload ${e.responseCode} code.`);
     });
     task.on("responded", (e) => {
       console.log(` upload ${e} `);
       let img = JSON.parse(e.data)
       var datasurl = JSON.stringify(img["Result"]).replace(/\[|\]/g, "")
       datasurl = datasurl.replace(/[{}]/g,"");
       let profileimgs = datasurl.replace(/^.*[\\\/]/, '')
      let finalimgName=profileimgs.replace(/['"]+/g, '')
       this.imagename.push({'Image':finalimgName})
       
       console.log("this.imagename",this.imagename);
       if(this.imagename){

       if(this.selectedSize.length !=0){
        this.selectedSize
       }else{
        this.selectedSize=[{'Id':''}]
       };
       if(this.selectedcolor.length !=0){
        this.selectedcolor
       }else{
        this.selectedcolor=[{'Id':''}]
       }

               var TailorId=getNumber("userId")
               let data={
                 "ProductId":this.guiid['value'],
               "CategoryId":  this.CatogeryId,
               "ProductName":this.updatedata['ProductName'],
               "ProductDescription":this.updatedata['ProductDescription'],
               "Amount":this.updatedata['Amount'],
               "ProductImage":this.imagename,
               "IsActive":"true",
               "SKU":this.updatedata['SKU'],
               "CreatedBy":"1",
               "BrandId":this.selectedbrand,
               "SizeId":this.selectedSize,
               "ColorId":this.selectedcolor,
               "ProductNameInArabic":this.updatedata['ProductNameInArabic'],
               "ProductDescriptionInArabic":this.updatedata['ProductDescriptionInArabic'],
               "sellerId":TailorId,
               "Type":"tailor",
               "IsOwnProduct":this.ownproductcheck,
              }
              console.log('res', this.CatogeryId)
              if(data['Amount'] !=null && data['SKU'] !=null &&  data['ProductId'] !=null  &&  data['ProductName'] !=null  &&  data['ProductDescription'] !=null  &&  data['ProductImage'].length !=0
              &&   data['sellerId'] !=null  &&  data['ProductNameInArabic'] !=null  &&  data['ProductDescriptionInArabic'] !=null){
       
               this.api.insertNewProduct(data).subscribe(res=>{
                 console.log('res',res)
                 if(res != null){
                   const toast = new Toasty({ text: 'SuccessFully Added' });
                   toast.textColor = '#fff';
                   toast.backgroundColor ='gray';
                    toast.show();
                   this.router.navigate(['/skillupdate'],{queryParams:{'pageid':'fromnewproduct'}})
                   this.loader='false'
      this.page.actionBarHidden = false;
                 }else{
                   const toast = new Toasty({ text: 'Please select all the Fields !' });
                   toast.textColor = '#fff';
                   toast.backgroundColor ='gray';
                    toast.show();
                    this.loader='false'
      this.page.actionBarHidden = false;
                 }
               },error=>{
                //  if(error){
                //    const toast = new Toasty({ text: 'Error While Updating !' });
                //    toast.textColor = '#fff';
                //    toast.backgroundColor ='rgb(184, 184, 184)';
                //    toast.position=ToastPosition.CENTER
                //     toast.show();
                //  }
                if(error){
console.log('eerr',error)
                  dialogs.alert("Error try again !").then(()=> {
                  });
                  this.loader='false'
                  this.page.actionBarHidden = false;
                }
               })
       
              }else{
                if(this.lang=='English'){
                  dialogs.alert("Please Fill All the fields !").then(()=> {
                  });
                }else{
                dialogs.alert("الرجاء تحديث جميع البيانات").then(()=> {
                });
                }
               this.loader='false'
               this.page.actionBarHidden = false;
              }
         
       }
   
     });
   
     task.on("complete", (e) => {
       console.log(`upload complete!`, JSON.stringify(e));
     });
   })
  }else{
    if(this.lang=='English'){
      dialogs.alert("Please Add Product Image !").then(()=> {
      });
      
  this.loader='false'
  this.page.actionBarHidden = false;
    }else{
      dialogs.alert("الرجاء إضافة صورة عن المنتج").then(()=> {
      });
      
  this.loader='false'
  this.page.actionBarHidden = false;
    }
  }
}else{
  this.loader='false'
  this.page.actionBarHidden = false;
}
             
}, 1000);
});

 

 }
  goBack(){
    this.router.navigate(['/skillupdate'],{queryParams:{'pageid':'fromnewproduct'}})
  } 



  // <==========================camera====================================>
  openprofilecamera() {
    var that=this
    Camera.requestPermissions().then(
    function success() {
    Camera.takePicture().then(picture => {
      that.slectedimg=picture
      that.showshopimgs.push({'small':picture}) 
      that.imgparams.push({ name:"Products", filename:picture["_android"] })
    })
  }
    )
  }



  // =================================gallery-upload====================================>
  openprofilegallery() {
    var that=this
    var context = imagepicker.create({
      mode: "single"
    });

    context.authorize().then(function () {
      return context.present();
    }).then(function (selection) {
      selection.forEach(function(selected) {
        that.slectedimg=selected
        that.showshopimgs.push({'small':selected}) 
        // that.imgparams.push([{ name: "Guid", value:that.guiid['value']},{ name:"Products", filename:selected["_android"], fileKey:'Products' }])
        that.imgparams.push({ name:"Products", filename:selected["_android"] })
        // console.log("img",that.imgparams);
    });
    }).catch(function (e) {
      console.log(e);
    });


  }




}
