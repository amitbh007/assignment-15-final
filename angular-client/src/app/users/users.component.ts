import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = 'angular-client';
  // showTable = ;
  // @ViewChild('loadButton') loadButton:ElementRef;
  constructor(private dataService:DataService){}
  ngOnInit(){

    this.dataService.getUsers();
  }

  loadButton(){
    // this.showTable = true;
    this.dataService.getUsers();
    console.log("working");
  }

}
