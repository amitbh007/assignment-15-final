import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';
import { DataService } from '../services/data.service';

class genericTableComponent<T>{

}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('maintable',{static: false}) mainTable:ElementRef;


  users:User[] = [];
  customers:Customer[] = [];
  customerUsers:User[] = []
  headings:any[] = [];
  data:any[]= [];

  @Input('type') type:string = ""
  @Input('show') show:boolean = false;
  @Input('customerId') customerId:number;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {

    console.log("type",this.type);
    // add dynamic headings
    let args = {};
    if(this.type=="users"){
      args = new User("null");

    }
    else if(this.type=="customers"){
      args = new Customer("null");

     
    }
    else if(this.type=="customerUsers"){
      args = new User("null");
      delete (args as any).customerName;
      console.log("args",args)
      
    }

    this.dataService.fetchData.subscribe(data=>{
      console.log("data recieved",data);
      this.users = data;
      this.data = data as any;
    })

    this.headings = Object.keys(args)
    this.headings.push("options");


    
    
  }

}
