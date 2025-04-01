import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-generic-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    NzCheckboxModule,
    NzDividerModule
  ],
  templateUrl: './generic-dropdown.component.html',
  styleUrl: './generic-dropdown.component.scss'
})
export class GenericDropdownComponent {
  @Input() buttonText = 'Options';
  @Input() icon = 'down';
  @Input() items: any[] = [];
  @Input() displayProperty = 'name';
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() showRestoreOption = true;
  
  @Output() itemSelected = new EventEmitter<any>();
  @Output() restore = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any[]>();

  selectedItems: any[] = [];

  toggleItem(item: any) {
    const index = this.selectedItems.findIndex(i => i === item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  onApply() {
    this.apply.emit(this.selectedItems);
  }
}
