import { Injectable, OnInit } from '@angular/core';
import { Observable } from  "rxjs";
import { HttpClient } from  "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private  httpClient:HttpClient) { }

  getData(imagePath): Observable<any>{
    return this.httpClient.get("http://18.189.137.35:9000/process_and_load_data_api?aws_image_path="+imagePath);
  }

  getImages(): Observable<any>{
    return this.httpClient.get("http://18.189.137.35:9000/aws/images");
  }

  postData(data): Observable<any>{
    return this.httpClient.post("http://18.189.137.35:9000/submit_validated_data", data);
  }

  submitInvalidData(data): Observable<any>{
    return this.httpClient.post("http://18.189.137.35:9000/submit_invalid_data", data);
  }

  getValidData(): Observable<any>{
    return this.httpClient.get("http://18.189.137.35:9000/get_validated_data");
  }
}
