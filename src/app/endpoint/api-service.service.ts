
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { Country } from './interface';
@Injectable({ 
  providedIn: 'root'
})
export class ApiServiceService {
  serverUrl = "https://development.mzyoon.com/api";
  imageurl="https://development.mzyoon.com/images/"
 
  //  serverUrl = " http://storeadmin.mzyoon.com/api";
  // imageurl=" http://storeadmin.mzyoon.com/images/"
 
  //  serverUrl = "http://appsapi.mzyoon.com/api";
  // imageurl="http://appsapi.mzyoon.com/images/" 

  constructor(private http: HttpClient ) { }



  getCategoricalSource(): Country[] {
    return [
        { Country: "Jan", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "Feb", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
        { Country: "Mar", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
        { Country: "Apr", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "May", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 },
        { Country: "Jun", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "Jul", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 },
        { Country: "Aug", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "Sep", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 },
        { Country: "Oct", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 },
        { Country: "Nov", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
        { Country: "Dec", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
    ];
}


  private _sideDrawerEnabled = new BehaviorSubject(false);
set sideDrawer(value: boolean) {
  this._sideDrawerEnabled.next(value);
}
get sideDrawerEnabled(): BehaviorSubject<boolean> {
  return this._sideDrawerEnabled;
}
showtoast(val){
  const toast = new Toasty({ text: val});
  toast.textColor = '#fff';
  toast.backgroundColor ='gray';
  toast.position=ToastPosition.CENTER
  return toast.show();
}
  createRequestHeader() {
    let headers = new HttpHeaders({
       
        "Content-Type": "application/json",
        "Accept":"application/json",
     });

    return headers;
}
getcountry() {
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/login/GetAllCountries?', { headers: headers});
}
getstateByCountry(countryId) {
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/DisplayStatebyCountry?',countryId, { headers: headers});
}

getAreaBystate(stateId) {
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/GetAreaByState?',stateId, { headers: headers});
}
generateOTP(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Login/GenerateOTP?',data, { headers: headers});
}
insertlanguage(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Login/InsertLanguage?',data, { headers: headers});
}
validateOTP(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Login/ValidateOTP?',data, { headers: headers});
}
resendOTP(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Login/ResendOTP?',data, { headers: headers});
}
insertDeviceDetails(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Login/InsertUpdateDeviceDetails',data, { headers: headers});
}
getAllNotifications(type,tailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetBuyerNotification?Type='+type+'&TypeId='+tailorId, { headers: headers});
}
getDashboard(Id) {
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/dashboard/GetDashboardValuesForTailor?tailorId='+Id, { headers: headers});
}
getShopProfile(tailorId){
  let headers = this.createRequestHeader(); 
  return this.http.get(this.serverUrl+'/Shop/GetShopProfileByTailorId?TailorId='+tailorId, { headers: headers});
}
getTailorProfile(tailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetTailorProfileByTailorId?TailorId='+tailorId, { headers: headers});
}
updateShopProfile(data){
  
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Shop/NewInsertUpdateShopProfile',data, { headers: headers});
}

updateTailorProfile(data){
  
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Shop/InsertUpdateTailorProfile',data, { headers: headers});


}
getshoplist(tailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetListshopByTailorId?TailorId='+tailorId, { headers: headers});
}
getShopProfiledetails(shopId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetshopProfileByShopId?shopId='+shopId, { headers: headers});
}
// <=======================material-Mapping==================================> 
getMaterialList(tailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetPatterns?TailorId='+tailorId, { headers: headers});
}

GetMaterialDeatils(tailorId,MaterialId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetMaterialDetails?TailorId='+tailorId+'&MaterialId='+MaterialId, { headers: headers});
}
insertMaterialMapping(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/InsertDressSubTypeMaterialCharges',data, { headers: headers});
}
GetMaterialDeatilscharges(tailorId,MaterialId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetTailorDressSubType?TailorId='+tailorId+'&MaterialId='+MaterialId, { headers: headers});
}


// <==========================dress-mapping========================================================>
GetallGenders(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/GetGenders', { headers: headers});
}
GetallDressType(genderId,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/GetDressTypeByGender?genderId='+genderId+'&TailorId='+TailorId, { headers: headers});
}
GetallDressSubType(DressId,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetDressSubTypeByTailorId?DressId='+DressId+'&TailorId='+TailorId, { headers: headers});
}
getcustomisationfordress(TailorId,DressSubTypeId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetCustomizationsByTailorId?TailorId='+TailorId+'&DressSubTypeId='+DressSubTypeId, { headers: headers});
}
getcustomiztaionformapped(TailorId,DressSubTypeId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetCustomizationList?TailorId='+TailorId+'&DressSubTypeId='+DressSubTypeId, { headers: headers});
}

getcustomisationAttributes(AttributeId,TailorId,DressSubTypeId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetAttributesByTailorId?AttributeId='+AttributeId+'&TailorId='+TailorId+'&DressSubTypeId='+DressSubTypeId, { headers: headers});
}

insertdressSkill(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/InsertDressSubTypeSkillsByTailor',data, { headers: headers});
}
// <================================material-type-mapping============================================>
getmaterialType(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetOrderTypeByTailorId?TailorId='+TailorId, { headers: headers})
}

insertmaterialType(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/InsertOrderTypeSkillsByTailor',data, { headers: headers});
}


// <================================Measurements-type-mapping============================================>
getGetMeasurements(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetMeasurementsByTailorId?TailorId='+TailorId, { headers: headers})
}

insertMeasurementSkills(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/InsertMeasurementSkillsByTailor?',data, { headers: headers});
}
// <================================STitchingTime-type-mapping============================================>
getGetSTitchingTime(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetAppoinmentTypeByTailorId?TailorId='+TailorId, { headers: headers})
}

insertSTitchingTime(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/InsertAppoinmentSkillsByTailor',data, { headers: headers});
}

// <=================================location===================================>
getGetLocationService(TailorId,ShopId,StateId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/NewGetServiceLocationByTailorId?TailorId='+TailorId+'&ShopId='+ShopId+'&StateId='+StateId, { headers: headers})
}

insertLocation(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/NewInsertServiceSkillsByTailor',data, { headers: headers});
}
// <-------------------------------intro-page---------------------------->
insertprofileintro(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/UpdateTailorImages',data, { headers: headers});
}

// <=====================product-mapping================================>
getAllproductlist(SellerId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetAllProductsByTailor?SellerId='+SellerId, { headers: headers})
}

getproductlistdetails(productId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetProductDetailByStoreTailor?Id='+productId, { headers: headers})
}

getColor(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetAllProductColor', { headers: headers})
}
getBrand(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetAllProductBrands', { headers: headers})
}
getSize(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Products/GetAllProductSize', { headers: headers})
}
insertproductdetails(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Products/UpdateProductByTailor?',data, { headers: headers});
}
getmappedproducts(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetProductsByTailorId?TailorId='+TailorId, { headers: headers})
}
deletemappedproducts(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/products/DeleteProductsById',data, { headers: headers});
}
getallCategories(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Products/GetCategories', { headers: headers})
}
getmappedproddetails(productId,tailorId){
  
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Products/GetProductMappedDetailByStoreTailor?Id='+productId+'&sellerId='+tailorId, { headers: headers})
}
insertNewProduct(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Products/InsertProductByTailor',data, { headers: headers});
}
getRejectedProjects(SellerId){
  
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetRejectNotes?SellerId='+SellerId, { headers: headers})
}
getRejectedProjectsdetails(productId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/products/GetProductRejectDetailByStoreTailor?Id='+productId, { headers: headers})
}
// <=======================Order-management-flow========================>
orderPendingList(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/NewGetOrderNotDeliverd?TailorId='+TailorId, { headers: headers})
}

orderPendingDetails(StoreOrderId,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/WebOrders/NewGetStoreOrderDetailsByTailor?StoreOrderId='+StoreOrderId+'&TailorId='+TailorId, { headers: headers})
}
orderCompletedList(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/NewGetOrderDeliverd?TailorId='+TailorId, { headers: headers})
}
getMeasurementfororder(OrderId,type){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/NewGetRequestMeasurementParts?OrderId='+OrderId+'&Type='+type, { headers: headers})
}
getCustomizationforOrder(OrderId){
  
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/NewGetOrderDetails?OrderId='+OrderId+'&Type=Order', { headers: headers})
}
getStitchingstatusList(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/GetTrackingField', { headers: headers})
}
updateStitchingStatus(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/NewInsertTrackingStatus',data, { headers: headers});
}
getMaterialDetailsforOrder(TailorId,MaterialId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetMaterialDetails?TailorId='+TailorId+'&MaterialId='+MaterialId, { headers: headers})
}
getStoresList(DetailId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/NewGetStoreTrackingDetails?DetailId='+DetailId, { headers: headers})
}
updateStoreStatus(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Products/NewInsertStoreTrackingStatus',data, { headers: headers});
}
getRatingsForStitching(TailorId,OrdId,type){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/GetRating?TailorId='+TailorId+'&OrdId='+OrdId+'&Type='+type, { headers: headers})
}
getRatingForstore(DetailId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/WebOrders/NewGetStoreReview?DetailId='+DetailId, { headers: headers})
}
getTrackingListStitching(DetailId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/NewGetTrackingDetailsTailor?OrderId='+DetailId, { headers: headers})
}
getMeasurementparts(Id){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/order/GetMeasurement2?Id='+Id, { headers: headers})
}
insertnewMeasurement(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/order/InsertUserMeasurementValues?',data, { headers: headers});
}
updateMeasurementId(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/UpdateMeasurementByTailor',data, { headers: headers});
}
createnewAppointmentForMaterial(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Order/NewInsertAppointforMaterial?',data, { headers: headers});
}
createnewAppointmentForMeasurement(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Order/NewInsertAppointforMeasurement',data, { headers: headers});
}
getappointmentMeasurement(OrderId,Type){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/NewGetCustomerInAppoinmentMeasurement?OrderId='+OrderId+'&Type='+Type, { headers: headers})

}
getappointmentMaterial(OrderId,Type){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/NewGetCustomerInAppoinmentMeaterial?OrderId='+OrderId+'&Type='+Type, { headers: headers})
  
}
approverejectMaterial(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/order/NewBuyerOrderApprovalMaterial',data, { headers: headers});
}
approverejectMeasurement(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/order/NewBuyerOrderApprovalMeasurement',data, { headers: headers});
}
// <------------------------buyer-Request----------------------------------->


getbuyerRequestList(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetPendingCustomer?TailorId='+TailorId, { headers: headers})
  
}
getbuyerRequestListDetails(OrderId,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetRequestOrderDetailsByTailor?OrderId='+OrderId+'&TailorId='+TailorId, { headers: headers})
  
}
getbuyerRequestListCustomization(OrderId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetOrderDetails?OrderId='+OrderId, { headers: headers})
  
}
getbuyerRequestListMeasurement(OrderId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetRequestMeasurementParts?OrderId='+OrderId, { headers: headers})
  
}

getbuyerRequestStitchingCgarge(TailorId,DressSubTypeId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetStichingChargesbyTailor?&TailorId='+TailorId+'&DressSubTypeId='+DressSubTypeId, { headers: headers})
  
}
getbuyerRequestMaterialCgarge(TailorId,DressSubTypeId,MaterialId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetMaterialChargesByTailor?&TailorId='+TailorId+'&DressSubTypeId='+DressSubTypeId+'&MaterialId='+MaterialId, { headers: headers})
  
}

approveRejectBuyerRequest(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/TailorOrderApproved',data, { headers: headers});

}
insertTailorCharges(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Shop/NewInsertTailorResponseAndCharges',data, { headers: headers});

}
getbuyerApprovedList(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetApprovedCustomer?TailorId='+TailorId, { headers: headers})
  
}
getbuyerApprovedDetails(OrderId,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetQuotationDetailsByTailor?OrderId='+OrderId+'&TailorId='+TailorId, { headers: headers})
}
getstoreTimings(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetOpeningAndClosingTime', { headers: headers})
}
getDaysforstorTimings(TailorId,ShopId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetStoreTimeByTazilor1?TailorId='+TailorId+'&ShopId='+ShopId, { headers: headers})
}
insertStoreTimings(data){
  
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/shop/InsertTailorStoreTime',data, { headers: headers})
}
appointMentList(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/AppoinmentListTailor?Id='+TailorId, { headers: headers})
}
getSubmittedqutationList(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetQuotaionReject?TailorId='+TailorId, { headers: headers})
}

activeBranchDetails(ShopId,IsActive){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/DeleteShopProfile?ShopId='+ShopId+'&IsActive='+IsActive, { headers: headers})
}


// <------------------------promotion------------------------------->

getofferBanner(){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/GetOfferImages', { headers: headers})
}
getdresstypeforbanner(genderId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Order/GetDressTypeByGender?genderId='+genderId, { headers: headers})
}

getcategoryproductsforbanner(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/TailorCategory?TailorId='+TailorId, { headers: headers})
}

getBrandsproductsforbanner(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/TailorBrands?TailorId='+TailorId, { headers: headers})
}

getstoreProductsforbanner(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Products/GetProductsByTailorId?TailorId='+TailorId, { headers: headers})
}
insertnewPromotion(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/Shop/InsertTailoroffer',data, { headers: headers})
}
getOngoingPromotions(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/GetValidDiscountsByTailor?TailorId='+TailorId, { headers: headers})
}
getExpiredPromotions(TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/Shop/GetExpiredDiscountsByTailor?TailorId='+TailorId, { headers: headers})
}
insertbannername(data){
  let headers = this.createRequestHeader();
  return this.http.post(this.serverUrl+'/InputInterface/InsertOfferTemplate',data, { headers: headers})
}
editPromotion(id){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetDiscountEditByTailor?Id='+id, { headers: headers})
}
getAnalyticsdata(year,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetTailorAnalytics?year='+year+'&TailorId='+TailorId, { headers: headers})
}
getmeasurementListtoUpdate(DressTypeId,UserId,TailorId){
  let headers = this.createRequestHeader();
  return this.http.get(this.serverUrl+'/shop/GetExistingUserMeasurementByTailor?DressTypeId='+DressTypeId+'&UserId='+UserId+'&TailorId='+TailorId, { headers: headers})
}
}
