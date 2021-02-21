import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog"
import { CameramodalComponent } from '~/app/common/cameramodal/cameramodal.component';
import * as Camera from "nativescript-camera";

import * as fileupload from "nativescript-background-http"
import { CountryDialogComponent } from '~/app/authentication/country-dialog/country-dialog.component';
import * as imagepicker from "nativescript-imagepicker";
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";
import { Guid } from "guid-typescript";
import { Toasty, ToastPosition } from 'nativescript-toasty';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-upload-promotion',
  templateUrl: './upload-promotion.component.html',
  styleUrls: ['./upload-promotion.component.css']
})
export class UploadPromotionComponent implements OnInit {
  lang='English'
  aedata;

  loader='false'
  showshopimgs: any;
  imgparams;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgparams=[]
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }


// =================================gallery-upload====================================>
openprofilegallery() {
  var that=this
  var context = imagepicker.create({
    mode: "multiple"
  });

  context.authorize().then(function () {
    return context.present();
  }).then(function (selection) {
    selection.forEach(function(selected) {
      that.showshopimgs=selected
      that.imgparams.push({ name:"offer", filename:selected["_android"] })
      console.log(';that.imgparams',that.imgparams);

  });
  
  }).catch(function (e) {
    console.log(e);
  });
}
remove(){
  this.showshopimgs=null
  this.imgparams=[]
}


insertbanner(){
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context:{ alerttxt: "Are you sure want to add New Promotion!", alerttxtae: "هل تريد إضافة عرض جديد؟"  }
  };
  this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
    setTimeout(() => {

        if(res == 'true'){ 
             this.loader='true'
          if(this.imgparams.length !=0){
            this.imgparams.map((x,i)=>{
                  var url = this.api.serverUrl+'/FileUpload/UploadFile?';
                  var session = fileupload.session("offer");
                  var request = {
                    url: url,
                    method: "POST",
                    headers: {
                      "Content-Type": "multipart/form-data",
                      'Accept': '*/*',
                    },
                    fileKey: 'offer',
                    description: "Uploading ",
                    androidAutoDeleteAfterUpload: false,
                    androidAutoClearNotification:false,
                    androidNotificationTitle: 'Banner',
                  };
               
                  var task = session.multipartUpload([x], request);
            
                  task.on("error", (e) => {
                    console.log(`Error processing upload ${e.responseCode} code.`);
                  });
                  
                  task.on("complete", (e) => {
                    console.log(`upload complete!`, JSON.stringify(e));
                  });
                  task.on("responded", (e) => {
                    let img = JSON.parse(e.data)
                    var datasurl = JSON.stringify(img["Result"]).replace(/\[|\]/g, "")
                    let profileimgs = datasurl.replace(/^.*[\\\/]/, '');
                    let imgname = profileimgs.replace(/"/g, "");
                    console.log(`imgname`, imgname);
            if(imgname){
              let temp=[{
                "Image": imgname.toString()
                }]
                console.log('data',temp)
              this.api.insertbannername(temp).subscribe(res1=>{
                console.log('hg',res1)
                if(res1['Result']=='1'){
                  if(this.lang=='English'){
                    this.api.showtoast('Banner uploaded!')
                  }else{
                    this.api.showtoast('تم رفع البانر بنجاح')
                  }  
                  this.loader='false'
                  this.page.actionBarHidden = false;
                  this.router.navigate(['/NewPromotionComponent'])
                
                }
              })
            }
                  });
                })
            
              }else{ 
                if(this.lang=='English'){
                  this.api.showtoast('please choose banner !')
                }else{
                  this.api.showtoast('الرجاء إختيار البانر')
                }
                   this.loader='false'
              this.page.actionBarHidden = false;
              }
        }else{
          this.loader='false'
          this.page.actionBarHidden = false;
        }
      })
    })
 
  }
  goBack(){
    this.router.navigate(['/PromotionHomeComponent'])
  }
}
