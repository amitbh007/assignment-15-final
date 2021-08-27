import { Customer } from "src/app/models/customer.model";
import { Role, User } from "src/app/models/user.model";

export const outputKeyMap = {

    "roleKey":(user:User,key:string)=>{
        return Role[(user as any).roleKey-1];
    },

    "general":(user:User|Customer,key:string)=>{
        return (user as any)[key];
    },

    "customer":(user:User,key:string)=>{
        return (user as any)[key].name;
    },

    "customerId":(user:User,key:string)=>{
        return undefined;
    },

    "password":(user:User,key:string)=>{
        return undefined;
    },

    "username":(user:User,key:string)=>{
        return undefined;
    },

    "users":(customer:Customer,key:string)=>{
        console.log("here",customer);
        return `<a style="color:blue;" href="/customers/${customer.id}/users" >${customer.users.length}</a>`;
    },

}

export const editKeyMap = {
    "general":(user:User|Customer,key:string,index:number)=>{
        return `<input autocomplete="off" name="${key}" id="i_${key}${index}" class="box-content w-16 px-1 bg-blue-200 py-1 rounded-md" value="${(user as any)[key]}" type=""text />`
    },

    "roleKey":(user:User,key:string,index:number)=>{
        return `<select id="i_roleKey${index}" class="inps" name="${key}">
        <option value="1" ${(user as any).roleKey==1?'selected':""} >${Role[0]}</option>
        <option value="2" ${(user as any).roleKey==2?'selected':""} >${Role[1]}</option>
        <option value="3" ${(user as any).roleKey==3?'selected':""} >${Role[2]}</option>
      </select>`
    },

    "id":(user:User,key:string,index:number)=>{
        return user["id"];
    },

    "customer":(user:User,key:string,index:number)=>{
        return (user as any).customer.name;
    },

    "password":(user:User,key:string)=>{
        return undefined;
    },

    "customerId":(user:User,key:string,index:number)=>{
        return undefined;
    },

    "username":(user:User,key:string)=>{
        return undefined;
    },

    "users":(customer:Customer,key:string)=>{
        console.log("here",customer);
        return customer.users.length;
    },
}