import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { CookieService } from "ngx-cookie";
import { Customer } from "../models/customer.model";

const origin:string = "client-api"

@Injectable()
export class DataService {
    fetchData = new EventEmitter<any[]>();
    fetchCustomer = new EventEmitter<Customer>();
    jwtToken = new EventEmitter<string>();
    createEntity = new EventEmitter<boolean>();

    private data:any[]=[]

    constructor(private http:HttpClient,private cookieService:CookieService,private router:Router){}

    loginUser(credentials:{email:string,password:string}){
        console.log("cred",credentials);
        console.log("cred2",`${origin}/users/login`);
        this.http.post(`${origin}/users/login`,credentials).subscribe((data)=>{
            console.log("data",data);
            this.jwtToken.emit((data as any).token);
            // return data;
        })
    }

    getUsers(){
        // make api call
        const uid = this.cookieService.get("uid")
        if(uid){

            this.http.get(`${origin}/users?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22firstName%22%3A%20true%2C%0A%20%20%20%20%22middleName%22%3A%20true%2C%0A%20%20%20%20%22lastName%22%3A%20true%2C%0A%20%20%20%20%22email%22%3A%20true%2C%0A%20%20%20%20%22password%22%3A%20true%2C%0A%20%20%20%20%22phone%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%2C%0A%20%20%20%20%22customerId%22%3A%20true%2C%0A%20%20%20%20%22roleKey%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%22customer%22%0A%20%20%5D%0A%7D`
            ,{
                headers:{"Authorization":`Bearer ${uid}`}
            }).subscribe((data)=>{
            // console.log(,data);
                this.data = data as any;
                console.log("another",this.data)
                this.fetchData.emit(this.data);
            });
        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        
        // console.log("get from server",a)
    }

    getCustomerUsers(id:number){
        const uid = this.cookieService.get("uid")
        if(uid){

            this.http.get(`${origin}/customers/${id}/users?filter=%7B%0A%20%20%22additionalProp1%22%3A%20%7B%7D%0A%7D`
            ,{
                headers:{"Authorization":`Bearer ${uid}`}
            }).subscribe((data)=>{
                console.log("customer users",data);
                this.data = data as any;
                this.fetchData.emit(this.data);
            })

            
        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        
    }

    createUser(UserInput:any){
        
        this.http.post(`${origin}/signup`,UserInput).subscribe((data)=>{
            console.log("created user",data);
            this.createEntity.emit(true);
            this.getUsers();
        })
    }

    updateUser(inputUser:any,id:number){
        // this.appolo.mutate({

        const uid = this.cookieService.get("uid")
        if(uid){
            this.http.put(`${origin}/users/${id}`,inputUser
            ,{headers:{"Authorization":`Bearer ${uid}`}}).subscribe(data=>{
                console.log("update data",data);
    
                this.getUsers();
            })
        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        
        
    }
    updateCustomerUser(inputUser:any,id:number){
        // this.appolo.mutate({

        const uid = this.cookieService.get("uid")
        if(uid){
            this.http.put(`${origin}/users/${id}`,inputUser
            ,{headers:{"Authorization":`Bearer ${uid}`}}).subscribe(data=>{
                console.log("update data",data);
    
                this.getCustomerUsers((inputUser as any).customerId);
            })

        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        
    }


    deleteUser(id:number){
        //make call to delete data
        const uid = this.cookieService.get("uid")
        if(uid){
            
            this.http.delete(`${origin}/users/${id}`
            ,{                 headers:{"Authorization":`Bearer ${uid}`}             }).subscribe(data=>{
    
                console.log("deleted",data);
                this.getUsers();
    
            })
            
        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        

    }

    getCustomers(){
        // make api call

        const uid = this.cookieService.get("uid")
        if(uid){
            
            console.log("call made");
            this.http.get(`${origin}/customers?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22website%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%0A%20%20%20%20%22users%22%0A%20%20%5D%0A%7D`,
            {                 headers:{"Authorization":`Bearer ${uid}`}             }).subscribe((data)=>{
                // console.log(,data);
                this.data = data as any;
                console.log("another",this.data)
                this.fetchData.emit(this.data);
    
            });
            
            
        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        
        // console.log("get from server",a)
    }

    getCustomer(id:number){
        const uid = this.cookieService.get("uid")
        if(uid){
            
            
            this,this.http.get(`${origin}/customers/${id}`
            ,{                 headers:{"Authorization":`Bearer ${uid}`}             }).subscribe((data)=>{
                this.data = data as any;
                this.fetchCustomer.emit(this.data as any);
            })
            
            
        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
    }

    
    createCustomer(CustomerInput:any){
        this.http.post(`${origin}/customers`,CustomerInput).subscribe((data)=>{
            console.log("created customer",data);
            this.createEntity.emit(true);
            this.getCustomers();
        })
    }

    updateCustomer(inputCustomer:any,id:number){
        // this.appolo.mutate({

        const uid = this.cookieService.get("uid")
        if(uid){
            this.http.put(`${origin}/customers/${id}`,inputCustomer
            ,{headers:{"Authorization":`Bearer ${uid}`}}).subscribe(data=>{
                console.log("update data",data);
    
                this.getCustomers();
            })

        }
        else{
            this.router.navigate(["/login"]);
            console.log("redirect to login")
        }
        
        

    }

    deleteCustomer(id:number,customerId:number){
        //make call to delete data

        

    }

    deleteCustomerUser(customerId:number,id:number){
        // this.appolo.mutate({
        console.log("ids",customerId,id);
            this.http.delete(`${origin}/users/${id}`).subscribe(data=>{

                console.log("deleted",data);
                this.getCustomerUsers(customerId);
    
            })

    }
}