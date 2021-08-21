import { User } from "./user.model"

export class Customer{
    id:number
    name:string
    address:string
    website:string
    users:User[]

    constructor(init:string){
        this.id = 0
        this.name = init
        this.address = init
        this.website = init
        this.users = []
    }
}
