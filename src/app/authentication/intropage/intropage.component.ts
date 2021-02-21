import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { CameramodalComponent } from '~/app/common/cameramodal/cameramodal.component';
import * as Camera from "nativescript-camera";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";
import * as fileupload from "nativescript-background-http"
import { CountryDialogComponent } from '~/app/authentication/country-dialog/country-dialog.component';
import * as imagepicker from "nativescript-imagepicker";
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system"
import { RouterExtensions } from 'nativescript-angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-intropage',
  templateUrl: './intropage.component.html',
  styleUrls: ['./intropage.component.css']
})
export class IntropageComponent implements OnInit {
  
  lang='English'
  aedata;
  profiledata:any;
  tailorintrodata;
  introForm: FormGroup
  constructor(private page: Page,private router: RouterExtensions, public fb: FormBuilder, private viewContainerRef: ViewContainerRef, public api: ApiServiceService,
     private modalService: ModalDialogService, public aetext:EnANdAeJson) {

const emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}';
    this.introForm = this.fb.group ({
      Name:new FormControl('',[Validators.required]),
      NameAE:new FormControl('',[Validators.required]),
      Email:new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    })
   }

  ngOnInit(): void { 
    this.lang= localStorage.getItem('Language')
    this.getaedat()
   this.tailorintrodata={
  "Name":null,
  "Email":null,
  'NameAE':null
    }
    this.profiledata='~/assets/profile/Plus.png';
    this.page.actionBarHidden = true;  
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
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



   // <==========================camera====================================>
   openprofilecamera() {
    var that=this
    Camera.requestPermissions().then(
    function success() {
    Camera.takePicture().then(picture => {
      that.profiledata = picture;
      console.log("pic", picture)
      let itemscamera = picture["_android"]
      var url = that.api.serverUrl+'/FileUpload/UploadFile?';
      var session = fileupload.session("TailorImage");
      var request = {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          'Accept': '*/*',
        },
        fileKey: 'TailorImage',
        description: "Uploading ",
        androidAutoDeleteAfterUpload: false,
        androidNotificationTitle: 'Profile image'
      };
      var params = [
        { name: "TailorImage", filename: itemscamera, fileKey: 'TailorImage' }
      ];
      var task = session.multipartUpload(params, request);

      task.on("error", (e) => {
        console.log(`Error processing upload ${e.responseCode} code.`);
      });

      task.on("responded", (e) => {
        let img = JSON.parse(e.data)
        var datasurl = JSON.stringify(img["Result"]).replace(/\[|\]/g, "")
        let profileimgs = datasurl.replace(/^.*[\\\/]/, '');
        let imgname = profileimgs.replace(/"/g, "");
        setString("imgName", imgname)
      });

      task.on("complete", (e) => {
        console.log(`upload complete!`, JSON.stringify(e));
      });
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
        
        that.profiledata=selected
        // ImageSource.fromAsset(selected)
        //    .then((imageSource) => {
        //      console.log('imgsrc',imageSource)
        //     that.profiledata['ShopOwnerImageURL']=imageSource
        //    }); 
    });
      let items = selection[0]['_android']
      console.log("Selection done:", items);
      var url = that.api.serverUrl+'/FileUpload/UploadFile?';
      var session = fileupload.session("TailorImage");
      const filePath: string = path.join(knownFolders.currentApp().path, items)
      console.log('path', filePath)
      var request = {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          'Accept': '*/*',
        },
        fileKey: 'TailorImage',
        description: "Uploading ",
        androidAutoDeleteAfterUpload: false,
        androidNotificationTitle: 'Profile image'
      };
      var params = [
        { name: "TailorImages", filename: items, fileKey: 'TailorImage' }
      ];
      var task = session.multipartUpload(params, request);

      task.on("error", (e) => {
        console.log(`Error processing upload ${e.responseCode} code.`);
      });
      task.on("responded", (e) => {
        let img = JSON.parse(e.data)
        var datasurl = JSON.stringify(img["Result"]).replace(/\[|\]/g, "")
        let profileimgs = datasurl.replace(/^.*[\\\/]/, '');
        let imgname = profileimgs.replace(/"/g, "");
        setString("imgName", imgname)

      });

      task.on("complete", (e) => {
        console.log(`upload complete!`, JSON.stringify(e));
      });

    }).catch(function (e) {
      console.log(e);
    });


  }

insertintroPage(){
  if(this.introForm.valid){
      var TailorId=getNumber("userId")
  let imgName=getString("imgName")
  let data={
    "TailorId":TailorId,
"TailorNameInEnglish":this.tailorintrodata['Name'],
"TailorNameInArabic":this.tailorintrodata['NameAE'],
"ShopOwnerImageURL":imgName,
"EmailId":this.tailorintrodata['Email']
  }
  console.log('data',data) 
  this.api.insertprofileintro(data).subscribe(res=>{
    console.log('intro',res)
    if(res['ResponseMsg']=='Success'){
      this.router.navigate(['/homenew'])
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
  }

}
}
