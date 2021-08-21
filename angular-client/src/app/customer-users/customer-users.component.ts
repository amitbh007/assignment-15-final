import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-customer-users',
  templateUrl: './customer-users.component.html',
  styleUrls: ['./customer-users.component.css']
})
export class CustomerUsersComponent implements OnInit {

  customer:Customer = {
    name:"",
    address:"",
    website:"",
    users:[],
    id:0
  };
  id:number;
  url:string

  constructor(private dataService:DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("params id",);
    this.id = Number(this.route.snapshot.params['id'])
    this.url = "/customers/"+this.id+"/createuser"

    this.dataService.getCustomerUsers(this.id);
    this.dataService.fetchCustomer.subscribe(c=>{
      this.customer = c;
      console.log("customer",c);
    })

    this.dataService.getCustomer(this.id);
  }

}
