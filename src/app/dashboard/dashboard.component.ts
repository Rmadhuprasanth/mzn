import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';
import { TabView } from 'tns-core-modules/ui/tab-view';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from "tns-core-modules/ui/page";
import { getBoolean, setBoolean, getNumber, setNumber, getString, setString, hasKey, remove, clear } from "tns-core-modules/application-settings";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { OandptimeModalComponent } from './oandptime-modal/oandptime-modal.component';
import { ApiServiceService } from '../endpoint/api-service.service';
import { EnANdAeJson } from '../endpoint/En-Ae.service';

@Component({
  selector: 'ns-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lang='English'
  checkval = 'false'
  checkimg = '~/assets/dashbord/Unchecked.png'
  monval = 'false';
  monimg = '~/assets/dashbord/Unchecked.png'
  Tueval = 'false'
  Tueimg = '~/assets/dashbord/Unchecked.png'
  Wedneval = 'false'
  Wedneimg = '~/assets/dashbord/Unchecked.png'
  Thurval = 'false'
  Thurimg = '~/assets/dashbord/Unchecked.png'
  frival = 'false'
  friimg = '~/assets/dashbord/Unchecked.png'
  satval = 'false'
  satimg = '~/assets/dashbord/Unchecked.png'
  shoppingHours: FormGroup;
  public selectedIndex = 1;
  public items: Array<string>;
  sunhow: boolean;
  monDay: any;
  TueDay: any;
  WedneDay: any;
  ThurDay: any;
  friDay: any;
  SatDay: any;
  SunnDay: any;
  monhow: boolean;
  Tueshow: boolean;
  Wedneshow: boolean;
  Thurshow: boolean;
  frishow: boolean;
  satshow: boolean;
  aedata;
  constructor(private router: RouterExtensions, public formBuilder: FormBuilder, private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public api: ApiServiceService,public aetext:EnANdAeJson) {
    this.shoppingHours = this.formBuilder.group({
      Saturday: this.formBuilder.array([this.createTimeFormGroup()]),
      Sunday: this.formBuilder.array([this.createTimeFormGroup()]),
      Monday: this.formBuilder.array([this.createTimeFormGroup()]),
      Tuesday: this.formBuilder.array([this.createTimeFormGroup()]),
      Wednesday: this.formBuilder.array([this.createTimeFormGroup()]),
      Thursday: this.formBuilder.array([this.createTimeFormGroup()]),
      Friday: this.formBuilder.array([this.createTimeFormGroup()]),
    });

    this.items = [];
    for (var i = 0; i < 5; i++) {
      this.items.push("data item " + i);
    }
  }

  ngOnInit(): void {
    
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.SunnDay = {
      "DayId": "",
      "Days": ""
    }
    this.monDay = {
      "DayId": "",
      "Days": ""
    }
    this.TueDay = {
      "DayId": "",
      "Days": ""
    }
    this.WedneDay = {
      "DayId": "",
      "Days": ""
    }
    this.ThurDay = {
      "DayId": "",
      "Days": ""
    }
    this.friDay = {
      "DayId": "",
      "Days": ""
    }
    this.SatDay = {
      "DayId": "",
      "Days": ""
    }
    this.getDaysforstoreTimings()
  }  
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getDaysforstoreTimings() {
    let TailorId = getNumber("userId")
    // let shopId= getNumber('shopId')

    let shopId = 105
    this.api.getDaysforstorTimings(TailorId, shopId).subscribe(res => {
      let data = res['Result']
      // <---------------patching-existing values from array---------------------->
      if (data[6]['Days'] == 'Sunday') {
        this.SunnDay.DayId = data[6]['DayId']
        this.SunnDay.Days = data[6]['Days']
        let sundaytime = data[6]['timings']
        sundaytime.map((x, i) => {
          let xsun = (<FormArray>this.shoppingHours.controls['Sunday']).at(i);
          xsun.patchValue({
            DayId: data[6]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xsun.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xsun.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })
      }

      if (data[0]['Days'] == 'Monday') {
        this.monDay.DayId = data[0]['DayId']
        this.monDay.Days = data[0]['Days']

        let mondaytime = data[0]['timings']
        mondaytime.map((x, i) => {
          let xmon = (<FormArray>this.shoppingHours.controls['Monday']).at(i);
          xmon.patchValue({
            DayId: data[0]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xmon.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xmon.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })
      }
      if (data[1]['Days'] == 'Tuesday') {
        this.TueDay.DayId = data[1]['DayId']
        this.TueDay.Days = data[1]['Days']
        let tuesdaytime = data[1]['timings']
        tuesdaytime.map((x, i) => {
          let xtues = (<FormArray>this.shoppingHours.controls['Tuesday']).at(i);
          xtues.patchValue({
            DayId: data[1]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xtues.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xtues.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })

      }


      if (data[2]['Days'] == 'Wednesday') {
        this.WedneDay.DayId = data[2]['DayId']
        this.WedneDay.Days = data[2]['Days']
        let Wednedaytime = data[2]['timings']
        Wednedaytime.map((x, i) => {
          let xWed = (<FormArray>this.shoppingHours.controls['Wednesday']).at(i);
          xWed.patchValue({
            DayId: data[2]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xWed.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xWed.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })

      }

      if (data[3]['Days'] == 'Thursday') {
        this.ThurDay.DayId = data[3]['DayId']
        this.ThurDay.Days = data[3]['Days']
        let Thurdaytime = data[3]['timings']
        Thurdaytime.map((x, i) => {
          let xThur = (<FormArray>this.shoppingHours.controls['Thursday']).at(i);
          xThur.patchValue({
            DayId: data[3]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xThur.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xThur.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })

      }

      if (data[4]['Days'] == 'Friday') {
        this.friDay.DayId = data[4]['DayId']
        this.friDay.Days = data[4]['Days']
        let fridaytime = data[4]['timings']
        fridaytime.map((x, i) => {
          let xfri = (<FormArray>this.shoppingHours.controls['Friday']).at(i);
          xfri.patchValue({
            DayId: data[4]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xfri.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xfri.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })

      }

      if (data[5]['Days'] == 'Saturday') {
        this.SatDay.DayId = data[5]['DayId']
        this.SatDay.Days = data[5]['Days']
        let Sattime = data[5]['timings']
        Sattime.map((x, i) => {
          let xSat = (<FormArray>this.shoppingHours.controls['Saturday']).at(i);
          xSat.patchValue({
            DayId: data[5]['DayId']
          })
          if (x.OpeningTime && x.ClosingTimes) {
            xSat.patchValue({
              Intime: x.OpeningTime,
              InId:x.OpeningTimeid
            });
            xSat.patchValue({
              Outtime:x.ClosingTimes,
            OutId: x.ClosingTimeId
            });
            return
          };
        })

      }


    })
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  getmaterial(val) {
    console.log('vall', val)
    if (val == 'false') {
      this.checkval = 'true'
      this.checkimg = '~/assets/dashbord/Check box.png'
      this.sunhow = true
    } else if (val == 'true') {
      this.checkval = 'false'
      this.checkimg = '~/assets/dashbord/Unchecked.png'
      this.sunhow = false
    }
  }
  getmodaytick(val) {
    console.log('vall', val)
    if (val == 'false') {
      this.monval = 'true'
      this.monimg = '~/assets/dashbord/Check box.png'
      this.monhow = true
    } else if (val == 'true') {
      this.monval = 'false'
      this.monimg = '~/assets/dashbord/Unchecked.png'
      this.monhow = false
    }
  }
  getTuetick(val) {
    if (val == 'false') {
      this.Tueval = 'true'
      this.Tueimg = '~/assets/dashbord/Check box.png'
      this.Tueshow = true
    } else if (val == 'true') {
      this.Tueval = 'false'
      this.Tueimg = '~/assets/dashbord/Unchecked.png'
      this.Tueshow = false
    }
  }
  getWednetick(val) {
    if (val == 'false') {
      this.Wedneval = 'true'
      this.Wedneimg = '~/assets/dashbord/Check box.png'
      this.Wedneshow = true
    } else if (val == 'true') {
      this.Wedneval = 'false'
      this.Wedneimg = '~/assets/dashbord/Unchecked.png'
      this.Wedneshow = false
    }
  }
  getThurtick(val) {
    if (val == 'false') {
      this.Thurval = 'true'
      this.Thurimg = '~/assets/dashbord/Check box.png'
      this.Thurshow = true
    } else if (val == 'true') {
      this.Thurval = 'false'
      this.Thurimg = '~/assets/dashbord/Unchecked.png'
      this.Thurshow = false
    }
  }
  getfritick(val) {
    if (val == 'false') {
      this.frival = 'true'
      this.friimg = '~/assets/dashbord/Check box.png'
      this.frishow = true
    } else if (val == 'true') {
      this.frival = 'false'
      this.friimg = '~/assets/dashbord/Unchecked.png'
      this.frishow = false
    }
  }
  getsattick(val) {
    if (val == 'false') {
      this.satval = 'true'
      this.satimg = '~/assets/dashbord/Check box.png'
      this.satshow = true
    } else if (val == 'true') {
      this.satval = 'false'
      this.satimg = '~/assets/dashbord/Unchecked.png'
      this.satshow = false
    }
  }
  // * formarray func to call when creating or deleting
  // */
  private createTimeFormGroup(): FormGroup {
    return new FormGroup({
      "DayId": new FormControl('', [Validators.required]),
      'InId': new FormControl('', [Validators.required]),
      'OutId': new FormControl('', [Validators.required]),
      'Intime': new FormControl('', [Validators.required]),
      'Outtime': new FormControl('', [Validators.required])
    })
  }
  /**
   * when Plus icon is clicked this func adds new open and close time fields 
   */
  public addTimeFormGroup(val) {
    const emails = this.shoppingHours.get(val) as FormArray
    emails.push(this.createTimeFormGroup())
  }

  /**
    * when minus icon is clicked this func adds new open and close time fields 
    */
  public removeTimeFormGroup(i, val) {
    const branch = this.shoppingHours.get(val) as FormArray
    if (branch.length > 1) {
      branch.removeAt(branch.length - 1)
    } else {
      branch.reset()
      return
    }
  }


  getDayIdbyTime(dayId, opencls, group, i) {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      ios: {
        presentationStyle: UIModalPresentationStyle.OverFullScreen
      },
      context: {}
    };
    this.modalService.showModal(OandptimeModalComponent, options).then(res => {
      console.log('rerrr', res);
      if (res) {
        //  const groupName = this.shoppingHours.get(group) as FormArray;
        let x = (<FormArray>this.shoppingHours.controls[group]).at(i);
        x.patchValue({
          DayId: dayId
        })
        if (opencls == 'open') {
          x.patchValue({
            InId: res['id'],
            Intime:res['time']
           
          });
          return
        }
        if (opencls == 'close') {
          x.patchValue({
            OutId: res['id'],
            Outtime: res['time']
          });
          return
        }
      }
    });
  }
  insertStoreTimings() {
    var shoppingHours = [];
    if (this.shoppingHours.value['Saturday']) {
      this.shoppingHours.value['Saturday'].map(item => {
        console.log('item',item)
        shoppingHours.push(item)
      })
    }
    if (this.shoppingHours.value['Sunday']) {
      this.shoppingHours.value['Sunday'].map(item => {
        shoppingHours.push(item)
      })
    }
    if (this.shoppingHours.value['Monday']) {
      this.shoppingHours.value['Monday'].map(item => {
        shoppingHours.push(item)
      })
    }
    if (this.shoppingHours.value['Tuesday']) {
      this.shoppingHours.value['Tuesday'].map(item => {
        shoppingHours.push(item)
      })
    }
    if (this.shoppingHours.value['Wednesday']) {
      this.shoppingHours.value['Wednesday'].map(item => {
        shoppingHours.push(item)
      })
    }
    if (this.shoppingHours.value['Thursday']) {
      this.shoppingHours.value['Thursday'].map(item => {
        shoppingHours.push(item)
      })
    }
    if (this.shoppingHours.value['Friday']) {
      this.shoppingHours.value['Friday'].map(item => {
        shoppingHours.push(item)
      })
    }
    let data = {
      "TailorId": getNumber("userId"),
      "ShopId": getNumber('shopId'),
      "Time": shoppingHours
    }
    console.log('tempsss', data)
    this.api.insertStoreTimings(data).subscribe(res => {
      console.log('res', res)
      if (res['Result'] == 1) {
        if(this.lang=='English'){
          this.api.showtoast('Store Timings Updated !')
        }else{
          this.api.showtoast('تم تحديث بيانات الوقت الخاثة بالمحل بنجاح')
        }
        this.router.navigate(['/StorelistComponent'])
      }
    })

  }
  goBack() {
    this.router.back()
  }
}
