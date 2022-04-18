import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
  form!: FormGroup;
  changeForm!: FormGroup;
  banks : any = [];
  lever = 0;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl('',Validators.required),
      rate : new FormControl('',[ Validators.required, this.isPercent]),
      maxLoan : new FormControl('',[Validators.required, this.isNumber]),
      downPayment : new FormControl('',[Validators.required, this.isPercent]),
      loanTerm : new FormControl('', [Validators.required, this.isNumber])
    })

    this.changeForm = new FormGroup({
      name : new FormControl('',Validators.required),
      rate : new FormControl('',[ Validators.required, this.isPercent]),
      maxLoan : new FormControl('',[Validators.required, this.isNumber]),
      downPayment : new FormControl('',[Validators.required, this.isPercent]),
      loanTerm : new FormControl('', [Validators.required, this.isNumber])
    })


    this.data.getBanks()
    .subscribe((res:any) =>{
      this.banks = res;
    })
  }
  isPercent(control : FormControl) {
    if(isNaN(control.value)||control.value > 100){
      return {
        "Type error" : true
      }
    }
    return null
  }

  isNumber(control : FormControl){
    if(isNaN(control.value)){
      return {
        "Type error": true
      }
    }
    return null
  }

  changeLever(bank:any){
    this.lever = bank.id
  }

  createBank(){
    this.data.createBank({
      name : this.form.get('name')?.value,
      rate : this.form.get('rate')?.value,
      maxLoan : this.form.get('maxLoan')?.value,
      downPayment : this.form.get('downPayment')?.value,
      loanTerm : this.form.get('loanTerm')?.value
    })
    .subscribe(bank => {
      this.banks.push(bank);
    })
    this.form.reset();
  }

  changeBank(bank : any){
    this.data.changeBank(
      bank, 
      this.changeForm.get('name')?.value,
      this.changeForm.get('rate')?.value,
      this.changeForm.get('maxLoan')?.value,
      this.changeForm.get('downPayment')?.value,
      this.changeForm.get('loanTerm')?.value
    )
    .subscribe(res => console.log(res))

    let changedBank = this.banks.find((el:any) => el.id === bank.id)
    changedBank.name = this.changeForm.get('name')?.value,
    changedBank.rate = this.changeForm.get('rate')?.value,
    changedBank.maxLoan = this.changeForm.get('maxLoan')?.value,
    changedBank.downPayment = this.changeForm.get('downPayment')?.value,
    changedBank.loanTerm = this.changeForm.get('loanTerm')?.value
  }

  deleteBank(bank : any){
    this.data.deleteBank(bank)
    .subscribe(res => {
      this.banks = this.banks.filter((el:any) => el.id !== bank.id)
    })

  }

}
