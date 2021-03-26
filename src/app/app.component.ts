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

  keyword = 'name';
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
  
  selectEvent(item) {
  }

  onChangeSearch(search: string) {
  }

  onFocused(e) {
  }
}
