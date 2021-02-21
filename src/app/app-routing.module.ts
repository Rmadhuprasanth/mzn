import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { OtpComponent } from "./authentication/otp/otp.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeNewComponent } from "./home-new/home-new.component";
import { SkillupdateComponent } from "./skill/skillupdate/skillupdate.component";
import { ProfileComponent } from "./common/profile/profile.component";
import { ShopdetailsComponent } from "./common/shopdetails/shopdetails.component";
import { MapsComponent } from "./common/maps/maps.component";
import { MaterialComponent } from "./materialmapping/material/material.component";
import { MaterialDetailsComponent } from "./materialmapping/material-details/material-details.component";
import { DressDetailComponent } from "./dressmapping/dress-detail/dress-detail.component";
import { DressSubTypeComponent } from "./dressmapping/dress-sub-type/dress-sub-type.component";
import { DressTypeComponent } from "./dressmapping/dress-type/dress-type.component";
import { GenderComponent } from "./dressmapping/gender/gender.component";
import { MaterialtypeMapComponent } from "./skill/materialtype-map/materialtype-map.component";
import { MeasurementMapComponent } from "./skill/measurement-map/measurement-map.component";
import { StitchtimeMapComponent } from "./skill/stitchtime-map/stitchtime-map.component";
import { CustomizationAttributeComponent } from "./dressmapping/customization-attribute/customization-attribute.component";
import { GotoBranchComponent } from "./skill/location/goto-branch/goto-branch.component";
import { GotoCountryComponent } from "./skill/location/goto-country/goto-country.component";
import { GotoStateComponent } from "./skill/location/goto-state/goto-state.component";
import { GotoLocationComponent } from "./skill/location/goto-location/goto-location.component";
import { IntropageComponent } from "./authentication/intropage/intropage.component";
import { ProductListComponent } from "./skill/productmapp/product-list/product-list.component";
import { ProductDetailComponent } from "./skill/productmapp/product-detail/product-detail.component";
import { NewProductMappComponent } from "./skill/productmapp/new-product-mapp/new-product-mapp.component";
import { RejectedProductsComponent } from "./skill/productmapp/rejected-products/rejected-products.component";
import { RejectedDetailsComponent } from "./skill/productmapp/rejected-details/rejected-details.component";
import { PendingOrderListComponent } from "./order-management/order-pending/pending-order-list/pending-order-list.component";
import { PendingOrderDetailsComponent } from "./order-management/order-pending/pending-order-details/pending-order-details.component";
import { CompletedOrderListComponent } from "./order-management/order-completed/completed-order-list/completed-order-list.component";
import { CompletedOrderDetailsComponent } from "./order-management/order-completed/completed-order-details/completed-order-details.component";
import { ApproveAppointmentComponent } from "./order-management/approve-appointment/approve-appointment.component";
import { CreateAppointmentComponent } from "./order-management/create-appointment/create-appointment.component";
import { CustomizationComponent } from "./order-management/customization/customization.component";
import { SelectedMaterialComponent } from "./order-management/selected-material/selected-material.component";
import { MeasurementComponent } from "./order-management/measurement/measurement.component";
import { ReferenceImageComponent } from "./order-management/reference-image/reference-image.component";
import { WriteReviewComponent } from "./order-management/write-review/write-review.component";
import { StoreReviewComponent } from "./order-management/store-review/store-review.component";
import { TrackStitchingComponent } from "./order-management/order-completed/track-stitching/track-stitching.component";
import { TrackStoreComponent } from "./order-management/order-completed/track-store/track-store.component";
import { MeasurementPageComponent } from "./order-management/measurement/measurement-page/measurement-page.component";
import { BuyerpendingListComponent } from "./BuyerOrder/buyerpending-list/buyerpending-list.component";
import { BuyerpendingDetailsComponent } from "./BuyerOrder/buyerpending-details/buyerpending-details.component";
import { BuyerpriceDetailsComponent } from "./BuyerOrder/buyerprice-details/buyerprice-details.component";
import { BuyerapprovedListComponent } from "./BuyerOrder/buyerapproved-list/buyerapproved-list.component";
import { BuyerapprovedDetailsComponent } from "./BuyerOrder/buyerapproved-details/buyerapproved-details.component";
import { BuyerCustomizationComponent } from "./BuyerOrder/buyer-customization/buyer-customization.component";
import { BuyerMeasurementComponent } from "./BuyerOrder/buyer-measurement/buyer-measurement.component";
import { BuyerMaterialComponent } from "./BuyerOrder/buyer-material/buyer-material.component";
import { MeasurementCompletedComponent } from "./order-management/order-completed/measurement-completed/measurement-completed.component";
import { StorelistComponent } from "./dashboard/storelist/storelist.component";
import { AppointmentListComponent } from "./menu/appointment/appointment-list/appointment-list.component";
import { CreateDirectAppointmentComponent } from "./menu/appointment/create-direct-appointment/create-direct-appointment.component";

import { TandcComponent } from "./menu/tandc/tandc.component";
import { SubmittedListComponent } from "./menu/submitted-list/submitted-list.component";
import { NotificationsComponent } from "./menu/notifications/notifications.component";
import { PromotionHomeComponent } from "./promotion/promotion-home/promotion-home.component";
import { NewPromotionComponent } from "./promotion/new-promotion/new-promotion.component";
import { StoreProdPromotionComponent } from "./promotion/store-prod-promotion/store-prod-promotion.component";
import { StitchingProdPromotionComponent } from "./promotion/stitching-prod-promotion/stitching-prod-promotion.component";
import { StitchingSubProdPromotionComponent } from "./promotion/stitching-sub-prod-promotion/stitching-sub-prod-promotion.component";
import { UploadPromotionComponent } from "./promotion/upload-promotion/upload-promotion.component";
import { ManagePromotionComponent } from "./promotion/manage-promotion/manage-promotion.component";
import { SettingsComponent } from "./menu/settings/settings.component";
import { LanguageComponent } from "./menu/language/language.component";
import { PdfviewComponent } from "./order-management/pdfview/pdfview.component";

const routes: Routes = [
    { path: "", redirectTo: "/Login", pathMatch: "full" }, 
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    {path:'Login',component:LoginComponent},  
    {path:'otp',component:OtpComponent},  
    {path:'IntropageComponent',component:IntropageComponent}, 
    {path:'dashboard',component:DashboardComponent}, 
    {path:'homenew',component:HomeNewComponent},
    {path:'skillupdate',component:SkillupdateComponent}, 
    {path:'Profile',component:ProfileComponent},   
    {path:'shopdetails',component:ShopdetailsComponent}, 
    {path:'mapmodal',component:MapsComponent},
    {path:'NotificationsComponent',component:NotificationsComponent},
    {path:'material',component:MaterialComponent},
    {path:'material-details',component:MaterialDetailsComponent},
    {path:'GenderComponent',component:GenderComponent},
    {path:'DressTypeComponent',component:DressTypeComponent},
    {path:'DressSubTypeComponent',component:DressSubTypeComponent},
    {path:'DressDetailComponent',component:DressDetailComponent},
    {path:'CustomizationAttributeComponent',component:CustomizationAttributeComponent},
    {path:'MaterialtypeMapComponent',component:MaterialtypeMapComponent},
    {path:'MeasurementMapComponent',component:MeasurementMapComponent},
    {path:'StitchtimeMapComponent',component:StitchtimeMapComponent},
    
    {path:'GotoBranchComponent',component:GotoBranchComponent},
    {path:'GotoCountryComponent',component:GotoCountryComponent},
    {path:'GotoStateComponent',component:GotoStateComponent},
    {path:'GotoLocationComponent',component:GotoLocationComponent},

    
    {path:'ProductListComponent',component:ProductListComponent},
    {path:'ProductDetailComponent',component:ProductDetailComponent},
    {path:'NewProductMappComponent',component:NewProductMappComponent},
    {path:'RejectedProductsComponent',component:RejectedProductsComponent},
    {path:'RejectedDetailsComponent',component:RejectedDetailsComponent},


    {path:'PendingOrderListComponent',component:PendingOrderListComponent},
    {path:'PendingOrderDetailsComponent',component:PendingOrderDetailsComponent},
    {path:'CompletedOrderListComponent',component:CompletedOrderListComponent},
    {path:'CompletedOrderDetailsComponent',component:CompletedOrderDetailsComponent},

    {path:'ApproveAppointmentComponent',component:ApproveAppointmentComponent},
    {path:'CreateAppointmentComponent',component:CreateAppointmentComponent},
    {path:'CustomizationComponent',component:CustomizationComponent},
    {path:'SelectedMaterialComponent',component:SelectedMaterialComponent},
    {path:'MeasurementComponent',component:MeasurementComponent},
    {path:'ReferenceImageComponent',component:ReferenceImageComponent},
    {path:'WriteReviewComponent',component:WriteReviewComponent},
    {path:'StoreReviewComponent',component:StoreReviewComponent},
    {path:'TrackStitchingComponent',component:TrackStitchingComponent},
    {path:'TrackStoreComponent',component:TrackStoreComponent},
    {path:'MeasurementPageComponent',component:MeasurementPageComponent},
    {path:'MeasurementCompletedComponent',component:MeasurementCompletedComponent},


    
    {path:'BuyerpendingListComponent',component:BuyerpendingListComponent},
    {path:'BuyerpendingDetailsComponent',component:BuyerpendingDetailsComponent},
    {path:'BuyerpriceDetailsComponent',component:BuyerpriceDetailsComponent},
    {path:'BuyerapprovedListComponent',component:BuyerapprovedListComponent},
    {path:'BuyerapprovedDetailsComponent',component:BuyerapprovedDetailsComponent},
    {path:'BuyerCustomizationComponent',component:BuyerCustomizationComponent},
    {path:'BuyerMeasurementComponent',component:BuyerMeasurementComponent},
    {path:'BuyerMaterialComponent',component:BuyerMaterialComponent},

    
    {path:'StorelistComponent',component:StorelistComponent},
    {path:'AppointmentListComponent',component:AppointmentListComponent},
    {path:'CreateDirectAppointmentComponent',component:CreateDirectAppointmentComponent},
    {path:'TandcComponent',component:TandcComponent},
    {path:'SubmittedListComponent',component:SubmittedListComponent},

    
    {path:'PromotionHomeComponent',component:PromotionHomeComponent},
    {path:'NewPromotionComponent',component:NewPromotionComponent},
    {path:'StoreProdPromotionComponent',component:StoreProdPromotionComponent},
    {path:'StitchingProdPromotionComponent',component:StitchingProdPromotionComponent},
    {path:'StitchingSubProdPromotionComponent',component:StitchingSubProdPromotionComponent},
    {path:'UploadPromotionComponent',component:UploadPromotionComponent},
    {path:'ManagePromotionComponent',component:ManagePromotionComponent},
    {path:'SettingsComponent',component:SettingsComponent},
    {path:'LanguageComponent',component:LanguageComponent},
    {path:'PdfviewComponent',component:PdfviewComponent},
    
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
