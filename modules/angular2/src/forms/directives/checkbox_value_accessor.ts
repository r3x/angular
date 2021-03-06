import {ElementRef, Directive} from 'angular2/angular2';
import {Renderer} from 'angular2/src/render/api';
import {ControlDirective} from './control_directive';
import {ControlValueAccessor} from './control_value_accessor';

/**
 * The accessor for writing a value and listening to changes on a checkbox input element.
 *
 *
 *  # Example
 *  ```
 *  <input type="checkbox" [control]="rememberLogin">
 *  ```
 *
 * @exportedAs angular2/forms
 */
@Directive({
  selector: 'input[type=checkbox][control],input[type=checkbox][form-control]',
  hostListeners: {'change': 'onChange($event.target.checked)'},
  hostProperties: {'checked': 'checked'}
})
export class CheckboxControlValueAccessor implements ControlValueAccessor {
  checked: boolean;
  onChange: Function;

  constructor(cd: ControlDirective, private _elementRef: ElementRef, private _renderer: Renderer) {
    this.onChange = (_) => {};
    cd.valueAccessor = this;
  }

  writeValue(value) {
    this._renderer.setElementProperty(this._elementRef.parentView.render,
                                      this._elementRef.boundElementIndex, 'checked', value)
  }

  registerOnChange(fn) { this.onChange = fn; }
}