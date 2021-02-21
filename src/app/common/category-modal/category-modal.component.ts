import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  lang='English'
  aedata;
  parentcat: any;
  catdata: any;
  identifier: number;
  catId;
  selectedCat: any;
  constructor(private params: ModalDialogParams,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
   this.parentcat=[]
   this.catId=[]
   this.getallCategories()
    this.selectedCat=this.params.context.lengths
    setTimeout(() => {
    if( this.selectedCat){
      console.log('res',this.selectedCat)
      this.selectedCat.map((x,i)=>{
        this.parentcat.map((y,i)=>{
if(x['Id'] == y['Id']){
  this.parentcat[i]['IsActive']=true 
  // if(val=='Men_Fashion'){
  //   this.identifier=2
  // }else if(val=='Women_Fashion'){
  //   this.identifier=3
  // }else if(val=='Boy_Fashion'){
  //   this.identifier=4
  // }else if(val=='Girl_Fashion'){
  //   this.identifier=11
  // }
}
        })
      })
    }
    }, 1000);
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getallCategories(){
    this.api.getallCategories().subscribe(res=>{
      this.catdata=res
      if(res){
        this.catdata.map(x=>{
          if(x['ParentId'] == 0){
            this.parentcat.push(x)
          };
        })

        // console.log('res',this.parentcat)
      }
    })
  }
  getdatabyparentcat(checked,val,Id){
console.log("res",val)
if(val=='Men'){
  this.identifier=2
}else if(val=='Women'){
  this.identifier=3
}else if(val=='Boy'){
  this.identifier=4
}else if(val=='Girl'){
  this.identifier=11
}
this.parentcat.map((x,i)=>{
    this.parentcat[i]['IsActive']=false
})
if(checked == 'false'){
  this.parentcat.map((x,i)=>{
    if(x['Id'] == Id){
      this.parentcat[i]['IsActive']=true
      this.catId.push({"Id":Id})
    }
  })
}else if(checked == 'true'){
  this.parentcat.map((x,i)=>{
    if(x['Id'] == Id){
      this.parentcat[i]['IsActive']=false
      this.catId = this.catId.filter(e => e['Id'] !== Id)
    }
  })
  
}

  }

  getdatabychildcat(checked,val,Id){
  //   this.catdata.map((x,i)=>{
  //     this.catdata[i]['IsActive']=false
  // })
  if(checked == 'false'){
    this.catdata.map((x,i)=>{
      if(x['Id'] == Id){
        this.catdata[i]['IsActive']=true
      this.catId.push({"Id":Id})
      }
    })
  }else if(checked == 'true'){
    this.catdata.map((x,i)=>{
      if(x['Id'] == Id){
        this.catdata[i]['IsActive']=false
        this.catId = this.catId.filter(e => e['Id'] !== Id)
      }
    })
  }
  }
  public close() {
    this.params.closeCallback(this.catId);
}
}
