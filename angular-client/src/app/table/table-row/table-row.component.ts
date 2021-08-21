import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit,EventEmitter, Inject } from '@angular/core';
// import * as EventEmitter from 'events';
import { Role, User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import { editKeyMap, outputKeyMap } from './utils/user.mapper';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input('index') index:number = 0;
  @Input('type') type:string = "";
  @Input('customerId') customerId:number;

  content:boolean = true;
  
  
  //mode is used to swith the row between content type or input type
  mode = new EventEmitter<{type:string,index:number}>();


  @Input('data') data!:any;

  outputObject:any= [];
  constructor(private dataService:DataService) {}

  ngOnInit(): void {
    
    console.log("init yeah")
    delete (this.data as any).__typename;

    //listening to mode which can be changed on cancel ,save clicks
    this.mode.subscribe(m=>{
      if(m.type == "content"&&m.index == this.index){
        console.log(this.data)

        this.outputObject = Object.keys(this.data).map(key=>{

          if(Object.keys(outputKeyMap).includes(key)){
            return (outputKeyMap as any)[key](this.data,key)
          }
          else{
            return (outputKeyMap as any)["general"](this.data,key)
          }
          
        }) ;

        console.log("output map",outputKeyMap);
        this.content = true;

      }else if(m.type == "edit"&&m.index == this.index){
        this.outputObject = Object.keys(this.data).map((key,i)=>{
          console.log("keys",key)
          if(Object.keys(editKeyMap).includes(key)){
            return (editKeyMap as any)[key](this.data,key,this.index)
          }
          else{
            return editKeyMap["general"](this.data,key,this.index)
          }}
        )
        this.content = false;
      }

      
      while(this.outputObject.indexOf(undefined)!=-1){
        this.outputObject.splice(this.outputObject.indexOf(undefined),1);
      }

    })
    
    this.outputObject = Object.keys(this.data).map(key=>{   
      console.log("keys",key)
      if(Object.keys(outputKeyMap).includes(key)){
        return (outputKeyMap as any)[key](this.data,key)
      }
      else{
        return (outputKeyMap as any)["general"](this.data,key)
      }
    }) ;
    if(this.type=="customers"&&!this.data.users){
      this.outputObject.push(`<a style="color:blue;" href="/customers/${this.data.id}/users" >0</a>`)
    }


    while(this.outputObject.indexOf(undefined)!=-1){
      this.outputObject.splice(this.outputObject.indexOf(undefined),1);
    }

    console.log("current type",this.outputObject)

  }


  handleCancelClick(){
    this.mode.emit({type:"content",index:this.index});
  }

  handleSaveClick(){
    let input = {};

    Object.keys(this.data).forEach((key)=>{
      console.log("input keys",key);
      if(key!="customer"&&key!="id"&&key!="customerId"&&key!="users"&&key!="password"){
        input = {...input,[key]:(<HTMLInputElement>document.getElementById(`i_${key}${this.index}`)).value}
      }
    })

    input = {
      ...input,
      id:this.data.id,
      customerId:(this.data as any).customerId,
      password:this.data.password
    } 

    delete (input as any).__typename;
    (input as User).roleKey = Number((input as User).roleKey)

    console.log("input",input);

    if(this.type=="customerUsers"){
      this.dataService.updateCustomerUser(input as any,this.data.id)
    }

    if(this.type=="customers"){
      delete (input as any).roleKey;
      delete (input as any).customerId;

      console.log("input",input);
      this.dataService.updateCustomer(input as any,this.data.id)
    }

    console.log("to be sent",input);

    if(this.type=="users"){
      this.dataService.updateUser(input as any,this.data.id);
    }

  }

  handleEditClick(){
    this.mode.emit({type:"edit",index:this.index});
  }

  handleDeleteClick(){
    if(this.type=="users"){
      this.dataService.deleteUser(this.data.id);
    }

    if(this.type == "customerUsers"){
      this.dataService.deleteCustomerUser(Number(this.customerId),this.data.id)
    }
  }



}


