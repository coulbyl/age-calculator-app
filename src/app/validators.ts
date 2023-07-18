import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms'

export function dayValidator(
  control: AbstractControl
): ValidationErrors | null {
  const inputDay = control.value
  const inputMonth = control.parent?.get('month')?.value
  const {
    isNotARegularDays,
    isInvalidThirtiesMonthDays,
    isInvalidFebruaryDays,
  } = dateValidator(inputDay, inputMonth)

  if (
    inputDay < 1 ||
    isNotARegularDays ||
    isInvalidThirtiesMonthDays ||
    isInvalidFebruaryDays
  ) {
    return { invalidDay: true }
  }
  return null
}

export function monthValidator(
  control: AbstractControl
): ValidationErrors | null {
  const inputMonth = control.value
  if (inputMonth < 1 || inputMonth > 12) {
    return { invalidMonth: true }
  }
  control.parent?.get('day')?.updateValueAndValidity()
  return null
}

export function yearValidator(
  control: AbstractControl
): ValidationErrors | null {
  const currentYear = new Date().getFullYear()
  const inputYear = control.value

  if (inputYear < 1) {
    return { invalidYear: true }
  } else if (inputYear >= currentYear) {
    return { futureDate: true }
  }
  return null
}

export function hasError(
  form: FormGroup,
  controlName: string,
  errorKey: string
): boolean {
  const control = form.get(controlName) as AbstractControl
  return (
    control?.invalid &&
    (control?.dirty || control?.touched) &&
    !!control?.errors?.[errorKey]
  )
}

export function dateValidator(day: number, month: number) {
  const thirtiesMonthDays = [4, 6, 9, 11]
  const regularDays = 31
  const maxDaysInFrebruary = 29
  const february = 2

  const isNotARegularDays = day > regularDays
  const isInvalidFebruaryDays = month === february && day > maxDaysInFrebruary

  const isInvalidThirtiesMonthDays =
    thirtiesMonthDays.includes(month) && day > 30

  return {
    isNotARegularDays,
    isInvalidThirtiesMonthDays,
    isInvalidFebruaryDays,
  }
}

export const errorMessages = {
  required: 'This field is required',
  futureDate: 'Must be in the past',
  invalidMonth: 'Must be a valid month',
  invalidDay: 'Must be a valid day',
  invalidYear: 'Must be a valid year',
}

export type ErrorMessageKey = keyof typeof errorMessages
