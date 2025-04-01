import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'radio' | 'textarea' | 'upload' | 'switch';
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: any; label: string }[];
  disabled?: boolean;
  multiple?: boolean;
}

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzRadioModule,
    NzUploadModule,
    NzSwitchModule
  ],
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {
  @Input() isVisible = false;
  @Input() title = 'Modal';
  @Input() okText = 'Guardar';
  @Input() cancelText = 'Cancelar';
  @Input() isSubmitting = false;
  @Input() fields: FieldConfig[] = [];
  @Input() initialValues: any = {};
  @Input() width: number | string = 520;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onOk = new EventEmitter<any>();
  @Output() formChange = new EventEmitter<FormGroup>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.fields && this.form) {
      this.initForm();
    }

    if (this.initialValues && this.form) {
      this.form.patchValue(this.initialValues);
    }
  }

  initForm(): void {
    const formConfig: any = {};
    
    this.fields.forEach(field => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }
      
      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }
      
      const initialValue = this.initialValues && this.initialValues[field.key] !== undefined 
        ? this.initialValues[field.key] 
        : '';
        
      formConfig[field.key] = [initialValue, validators];
    });
    
    this.form = this.fb.group(formConfig);
    this.formChange.emit(this.form);
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  handleOk(): void {
    if (this.form.valid) {
      this.onOk.emit(this.form.value);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }
}