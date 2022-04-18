import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class DataService {
    constructor(private http: HttpClient){}
    getBanks(){
        return this.http.get('http://localhost:3000/banks')
        
    }
    createBank(bank:any){
        return this.http.post('http://localhost:3000/banks',bank)
    }

    changeBank(bank:any , name: string, rate: number , maxLoan:number , downPayment : number , loanTerm : number ){
        return this.http.put(`http://localhost:3000/banks/${bank.id}`, {name , rate , maxLoan , downPayment , loanTerm})
    }

    deleteBank(bank:any){
       return  this.http.delete(`http://localhost:3000/banks/${bank.id}`)
    }
}