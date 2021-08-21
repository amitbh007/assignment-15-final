import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  data = {
    name:"",
    website:"",
    address:""
  }
  error:boolean = false;
  created:boolean = false;

  constructor(private dataService:DataService,private router:Router) { }

  onSubmit(){

    console.log("data",this.data);
    for(var key in this.data){
      if(!(this.data as any)[key]){
        console.log("fill all values",key)
        this.error = true;
        return;
      }
    }

    console.log("ready to submit")
    this.dataService.createCustomer(this.data);
    this.error = false;
    this.created = true;
  }

  ngOnInit(): void {
    this.dataService.createEntity.subscribe(e=>{
      this.router.navigate(["/customers"]);
    })
  }

}
