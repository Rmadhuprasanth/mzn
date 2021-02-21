import { Component, NgZone, OnInit, ViewContainerRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
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
import { ApiServiceService } from "./endpoint/api-service.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog"
import { CustomeConfirmDaialogComponent } from "./common/custome-confirm-daialog/custome-confirm-daialog.component";
import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import * as firebase from 'nativescript-plugin-firebase';
import { EnANdAeJson } from "./endpoint/En-Ae.service";
// import * as pushPlugin from "nativescript-push-notifications";
import { Downloader } from 'nativescript-downloader';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lang='English'
  aedata;
 drawerLocation: string;
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase; 
    TailorNameInEnglish: any;
    ShopOwnerImageURL: any;
    reslgut: any;
    public sideDrawerEnabled: boolean = false;
    constructor(private router: Router, private routerExtensions: RouterExtensions,
         public api: ApiServiceService,private modalService: ModalDialogService,
         private viewContainerRef: ViewContainerRef,public ngZone:NgZone,public aetext:EnANdAeJson) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void { 
      this.getaedat()
      if( localStorage.getItem('Language')){

        this.lang= localStorage.getItem('Language')
      }else{
        localStorage.setItem('Language','English')
        this.lang= localStorage.getItem('Language')
      }
      if(this.lang=='English'){
        this.drawerLocation= SideDrawerLocation.Left;
      }else{
        this.drawerLocation= SideDrawerLocation.Right;
      }
      var userId=getNumber("userId");
      // var userId="259";
      console.log('user',userId)
      if(userId != null || userId != undefined){
        this.router.navigate(['/homenew']) 
      }else{
        this.router.navigate(['/Login']) 
      }
      this.api.sideDrawerEnabled.subscribe(x =>     
        this.sideDrawerEnabled = x
      );
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);


    //    let pushSettings = {
    //         senderID: "395034501620",
    //         notificationCallbackAndroid: (stringifiedData: String, fcmNotification: any) => {
    //             const notificationBody = fcmNotification && fcmNotification.getBody();
    //             this.updateMessage("Message received!\n" + notificationBody + "\n" + stringifiedData);
    //         }
    //     };
    //     pushPlugin.register(pushSettings, (token: String) => {
    //         console.log("Device registered. Access token: " + token);;
    //     }, function() { });
  



        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: true,
            persist: true,
            onPushTokenReceivedCallback: (token) => {
              console.log('[Firebase] onPushTokenReceivedCallback:', { token });
              // setString('fcmtoken',token)
              localStorage.setItem('fcmtoken',token)
            },
      
            onMessageReceivedCallback: (message: firebase.Message) => {
              console.log('[Firebase] onMessageReceivedCallback:', { message });
            //   this.ngZone.run(() =>
            //   setTimeout(() => {
            //     this.router.navigate(['/StorelistComponent'])
            //     console.log('hiiiiiiiiiiiiiiiii')
            //     }, 3000)
            //    )
            }
          })
            .then(() => {
              console.log('[Firebase] Initialized');
            })
            .catch(error => {
              console.log('[Firebase] Initialize', { error }); 
            });
            Downloader.init(); 
            Downloader.setTimeout(120);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
     this.getaedat()
        this.TailorNameInEnglish=getString('TailorNameInEnglish')
        this.ShopOwnerImageURL =getString('ShopOwnerImageURL')
        this.lang= localStorage.getItem('Language')
        if(this.lang=='English'){
          this.drawerLocation= SideDrawerLocation.Left;
        }else{
          this.drawerLocation= SideDrawerLocation.Right;
        }
        return this._sideDrawerTransition;

    }
    getaedat(){
      this.aedata=this.aetext.getArabicConent()
    }
    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                // name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
    logout(){

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context:{ alerttxt: "Are you sure want to logout!" ,alerttxtae:'هل أنت متأكد من رغبتك بتسجيل الخروج'}
          };
          this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
            console.log('rerrr', res);
            this.reslgut=res
            setTimeout(() => {
                if(res == 'true'){
                  remove("userId");
                  localStorage.removeItem('phNumber')
                  clear()
                         this.router.navigate(['/Login'])
                         const sideDrawer = <RadSideDrawer>app.getRootView();
                         sideDrawer.closeDrawer();
                         }
                
            }, 1000);
          });
      
    }



  
}
