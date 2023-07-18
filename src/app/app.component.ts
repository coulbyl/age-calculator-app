import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
  hasError,
  dayValidator,
  monthValidator,
  yearValidator,
  errorMessages,
  ErrorMessageKey,
} from './validators'
import { Age, calculateAge } from './utils/calculator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component-mobile.css', './app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup

  age!: Age

  hasResult = false

  errorMessages = errorMessages

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      day: ['', [Validators.required, dayValidator]],
      month: ['', [Validators.required, monthValidator]],
      year: ['', [Validators.required, yearValidator]],
    })
  }

  onCalculate() {
    if (!this.form.valid) {
      this.hasResult = false
      return
    }

    const { day, month, year } = this.form.value

    this.age = calculateAge(new Date(year, Number(month) - 1, day))

    this.hasResult = true
  }

  hasError(field: string, errorKey: string) {
    return hasError(this.form, field, errorKey)
  }

  getErrorMessage(field: string, invalidKey: ErrorMessageKey) {
    return (
      this.getRequiredMessage(field) ??
      this.getInvalidMessage(field, invalidKey)
    )
  }

  private getRequiredMessage(field: string) {
    return this.hasError(field, 'required')
      ? this.errorMessages.required
      : undefined
  }

  private getInvalidMessage(field: string, invalidKey: ErrorMessageKey) {
    return this.hasError(field, invalidKey) && !this.hasError(field, 'required')
      ? this.errorMessages[invalidKey]
      : undefined
  }
}
