import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registe',
  templateUrl: './registe.component.html',
  styleUrls: ['./registe.component.css']
})
export class RegisteComponent implements OnInit {

  data = {
    firstName:"",
    middleName:"",
    lastName:"",
    roleKey:1,
    address:"",
    email:"",
    phone:"",
    customerId:1,
    password:""
  }
  id:number
  error:boolean = false;
  created:boolean = false;

  constructor(private dataService:DataService,private router:Router) { }

  onSubmit(){

    console.log("data",this.data);
    for(var key in this.data){
      if(!(this.data as any)[key]){
        this.error = true;
        console.log("fill all values",key)
        return;
      }
    }

    console.log("ready to submit",this.data)
    this.dataService.createUser(this.data);
    this.error = false;
    this.created = true;
  }

  ngOnInit(): void {
    this.dataService.createEntity.subscribe(e=>{
      this.router.navigate(["/login"])
    })
  }

}
