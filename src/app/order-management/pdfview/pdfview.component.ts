import { Component, OnInit } from '@angular/core';
import { ShareFile } from 'nativescript-share-file';
import * as fs from 'tns-core-modules/file-system';
import * as SocialShare from "nativescript-social-share";
import { RouterExtensions } from 'nativescript-angular/router';
import { getFile } from 'tns-core-modules/http';
import { Downloader, ProgressEventData, DownloadEventData } from 'nativescript-downloader';
import {DownloadManager} from 'nativescript-downloadmanager'
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";


@Component({
  selector: 'ns-pdfview',
  templateUrl: './pdfview.component.html',
  styleUrls: ['./pdfview.component.css']
})
export class PdfviewComponent implements OnInit {
  shareFile;
  pdfpath;
  pdfurl: string;

  constructor(public router:RouterExtensions,public api:ApiServiceService) { 
  
  }

  ngOnInit(): void { 
    // this.sharefile()
  var userId=getNumber("userId")
  this.pdfurl = "http://development.mzyoon.com/api/Order/GetFiniquitopdf?StoreOrderId=591&TailorId="+userId
  }

sharefile(){
  var userId=getNumber("userId")
  let that=this;
  this.shareFile = new ShareFile();
  console.log('Download Started');
  var folder = fs.knownFolders.documents();
  var file = fs.path.join(folder.path, "GetFiniquitopdf.pdf");
  var url = "http://development.mzyoon.com/api/Order/GetFiniquitopdf?StoreOrderId=591&TailorId="+userId
  getFile(url, file).then(function (r) {
    console.log(r.path);
    that.pdfpath=r.path
    if( that.pdfpath){
      that.shareFile.open( { 
        path:that.pdfpath,
        intentTitle: 'Open text file with:', // optional Android
        rect: { // optional iPad  
            x: 110,
            y: 110,
            width: 0,
            height: 0
        },
        options: true, // optional iOS
        animated: true // optional iOS
    });
    }
  }, function (e) {
    //// Argument (e) is Error!
  });

}

download(){
  var userId=getNumber("userId")
  let that=this;
  let dm = new DownloadManager();
  dm.downloadFile("http://development.mzyoon.com/api/Order/GetFiniquitopdf?StoreOrderId=591&TailorId="+userId, function(result,uri) {
    console.log(result);
    if(result == true){
      that.api.showtoast('File Downloaded !')
    }
    console.log(uri);
    dm.unregisterBroadcast();
})
}
goBack(){
  this.router.back()
}
}
