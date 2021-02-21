import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import * as dialogs from "tns-core-modules/ui/dialogs";
import {  Page } from 'tns-core-modules/ui/page';
import { Color } from "tns-core-modules/color";
import { RangeSeekBarEventData } from "nativescript-range-seek-bar";
import {isIOS, isAndroid} from "tns-core-modules/platform"
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-measure-modal',
  templateUrl: './measure-modal.component.html',
  styleUrls: ['./measure-modal.component.css']
})
export class MeasureModalComponent implements OnInit {
  lang='English'
  aedata;
  numbers;
  sliderval: any;
public rangeSeekBarProp = {
    minValue: 0,
    maxValue: 100,
    minRange: 0,
    step: 0.1
};
data;
  constructor(private params: ModalDialogParams,public api:ApiServiceService, private page: Page, public aetext:EnANdAeJson) {
    // this.page.backgroundColor =new Color('#00000000');
 
  
  }
 
  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    var datas=this.params.context.data
    this.data={
      "Id":datas.Id,
      "Value":datas.Value,
      "Image":datas.Image,
      "PartGifImage":this.api.imageurl+'Measurement2/'+datas.PartGifImage,
      "StartMeasurementValue":datas.StartMeasurementValue,
      "EndMeasurementValue":datas.EndMeasurementValue,
    }
    
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  ongetnumber(event){
    console.log('vall',event.value)
let val=event.value
if(val > this.data.EndMeasurementValue || val < this.data.StartMeasurementValue ){
  if(this.lang=='English'){
    this.api.showtoast('Please enter value between min and max number!')
  }else{
    this.api.showtoast('الرجاء إدخال قيمة بين الحد الأدنى والأعلى المحددين')
  }
  this.sliderval=0
  // this.numbers=null
}else{
  this.sliderval=val
}
  }
  onSliderValueChange(args) {
    var v = args.value * 0.1;
    var s=v.toString()
   var sliderval=parseFloat(s).toFixed(1)
   var a=sliderval.toString().split(".")[0]; ///before
   var b=sliderval.toString().split(".")[1]; ///after
   var preval=parseInt(a)*10
   this.sliderval=preval+'.'+b
    console.log('valll', this.sliderval)
}
rangeSeekBarChanged(event: RangeSeekBarEventData) {
  console.log("rangeSeekBarChanged: ", event.value);
}

rangeSeekBarFinalValue(event: RangeSeekBarEventData) {
  console.log("rangeSeekBarFinalValue: ", event.value);
}
save(){
  let temp={
    'Id':  this.data.Id,
    'value': this.sliderval
  }
  this.params.closeCallback(temp);
}
cancel(){
  
  this.params.closeCallback();
}
}
