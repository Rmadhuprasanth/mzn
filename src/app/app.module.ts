import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './authentication/login/login.component';
import { DropDownModule } from "nativescript-drop-down/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { CountryDialogComponent } from './authentication/country-dialog/country-dialog.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ApiServiceService } from "./endpoint/api-service.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { FooterComponent } from './common/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeNewComponent } from './home-new/home-new.component';
import { SkillupdateComponent } from './skill/skillupdate/skillupdate.component';
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { ProfileComponent } from './common/profile/profile.component';
import { GendermodalComponent } from './common/gendermodal/gendermodal.component';
import { ShopdetailsComponent } from './common/shopdetails/shopdetails.component';
import { NgShadowModule } from 'nativescript-ng-shadow';
import { CameramodalComponent } from './common/cameramodal/cameramodal.component';
import { MapsComponent } from './common/maps/maps.component';
import { StateComponent } from './common/state/state.component';
import { AreaComponent } from './common/area/area.component';
import { MaterialComponent } from './materialmapping/material/material.component';
import { MaterialDetailsComponent } from './materialmapping/material-details/material-details.component';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { GenderComponent } from './dressmapping/gender/gender.component';
import { DressTypeComponent } from './dressmapping/dress-type/dress-type.component';
import { DressSubTypeComponent } from './dressmapping/dress-sub-type/dress-sub-type.component';
import { DressDetailComponent } from './dressmapping/dress-detail/dress-detail.component';
import { NoOfDaysmodalComponent } from './common/no-of-daysmodal/no-of-daysmodal.component';
import { MaterialtypeMapComponent } from './skill/materialtype-map/materialtype-map.component';
import { MeasurementMapComponent } from './skill/measurement-map/measurement-map.component';
import { StitchtimeMapComponent } from './skill/stitchtime-map/stitchtime-map.component';
import { CustomizationAttributeComponent } from './dressmapping/customization-attribute/customization-attribute.component';
import { GotoBranchComponent } from './skill/location/goto-branch/goto-branch.component';
import { GotoCountryComponent } from './skill/location/goto-country/goto-country.component';
import { GotoStateComponent } from './skill/location/goto-state/goto-state.component';
import { GotoLocationComponent } from './skill/location/goto-location/goto-location.component';
import { CustzoomModalComponent } from './dressmapping/custzoom-modal/custzoom-modal.component';
import { IntropageComponent } from './authentication/intropage/intropage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomeConfirmDaialogComponent } from './common/custome-confirm-daialog/custome-confirm-daialog.component';
import { ProductListComponent } from './skill/productmapp/product-list/product-list.component';
import { ProductDetailComponent } from './skill/productmapp/product-detail/product-detail.component';
import { NewProductMappComponent } from './skill/productmapp/new-product-mapp/new-product-mapp.component';
import { CategoryModalComponent } from './common/category-modal/category-modal.component';
import { RejectedProductsComponent } from './skill/productmapp/rejected-products/rejected-products.component';
import { RejectedDetailsComponent } from './skill/productmapp/rejected-details/rejected-details.component';
import { DatePipe } from "@angular/common";
import { LoaderComponent } from './common/loader/loader.component';
import { Gif } from 'nativescript-gif';
import { PendingOrderListComponent } from './order-management/order-pending/pending-order-list/pending-order-list.component';
import { PendingOrderDetailsComponent } from './order-management/order-pending/pending-order-details/pending-order-details.component';
import { CompletedOrderListComponent } from './order-management/order-completed/completed-order-list/completed-order-list.component';
import { CompletedOrderDetailsComponent } from './order-management/order-completed/completed-order-details/completed-order-details.component';
import { CreateAppointmentComponent } from './order-management/create-appointment/create-appointment.component';
import { ApproveAppointmentComponent } from './order-management/approve-appointment/approve-appointment.component';
import { MeasurementComponent } from './order-management/measurement/measurement.component';
import { CustomizationComponent } from './order-management/customization/customization.component';
import { ReferenceImageComponent } from './order-management/reference-image/reference-image.component';
import { SelectedMaterialComponent } from './order-management/selected-material/selected-material.component';
import { StatusModalComponent } from './order-management/status-modal/status-modal.component';
import { StoreStatusModalComponent } from './order-management/store-status-modal/store-status-modal.component';
import { WriteReviewComponent } from './order-management/write-review/write-review.component';
import { StoreReviewComponent } from './order-management/store-review/store-review.component';
import { TrackStitchingComponent } from './order-management/order-completed/track-stitching/track-stitching.component';
import { TrackStoreComponent } from './order-management/order-completed/track-store/track-store.component';
import { MeasurementPageComponent } from './order-management/measurement/measurement-page/measurement-page.component';
import { PagerModule } from "nativescript-pager/angular";
import { MeasureModalComponent } from './order-management/measurement/measure-modal/measure-modal.component';
import { NativeScriptUIRangeSeekBarModule } from "nativescript-range-seek-bar/angular";
import { TimeModalComponent } from './order-management/time-modal/time-modal.component';
import { NameModalComponent } from './order-management/measurement/name-modal/name-modal.component';
import { BuyerpendingListComponent } from './BuyerOrder/buyerpending-list/buyerpending-list.component';
import { BuyerpendingDetailsComponent } from './BuyerOrder/buyerpending-details/buyerpending-details.component';
import { BuyerpriceDetailsComponent } from './BuyerOrder/buyerprice-details/buyerprice-details.component';
import { BuyerapprovedListComponent } from './BuyerOrder/buyerapproved-list/buyerapproved-list.component';
import { BuyerapprovedDetailsComponent } from './BuyerOrder/buyerapproved-details/buyerapproved-details.component';
import { BuyerCustomizationComponent } from './BuyerOrder/buyer-customization/buyer-customization.component';
import { BuyerMeasurementComponent } from './BuyerOrder/buyer-measurement/buyer-measurement.component';
import { ConsentModalComponent } from './BuyerOrder/consent-modal/consent-modal.component';
import { BuyerMaterialComponent } from './BuyerOrder/buyer-material/buyer-material.component';
import { MeasurementCompletedComponent } from './order-management/order-completed/measurement-completed/measurement-completed.component';
import { OandptimeModalComponent } from './dashboard/oandptime-modal/oandptime-modal.component';
import { StorelistComponent } from './dashboard/storelist/storelist.component';
import { AppointmentListComponent } from './menu/appointment/appointment-list/appointment-list.component';
import { CreateDirectAppointmentComponent } from './menu/appointment/create-direct-appointment/create-direct-appointment.component';

import { TandcComponent } from './menu/tandc/tandc.component';
import { SubmittedListComponent } from './menu/submitted-list/submitted-list.component';
import { NotificationsComponent } from './menu/notifications/notifications.component';
import { PromotionHomeComponent } from './promotion/promotion-home/promotion-home.component';
import { NewPromotionComponent } from './promotion/new-promotion/new-promotion.component';
import { UploadPromotionComponent } from './promotion/upload-promotion/upload-promotion.component';
import { StoreProdPromotionComponent } from './promotion/store-prod-promotion/store-prod-promotion.component';
import { StitchingProdPromotionComponent } from './promotion/stitching-prod-promotion/stitching-prod-promotion.component';
import { StitchingSubProdPromotionComponent } from './promotion/stitching-sub-prod-promotion/stitching-sub-prod-promotion.component';
import { ManagePromotionComponent } from './promotion/manage-promotion/manage-promotion.component';
import { EnANdAeJson } from "./endpoint/En-Ae.service";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { SettingsComponent } from './menu/settings/settings.component';
import { LanguageComponent } from './menu/language/language.component';
import { PDFView } from 'nativescript-pdf-view';
import { PdfviewComponent } from './order-management/pdfview/pdfview.component';
registerElement('ImageZoom', () => require('nativescript-image-zoom').ImageZoom); 
registerElement('Gif', () => Gif);
registerElement('CardView', () => CardView); 
registerElement('PDFView', () => PDFView);

registerElement(
    "RGridLayout",
    () => require("@nativescript-rtl/ui").GridLayout
  );
  registerElement(
    "RWrapLayout",
    () => require("@nativescript-rtl/ui").WrapLayout 
  );
  registerElement(
    "RAbsoluteLayout",
    () => require("@nativescript-rtl/ui").AbsoluteLayout
  );
  registerElement(
    "RDockLayout",
    () => require("@nativescript-rtl/ui").DockLayout
  );
  registerElement(
    "RStackLayout",
    () => require("@nativescript-rtl/ui").StackLayout
  );

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        DropDownModule,
        NativeScriptUIListViewModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NgShadowModule, 
        TNSCheckBoxModule,
        ReactiveFormsModule,
        PagerModule,
        NativeScriptUIRangeSeekBarModule,
        NativeScriptUIChartModule,
        NativeScriptUIGaugeModule,
        // GifModule,
        
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LoginDialogComponent,
        CountryDialogComponent,
        OtpComponent,
        FooterComponent,
        DashboardComponent,
        HomeNewComponent,
        SkillupdateComponent,
        ProfileComponent,
        GendermodalComponent,
        ShopdetailsComponent,
        CameramodalComponent,
        MapsComponent,
        StateComponent,
        AreaComponent,
        MaterialComponent,
        MaterialDetailsComponent,
        GenderComponent,
        DressTypeComponent,
        DressSubTypeComponent,
        DressDetailComponent,
        NoOfDaysmodalComponent,
        MaterialtypeMapComponent,
        MeasurementMapComponent,
        StitchtimeMapComponent,
        CustomizationAttributeComponent,
        GotoBranchComponent,
        GotoCountryComponent,
        GotoStateComponent,
        GotoLocationComponent,
        CustzoomModalComponent,
        IntropageComponent,
        CustomeConfirmDaialogComponent,
        ProductListComponent,
        ProductDetailComponent,
        NewProductMappComponent,
        CategoryModalComponent,
        RejectedProductsComponent,
        RejectedDetailsComponent,
        LoaderComponent,
        PendingOrderListComponent,
        PendingOrderDetailsComponent,
        CompletedOrderListComponent,
        CompletedOrderDetailsComponent,
        CreateAppointmentComponent,
        ApproveAppointmentComponent,
        MeasurementComponent,
        CustomizationComponent,
        ReferenceImageComponent,
        SelectedMaterialComponent,
        StatusModalComponent,
        StoreStatusModalComponent,
        WriteReviewComponent,
        StoreReviewComponent,
        TrackStitchingComponent,
        TrackStoreComponent,
        MeasurementPageComponent,
        MeasureModalComponent,
        TimeModalComponent,
        NameModalComponent,
        BuyerpendingListComponent,
        BuyerpendingDetailsComponent,
        BuyerpriceDetailsComponent,
        BuyerapprovedListComponent,
        BuyerapprovedDetailsComponent,
        BuyerCustomizationComponent,
        BuyerMeasurementComponent,
        ConsentModalComponent,
        BuyerMaterialComponent,
        MeasurementCompletedComponent,
        OandptimeModalComponent,
        StorelistComponent,
        AppointmentListComponent,
        CreateDirectAppointmentComponent,
        TandcComponent,
        SubmittedListComponent,
        NotificationsComponent,
        PromotionHomeComponent,
        NewPromotionComponent,
        UploadPromotionComponent,
        StoreProdPromotionComponent,
        StitchingProdPromotionComponent,
        StitchingSubProdPromotionComponent,
        ManagePromotionComponent,
        SettingsComponent,
        LanguageComponent,
        PdfviewComponent,

    ],
    providers: [ApiServiceService,DatePipe,EnANdAeJson],
    entryComponents: [
        LoginDialogComponent,
        CountryDialogComponent,
        GendermodalComponent,
        CameramodalComponent,
        StateComponent,
        AreaComponent,
        NoOfDaysmodalComponent,
        CustzoomModalComponent,
        CustomeConfirmDaialogComponent,
        CategoryModalComponent,
        LoaderComponent,
        StatusModalComponent,
        StoreStatusModalComponent,
        MeasureModalComponent,
        TimeModalComponent,
        NameModalComponent,
        ConsentModalComponent,
        OandptimeModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
