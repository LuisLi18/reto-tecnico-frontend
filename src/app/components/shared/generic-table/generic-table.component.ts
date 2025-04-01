import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableFilterFn, NzTableFilterList, NzTableModule, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Division } from '../../../models/division.model';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface TableColumn {
  key: string;
  title: string;
  sortable: boolean;
  filterable: boolean;
  type?: 'text' | 'number' | 'date';
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn<any>;
  filters?: NzTableFilterList;
  filterFn?: NzTableFilterFn<any>;
}
@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzSwitchModule,
    NzToolTipModule,
    FormsModule,
    NzDropDownModule,
    NzButtonModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 1;
  @Input() showSizeChanger = true;
  @Input() loading = false;
  
  @Output() pageIndexChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ key: string; value: string }>();
  @Output() filterChange = new EventEmitter<{ key: string; value: string }>();
  @Input() showPagination: boolean = true;
  @Input() totalCollaborators: number = 0;

  @Output() onEdit = new EventEmitter<Division>();
  @Output() onDelete = new EventEmitter<number>();

  setOfCheckedId = new Set<number>();
  currentSortColumn: string | null = null;
  currentFilterColumn: string | null = null;
  defaultFilters: NzTableFilterList = [];
  defaultFilterFn: NzTableFilterFn<any> = () => true;
  constructor() {}
  
  sortFn: NzTableSortFn<any> = (a: any, b: any, sortOrder?: NzTableSortOrder) => {
    const columnKey = this.currentSortColumn;
    
    if (!columnKey) return 0;
    
    if (sortOrder === 'ascend') {
      return a[columnKey] > b[columnKey] ? 1 : -1;
    } else if (sortOrder === 'descend') {
      return a[columnKey] < b[columnKey] ? 1 : -1;
    }
    return 0;
  }
  
  onItemChecked(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  
  onPageIndexChange(index: number): void {
    this.pageIndexChange.emit(index);
  }
  
  onPageSizeChange(size: number): void {
    this.pageSizeChange.emit(size);
  }

  onSortChange(key: string, order: NzTableSortOrder): void {
    this.currentSortColumn = key;
    this.sortChange.emit({ key, value: order || '' });
  }

  filterFn: NzTableFilterFn<any> = (value: string, item: any) => {
    return item[this.currentFilterColumn!] === value;
  }

  onFilterChange(key: string, value: any): void {
    this.currentFilterColumn = key;
    this.filterChange.emit({ key, value });
  }
}
