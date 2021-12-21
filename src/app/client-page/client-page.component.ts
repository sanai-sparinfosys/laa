import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {
  displayedColumns = [
    "aws_image_path",
		"Account_Details",
		"Text",
    "Domain Dictionary - Wine Name",
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
  pages = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  wineName = new FormControl();
  wineVarietal = new FormControl();
  wineType = new FormControl();

  constructor(private _httpService: HttpService, private ref: ChangeDetectorRef, private router: Router) { }

  ngOnInit(){
    this.loader = true;
    this._httpService.getImages().subscribe((res) => {
      this.images = res;
      for(var i=0;i<5;i++){
        this.pages.push(i+1);
      }
    });
    this._httpService.getValidData().subscribe((data) => {
      this.loader = false;
      if(Object.keys(data).length != 0){
        this.allData = data.response;
        this.machedData = this.allData.filter((el) => {
          return this.searchKeyData.some((f) => {
            return this.images[0].Aws_Image_Path.toLowerCase().indexOf(f.toLowerCase()) >= 0;
          });
        });
        this.dataSource = new MatTableDataSource(this.machedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  paginationChange(event){
    var image = this.images[event.pageSize - 1].Aws_Image_Path;
    this.machedData = this.allData.filter((el) => {
      return el.Aws_Image_Path == image;
    });
    this.dataSource = new MatTableDataSource(this.allData);
  }

  removePath(path: string): string {
    return path.split("/").pop();
  }

  applyFilter(filterValue) {
    this.machedData = [];
    this.machedData = this.allData.filter((el) => {
      return el.Aws_Image_Path.toLowerCase().indexOf(filterValue.source.value.toLowerCase()) >= 0;
    });
    this.dataSource = new MatTableDataSource(this.machedData);
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

  saveData(){
    var data = {
      json_data: this.allData
    }
    this._httpService.submitInvalidData(data).subscribe((res) => {
      alert("Saved Success");
      window.location.reload();
    });
  }
}
