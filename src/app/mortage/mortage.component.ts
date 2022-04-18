import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mortage',
  templateUrl: './mortage.component.html',
  styleUrls: ['./mortage.component.scss']
})
export class MortageComponent implements OnInit {
  loanForm!: FormGroup;
  banks:any = [];
  selectedValue:any;
  monthlyPayment:any;
  lever = false;
  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.data.getBanks()
    .subscribe(banks => this.banks = banks );

    this.loanForm = new FormGroup({
      loan_sum !: new FormControl('',[Validators.required,this.isNumber]),
      down_payment !: new FormControl('',[Validators.required,this.isNumber])
    })
  }
  isNumber(control : FormControl){
    if(isNaN(control.value)|| control.value < 0){
      return {
        "Type error": true
      }
    }
    return null
  }

  monthlyPaymentCalc(){
    this.lever = true
    let monthlyPaymentSum;
    let firstOperatorOfSum;
    let secondOperatorOfSum;
    let thirdOperatorOfSum;
    let currentBank = this.banks.find((el:any)=> el.name == this.selectedValue) 
    if(this.loanForm.get('loan_sum')?.value > +currentBank.maxLoan){
      this.monthlyPayment = `Sorry but the sum of loan is to big , the maximum loan sum of ${currentBank.name} is ${currentBank.maxLoan}`
    }
    else if(this.loanForm.get('down_payment')?.value < (this.loanForm.get('loan_sum')?.value*currentBank.downPayment)/100){
      this.monthlyPayment = `Sorry but your down payment is to low the minimum down payment of your sum in ${currentBank.name} is ${this.loanForm.get('loan_sum')?.value*currentBank.downPayment/100}` 
    }
    else{
      firstOperatorOfSum = this.loanForm.get('loan_sum')?.value*((currentBank.rate/100)/12)
      secondOperatorOfSum = Math.pow((1 + (currentBank.rate/100)/12),currentBank.loanTerm)
      thirdOperatorOfSum = secondOperatorOfSum - 1
      monthlyPaymentSum = ((firstOperatorOfSum*secondOperatorOfSum)/thirdOperatorOfSum).toFixed()
      this.monthlyPayment = `The monthly payment of your loan is ${monthlyPaymentSum}`
    }
  }

  
  

}
