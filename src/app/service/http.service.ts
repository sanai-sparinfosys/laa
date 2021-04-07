import { Injectable, OnInit } from '@angular/core';
import { Observable } from  "rxjs";
import { HttpClient } from  "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private  httpClient:HttpClient) { }

  getData(imagePath): Observable<any>{
    return this.httpClient.get("http://52.14.186.140:9000/process_and_load_data_api?aws_image_path="+imagePath);
  }

  getImages(): Observable<any>{
    return this.httpClient.get("http://52.14.186.140:9000/aws/images");
  }
}
