import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from './service/http.service';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns = [
    "aws_image_path",
    "add_row",
		"Account_Details",
		"Text",
    "Domain Dictionary - Wine Name",
    "Wine Name",
		"Wine Varietal",
		"Wine Type",
		"BTG",
		"BTB",
    "Confidence",
		"Status"
	];
  dataSource: MatTableDataSource<any>;
  images = [];
  loader: Boolean = true;
  allData = [];
  searchKeyData = [];
  searchResult = [];
  status = [];
  correctDomainName = [];
  machedData = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  wineName = new FormControl();
  wineVarietal = new FormControl();
  wineType = new FormControl();

  constructor(private _httpService: HttpService, private ref: ChangeDetectorRef) { }

  ngOnInit(){
    this.loader = true;
    this._httpService.getData().subscribe((data) => {
      this.loader = false;
      this.images = data.images;
      this.allData = JSON.parse(data.matched_data);
      this.machedData = this.allData.filter((el) => {
        return el.Status.indexOf("Matched With") >= 0;
      });
      this.dataSource = new MatTableDataSource(this.machedData);
      this.domainNameList(this.allData, this.machedData);
      this.dataSource.sort = this.sort;
    });
      // var data = {
      //   "cols": [
      //     "aws_image_path", 
      //     "Account_Details", 
      //     "Text", 
      //     "Domain Dictionary - Wine Name", 
      //     "Wine Varietal", 
      //     "Wine Type", 
      //     "BTG", 
      //     "BTB", 
      //     "Confidence", 
      //     "Status"
      //   ], 
      //   "images": [
      //     "file_09-09-2020_10-29-18_0.png", 
      //     "file_09-09-2020_01-04-37_0.png", 
      //     "file_09-09-2020_01-04-37_1.png", 
      //     "file_09-09-2020_02-58-14_0.png", 
      //     "file_09-09-2020_03-10-51_0.png", 
      //     "file_09-09-2020_03-10-51_1.png", 
      //     "file_09-09-2020_03-29-04_0.png", 
      //     "file_09-09-2020_03-29-04_1.png", 
      //     "file_09-09-2020_04-00-05_0.png", 
      //     "file_09-09-2020_04-00-05_1.png", 
      //     "file_09-09-2020_04-08-44_0.png", 
      //     "file_10-09-2020_04-17-23_0.png", 
      //     "file_10-09-2020_06-27-17_0.png", 
      //     "file_11-09-2020_07-28-57_0.png", 
      //     "file_11-09-2020_07-28-57_1.png", 
      //     "file_11-09-2020_07-34-48_0.png", 
      //     "file_11-09-2020_07-34-48_1.png", 
      //     "file_11-09-2020_07-41-48_0.png", 
      //     "file_11-09-2020_07-41-48_1.png", 
      //     "file_11-09-2020_08-20-44_0.png", 
      //     "file_11-09-2020_08-23-50_0.png", 
      //     "file_11-09-2020_08-23-50_1.png", 
      //     "file_11-09-2020_09-10-48_0.png", 
      //     "file_11-09-2020_09-10-48_1.png", 
      //     "file_11-09-2020_09-11-28_0.png", 
      //     "file_11-09-2020_09-11-28_1.png", 
      //     "file_11-09-2020_09-12-56_0.png", 
      //     "file_11-09-2020_09-12-56_1.png", 
      //     "file_12-09-2020_06-21-41_0.png", 
      //     "file_12-09-2020_06-21-41_1.png", 
      //     "file_12-09-2020_06-23-34_0.png", 
      //     "file_12-09-2020_06-23-34_1.png", 
      //     "file_12-09-2020_06-24-45_0.png", 
      //     "file_12-09-2020_06-24-45_1.png", 
      //     "file_17-09-2020_05-46-01_0.png", 
      //     "file_17-09-2020_08-18-17_0.png", 
      //     "file_17-09-2020_08-18-17_1.png", 
      //     "file_19-09-2020_07-33-33_0.png", 
      //     "file_25-09-2020_10-12-47_0.png", 
      //     "file_28-09-2020_06-38-16_0.png", 
      //     "file_01-10-2020_10-09-56_0.png", 
      //     "file_01-10-2020_10-36-00_0.png", 
      //     "file_01-10-2020_10-36-00_1.png", 
      //     "file_01-10-2020_10-37-19_0.png", 
      //     "file_06-10-2020_04-34-47_0.png", 
      //     "file_06-10-2020_04-34-47_1.png", 
      //     "file_06-10-2020_05-38-15_0.png", 
      //     "file_06-10-2020_05-38-15_1.png", 
      //     "file_08-10-2020_04-34-21_0.png", 
      //     "file_08-10-2020_05-04-22_1.png", 
      //     "file_08-10-2020_09-23-18_0.png", 
      //     "file_08-10-2020_09-32-54_0.png", 
      //     "file_08-10-2020_09-36-37_0.png", 
      //     "file_21-10-2020_02-02-26_0.png", 
      //     "file_22-10-2020_10-08-20_0.png", 
      //     "file_02-11-2020_01-03-43_0.png", 
      //     "file_11-11-2020_09-58-38_0.png", 
      //     "file_11-11-2020_09-58-38_1.png", 
      //     "file_20-11-2020_06-59-47_0.png", 
      //     "file_20-11-2020_06-59-47_1.png"
      //   ], 
      //   "matched_data": "[{\"BTB\":2.0,\"BTG\":2.0,\"Confidence\":0.53,\"Domain Dictionary - Wine Brand\":\"La Giuva\",\"Domain Dictionary - Wine Distributor\":\"\",\"Domain Dictionary - Wine Location\":\"Italy\",\"Domain Dictionary - Wine Name\":\"La Giuva Rientro Valpolicella\",\"Domain Dictionary - Wine Region\":\"Veneto\",\"Domain Dictionary - Wine Supplier\":\"\",\"Domain Dictionary - Wine Type\":\"Red Wine\",\"Wine Type\":\"Red Wine\",\"Domain Dictionary - Wine Varietal\":\"Red Blend\",\"Wine Varietal\":\"Others\",\"Status\":\"Matched With\",\"Wine Menu - Category\\/Type\":\"N\",\"Wine Menu - Extracted Price\":\"[2, 2, 10]\",\"aws_image_path\":\"\\/var\\/www\\/LAA_Flask_App\\/laa_flask_app\\/uploads\\/file_09-09-2020_10-29-18_0.png\",\"Text\":\"- Proseceo, la Mama, Veneto. NV. 2 2... 10.\",\"which_extraction\":\"Tesseract\",\"email\":\"ericbreiding16@gmail.com\",\"user_validated\":0.0,\"Account_Details\":\"MARIOS OSTERIA, 1400 GLADES RD, BOCA RATON, 33431\",\"image_url\":\"http:\\/\\/52.14.186.140:9000\\/images?image=\\/var\\/www\\/LAA_Flask_App\\/laa_flask_app\\/uploads\\/file_09-09-2020_10-29-18_0.png\"},{\"BTB\":\"\",\"BTG\":\"\",\"Confidence\":0.64,\"Domain Dictionary - Wine Brand\":\"Whitehaven\",\"Domain Dictionary - Wine Distributor\":\"\",\"Domain Dictionary - Wine Location\":\"New Zealand\",\"Domain Dictionary - Wine Name\":\"Whitehaven Sauvignon Blanc\",\"Domain Dictionary - Wine Region\":\"Marlborough\",\"Domain Dictionary - Wine Supplier\":\"E&J Gallo Winery\",\"Domain Dictionary - Wine Type\":\"White Wine\",\"Wine Type\":\"White Wine\",\"Domain Dictionary - Wine Varietal\":\"Sauvignon Blanc\",\"Wine Varietal\":\"Sauvignon Blanc\",\"Status\":\"Matched With\",\"Wine Menu - Category\\/Type\":\"N\",\"Wine Menu - Extracted Price\":\"[12]\",\"aws_image_path\":\"\\/var\\/www\\/LAA_Flask_App\\/laa_flask_app\\/uploads\\/file_09-09-2020_10-29-18_0.png\",\"Text\":\"- Bauignon Blanc, Whitehaven, Marlborough, NZ. . 12\",\"which_extraction\":\"Tesseract\",\"email\":\"ericbreiding16@gmail.com\",\"user_validated\":0.0,\"Account_Details\":\"MARIOS OSTERIA, 1400 GLADES RD, BOCA RATON, 33431\",\"image_url\":\"http:\\/\\/52.14.186.140:9000\\/images?image=\\/var\\/www\\/LAA_Flask_App\\/laa_flask_app\\/uploads\\/file_09-09-2020_10-29-18_0.png\"},{\"BTB\":\"\",\"BTG\":\"\",\"Confidence\":0.56,\"Domain Dictionary - Wine Brand\":\"Louis Jadot\",\"Domain Dictionary - Wine Distributor\":\"\",\"Domain Dictionary - Wine Location\":\"France\",\"Domain Dictionary - Wine Name\":\"Domaine Ferret Pouilly Fuisse, 2015\",\"Domain Dictionary - Wine Region\":\"Burgundy\",\"Domain Dictionary - Wine Supplier\":\"\",\"Domain Dictionary - Wine Type\":\"White Wine\",\"Wine Type\":\"White Wine\",\"Domain Dictionary - Wine Varietal\":\"Chardonnay\",\"Wine Varietal\":\"Chardonnay\",\"Status\":\"Matched With\",\"Wine Menu - Category\\/Type\":\"N\",\"Wine Menu - Extracted Price\":\"[11]\",\"aws_image_path\":\"\\/var\\/www\\/LAA_Flask_App\\/laa_flask_app\\/uploads\\/file_09-09-2020_10-29-18_0.png\",\"Text\":\"inet Gauvignen, Louis M. Martini, Califorma. 11\",\"which_extraction\":\"Tesseract\",\"email\":\"ericbreiding16@gmail.com\",\"user_validated\":0.0,\"Account_Details\":\"MARIOS OSTERIA, 1400 GLADES RD, BOCA RATON, 33431\",\"image_url\":\"http:\\/\\/52.14.186.140:9000\\/images?image=\\/var\\/www\\/LAA_Flask_App\\/laa_flask_app\\/uploads\\/file_09-09-2020_10-29-18_0.png\"}]",
      //   "types_of_data": [
      //     "matched_data"
      //   ], 
      //   "uniq_images_with_path": [
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_10-29-18_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_01-04-37_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_01-04-37_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_02-58-14_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_03-10-51_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_03-10-51_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_03-29-04_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_03-29-04_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_04-00-05_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_04-00-05_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_09-09-2020_04-08-44_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_10-09-2020_04-17-23_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_10-09-2020_06-27-17_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_07-28-57_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_07-28-57_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_07-34-48_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_07-34-48_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_07-41-48_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_07-41-48_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_08-20-44_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_08-23-50_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_08-23-50_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_09-10-48_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_09-10-48_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_09-11-28_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_09-11-28_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_09-12-56_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-09-2020_09-12-56_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_12-09-2020_06-21-41_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_12-09-2020_06-21-41_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_12-09-2020_06-23-34_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_12-09-2020_06-23-34_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_12-09-2020_06-24-45_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_12-09-2020_06-24-45_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_17-09-2020_05-46-01_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_17-09-2020_08-18-17_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_17-09-2020_08-18-17_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_19-09-2020_07-33-33_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_25-09-2020_10-12-47_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_28-09-2020_06-38-16_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_01-10-2020_10-09-56_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_01-10-2020_10-36-00_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_01-10-2020_10-36-00_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_01-10-2020_10-37-19_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_06-10-2020_04-34-47_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_06-10-2020_04-34-47_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_06-10-2020_05-38-15_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_06-10-2020_05-38-15_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_08-10-2020_04-34-21_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_08-10-2020_05-04-22_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_08-10-2020_09-23-18_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_08-10-2020_09-32-54_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_08-10-2020_09-36-37_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_21-10-2020_02-02-26_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_22-10-2020_10-08-20_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_02-11-2020_01-03-43_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-11-2020_09-58-38_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_11-11-2020_09-58-38_1.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_20-11-2020_06-59-47_0.png", 
      //     "/var/www/LAA_Flask_App/laa_flask_app/uploads/file_20-11-2020_06-59-47_1.png"
      //   ]
      // }
      
      // this.loader = false;
      // this.images = data.images;
      // this.allData = JSON.parse(data.matched_data);
      // this.machedData = this.allData.filter((el) => {
      //   return el.Status.indexOf("Matched With") >= 0;
      // });
      // this.dataSource = new MatTableDataSource(this.machedData);
      // this.domainNameList(this.allData, this.machedData);
      // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue) {
    this.loader = true;
    filterValue = '/var/www/LAA_Flask_App/laa_flask_app/uploads/' + filterValue.source.value.trim();
    filterValue = filterValue.toLowerCase();
    if(this.searchKeyData.indexOf(filterValue) > -1){
      this.searchKeyData.splice(this.searchKeyData.indexOf(filterValue), 1);
    } else {
      this.searchKeyData.push(filterValue);
    }
    this.searchResult = [];
    if(this.searchKeyData.length === 0){
      this.searchResult = this.machedData;
    } else {
      this.searchResult = this.machedData.filter((el) => {
        return this.searchKeyData.some((f) => {
          return el.aws_image_path.toLowerCase().indexOf(f.toLowerCase()) >= 0;
        });
      });
    }
    this.domainNameList(this.searchResult, this.allData);
    this.loader = false;
    this.dataSource = new MatTableDataSource(this.searchResult);
    this.ref.detectChanges();
  }

  deleteData(data){
    if(this.searchResult.length === 0){
      this.machedData.splice(this.machedData.indexOf(data), 1);
      this.domainNameList(this.allData, this.allData);
      this.dataSource = new MatTableDataSource(this.machedData);
    } else {
      this.searchResult.splice(this.searchResult.indexOf(data), 1);
      this.machedData.splice(this.machedData.indexOf(data), 1);
      this.domainNameList(this.searchResult, this.allData);
      this.dataSource = new MatTableDataSource(this.searchResult);
    }
    this.ref.detectChanges();
  }

  addRow(index, row){
    var obj = {
      "BTB": "",
      "BTG": "",
      "Confidence": 0,
      "Domain Dictionary - Wine Brand": "",
      "Domain Dictionary - Wine Distributor": "",
      "Domain Dictionary - Wine Location": "",
      "Domain Dictionary - Wine Name": "",
      "Domain Dictionary - Wine Region": "",
      "Domain Dictionary - Wine Supplier": "",
      "Domain Dictionary - Wine Type": "",
      "Wine Type": "",
      "Domain Dictionary - Wine Varietal": "",
      "Wine Varietal": "",
      "Status": "",
      "Wine Menu - Category/Type": "",
      "Wine Menu - Extracted Price": "",
      "aws_image_path": row.aws_image_path,
      "Text": "",
      "which_extraction": "",
      "email": "",
      "user_validated": 0,
      "Account_Details": row.Account_Details,
      "image_url": row.image_url,
      "added": true
    }
    if(this.searchResult.length === 0){
      this.machedData.splice(index + 1, 0, obj);
      this.domainNameList(this.allData, this.allData);
      this.dataSource = new MatTableDataSource(this.machedData);
    } else {
      this.searchResult.splice(index + 1, 0, obj);
      this.machedData.splice(this.machedData.indexOf(row) + 1, 0, obj);
      this.domainNameList(this.searchResult, this.allData);
      this.dataSource = new MatTableDataSource(this.searchResult);
    }
    this.ref.detectChanges(); 
  }

  deleteImageData(data){
    if(this.searchResult.length === 0){
      for(var i=0; i < this.machedData.length; i++){
        if(this.machedData[i].aws_image_path == data.aws_image_path){
          this.machedData.splice(i, 1);
          i--;
        }
      }
      this.domainNameList(this.allData, this.allData);
      this.dataSource = new MatTableDataSource(this.machedData);
    } else {
      for(var i=0; i < this.searchResult.length; i++){
        if(this.searchResult[i].aws_image_path == data.aws_image_path){
          this.searchResult.splice(i, 1);
          i--;
        }
      }
      for(var i=0; i < this.machedData.length; i++){
        if(this.machedData[i].aws_image_path == data.aws_image_path){
          this.machedData.splice(i, 1);
          i--;
        }
      }
      this.domainNameList(this.searchResult, this.allData);
      this.dataSource = new MatTableDataSource(this.searchResult);
    }
    this.ref.detectChanges();
  }

  radioChange(row, value){
    row.Review = value;
  }

  wineNameChange(item, row){
    row["Wine Varietal"] = item["Wine Varietal"];
    row["Wine Type"] = item["Wine Type"];
    row.BTG = item.BTG;
    row.BTB = item.BTB;
  }

  domainNameList(array, machedArray){
    this.correctDomainName = [];
    if(array.length > machedArray.length){
      for(var i = 0; i < machedArray.length; i++){
        this.correctDomainName[i] = array.filter((el) => {
          return el.Text.toLowerCase().indexOf(array[i].Text.toLowerCase()) >= 0;
        });
      }
    }else{
      for(var i = 0; i < array.length; i++){
        this.correctDomainName[i] = machedArray.filter((el) => {
          return el.Text.toLowerCase().indexOf(array[i].Text.toLowerCase()) >= 0;
        });
      }
    }
  }
}
