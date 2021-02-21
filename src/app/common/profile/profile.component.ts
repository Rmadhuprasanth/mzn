import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
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
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { GendermodalComponent } from '../gendermodal/gendermodal.component';
import * as fileupload from "nativescript-background-http"
import { CountryDialogComponent } from '~/app/authentication/country-dialog/country-dialog.component';
import * as imagepicker from "nativescript-imagepicker";
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";
import { CameramodalComponent } from '../cameramodal/cameramodal.component';
import { DatePipe } from '@angular/common';
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import { ActivatedRoute } from '@angular/router';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  lang='English'
  aedata;
  minDate: Date = new Date(1975, 0, 29);
  maxDate: Date = new Date(2045, 4, 12);
  user = "existed"
  selectedindexval: string;
  selectedheaders: string;
  noedittable: boolean = true;
  edittable: boolean = false;
  showupdate: boolean = false;
  showedit: boolean = true;
  profiledata: any
  tailoeimgurl: string;
  public profileimage: any;

  shoplist = [{ "Id": 1, "Name": "English" }, { "Id": 2, "Name": "Arabic1" }, { "Id": 2, "Name": "Arabic2" }, { "Id": 2, "Name": "Arabic2" }]
  Branches: any;
  profileImagealter: any;
  clickdate='false'
  dateshow: boolean;
  constructor(public params:ActivatedRoute,public aetext:EnANdAeJson,private router: RouterExtensions,private datePipe: DatePipe, private viewContainerRef: ViewContainerRef, public api: ApiServiceService, private modalService: ModalDialogService,) {
    this.profileimage = ""
  }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat() 
    this.tailoeimgurl = this.api.imageurl + 'TailorImages/'
    remove('array')
    this.profiledata = {
      "TailorNameInEnglish": "",
      "TailorNameInArabic": "",
      "PhoneNumber": "",
      "EmailId": "",
      "Gender": "",
      "ShopOwnerImageURL": "",
      "Dob": "",
    }
    this.params.queryParams.subscribe(x=>{
      if(x['pageid']=='fromstore'){
        console.log('test',x['pageid'])
        this.selectedheaders='1'
      }else if(x['pageid']!='fromstore'){
        console.log('test1',x['pageid'])
        this.selectedindex('3')
    this.selectedheader('0')
      } 
    })
  
    this.getTailorProfile()
    this.getshoplist()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }


  onDatePickerLoaded(args) {
    // const datePicker = args.object as DatePicker;
}

onDateChanged(args) {
    console.log("Date New value: " + args.value);
    this.profiledata['Dob']=this.datePipe.transform(args.value)
}
showDatepicker(dateclick){
  if(dateclick == 'false'){
    this.dateshow=true
    this.clickdate='true'
  }else{
    
    this.dateshow=false
    this.clickdate='false'
  }
}


  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  selectedheader(val) {
    if (val == '0') {
      this.selectedheaders = '0'
    } else if (val == '1') {
      this.selectedheaders = '1'
    }
  }
  selectedindex(val) {
    if (val == '0') {

      this.router.navigate(['/homenew'])
      this.selectedindexval = '0'
    } else if (val == '1') {
      this.router.navigate(['/StorelistComponent'])
      this.selectedindexval = '1'
    } else if (val == '2') {
      this.router.navigate(['/skillupdate'])
      this.selectedindexval = '2'
    } else if (val == '3') {
      this.router.navigate(['/Profile'])
      this.selectedindexval = '3'
    }
  }
  getTailorProfile() {
    var TailorId = getNumber("userId");
    this.api.getTailorProfile(TailorId).subscribe(res => {
      let data = res['Result']
      this.profiledata['TailorNameInEnglish'] = data[0]['TailorNameInEnglish']
      this.profiledata['TailorNameInArabic'] = data[0]['TailorNameInArabic']
      this.profiledata['PhoneNumber'] = data[0]['PhoneNumber']
      this.profiledata['EmailId'] = data[0]['EmailId']
      this.profiledata['Gender'] = data[0]['Gender']
      this.profiledata['ShopOwnerImageURL'] = this.tailoeimgurl + data[0]['ShopOwnerImageURL']
      this.profileImagealter= data[0]['ShopOwnerImageURL']
      this.profiledata['Dob'] = data[0]['Dob']
    })
  }
  getshoplist() {

    var TailorId=getNumber("userId");
    this.api.getshoplist(TailorId).subscribe(res => {
      console.log('reyyys', res)
      this.Branches=res['Result']
    })
  }
  showgenderModal() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    };
    this.modalService.showModal(GendermodalComponent, options).then(res => {
      console.log('rerrr', res);
      this.profiledata['Gender'] = res
    });
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
  editprofile() {
    this.noedittable = false
    this.edittable = true
    this.showupdate = true
    this.showedit = false
  }

  cancelprofile() {
    this.noedittable = true
    this.edittable = false
    this.showupdate = false
    this.showedit = true
  }
  // <==========================camera====================================>
  openprofilecamera() {
    remove('imgName')
    var that=this
    Camera.requestPermissions().then(
    function success() {
    Camera.takePicture().then(picture => {
      var width=75
      var height=75
      var keepAspectRatio=true
      picture.options = {width, height, keepAspectRatio };

                that.profiledata['ShopOwnerImageURL'] = picture;
                console.log("pic", picture)
                let itemscamera = picture["_android"]
                var url = that.api.serverUrl+'/FileUpload/UploadFile?';
                var session = fileupload.session("file-upload");
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
    remove('imgName')
    var that=this
    var context = imagepicker.create({
      mode: "single"
    });

    context.authorize().then(function () {
      return context.present();
    }).then(function (selection) {
      selection.forEach(function(selected) {
        
        that.profiledata['ShopOwnerImageURL']=selected
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




  gotoshopdetailId(shopId){
    this.router.navigate(['/shopdetails'],{queryParams:{'shopId':shopId}})
  }
  gotoshopdetail(){
    this.router.navigate(['/mapmodal'])
  }
  updatetailorProfile() {
    var TailorId = getNumber("userId");
    if(getString('imgName') != null || getString('imgName') != undefined){
      this.profileImagealter = getString('imgName')
    }else{
      this.profileImagealter
    }
    let data = {

      "TailorId": TailorId,
      'TailorNameInEnglish': this.profiledata['TailorNameInEnglish'],
      'TailorNameInArabic': this.profiledata['TailorNameInArabic'],
      'ShopOwnerImageURL': this.profileImagealter ,
      'EmailId': this.profiledata['EmailId'],
      'Dob': this.profiledata['Dob'],
      'Gender': this.profiledata['Gender'],
      'ModifiedBy': this.profiledata['TailorNameInEnglish'],
    }
    console.log('data', data)
let text="Are You sure want to submit?"
if(this.lang == 'English'){
text="Are You sure want to submit?"
}else{
  text="هل تريد التقديم؟"
}
    
      dialogs.confirm(text).then(result => {
        if(result==true){
    
          this.api.updateTailorProfile(data).subscribe(res => {
            console.log('res', res)
            if (res['Result']) {
              this.noedittable = true
              this.edittable = false
              this.showupdate = false
              this.showedit = true
              this.getTailorProfile()
            }
      
          })
        }
    
    });
  
  }

  // getactiveallval(val){
  //   if(val == 'false'){ 
  //     // <-----------active-------------- 
  //   }else if(val == 'true'){
  //     // <-----------deactive-------------- 
  //   }
  //   }
    getactiveallval(checkvalcompany,Id){
      console.log('vall',checkvalcompany,Id)
      if(checkvalcompany == 'false'){
        dialogs.confirm("Are You sure want to Acitvate this branch?").then(result => {
          if(result==true){
            this.Branches.map((x,i)=>{
              if(x['ShopId'] == Id){
                this.Branches[i]['IsActive']=true
              }
            })
            this.activebranchDtails('true',Id)
          }
        })
   
      }else if(checkvalcompany == 'true'){
        dialogs.confirm("Are You sure want to Deacitvate this branch?").then(result => {
          if(result==true){
            this.Branches.map((x,i)=>{
              if(x['ShopId'] == Id){
                this.Branches[i]['IsActive']=false
              }
            })
            
            this.activebranchDtails('false',Id)
          }
        })
     
        
      }
      }
activebranchDtails(isactive,shopid){
  this.api.activeBranchDetails(shopid,isactive).subscribe(res=>{
    console.log('res',res)
    if(res['Result']){
      if(this.lang=='English'){
        this.api.showtoast('Branch Sucessfully updated ')
      }else{
        this.api.showtoast('تم تحديث بيانات الفرع ')
      }
      this.getshoplist()
    }
  })
}
  gotoNotifications(){
    this.router.navigate(['/NotificationsComponent'])
  
  }

}





// openprofilecamera() {
//   remove('imgName')
//   var that=this
//   Camera.requestPermissions().then(
//   function success() {
//   Camera.takePicture().then(picture => {
//     var width=75
//     var height=75
//     var keepAspectRatio=true
//     picture.options = {width, height, keepAspectRatio };
//     ImageSource.fromAsset(picture)
//              .then((imageSource) => {

//               that.profiledata['ShopOwnerImageURL'] = imageSource;
//               console.log("pic", imageSource)
//               let itemscamera = imageSource["_android"]
//               var url = that.api.serverUrl+'/FileUpload/UploadFile?';
//               var session = fileupload.session("TailorImage");
//               var request = {
//                 url: url,
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "multipart/form-data",
//                   'Accept': '*/*',
//                 },
//                 fileKey: 'TailorImage',
//                 description: "Uploading ",
//                 androidAutoDeleteAfterUpload: false,
//                 androidNotificationTitle: 'Profile image'
//               };
//               var params = [
//                 { name: "TailorImage", filename: itemscamera, fileKey: 'TailorImage' }
//               ];
//               var task = session.multipartUpload(params, request);
        
//               task.on("error", (e) => {
//                 console.log(`Error processing upload ${e.responseCode} code.`);
//               });
        
//               task.on("responded", (e) => {
//                 let img = JSON.parse(e.data)
//                 var datasurl = JSON.stringify(img["Result"]).replace(/\[|\]/g, "")
//                 let profileimgs = datasurl.replace(/^.*[\\\/]/, '');
//                 let imgname = profileimgs.replace(/"/g, "");
//                 setString("imgName", imgname)
//               });
        
//               task.on("complete", (e) => {
//                 console.log(`upload complete!`, JSON.stringify(e));
//               });
//              });
  
//   })
// }
//   )
// }
