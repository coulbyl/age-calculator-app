import { Component, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputNumberComponent),
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() error!: boolean
  @Input() label!: string
  @Input() placeholder!: string
  @Input() errorMessage?: string

  value!: string

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(value: string): void {
    this.value = value
    this.onChange(value)
    this.onTouch(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  updateValue(target: any): void {
    this.value = target.value
    this.onChange(this.value)
    this.onTouch(this.value)
  }
}
