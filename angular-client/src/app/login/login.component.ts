import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email:"",
    password:""
  }
  constructor(private dataService:DataService,private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    this.dataService.jwtToken.subscribe(t=>{
      console.log("token",t);
      this.cookieService.put("uid",t);
      this.router.navigate(["/users"]);
    })
  }

  async onSubmit(){
    this.dataService.loginUser(this.credentials)
  }

}
