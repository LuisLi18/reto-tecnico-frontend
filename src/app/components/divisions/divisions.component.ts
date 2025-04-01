import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Division } from '../../models/division.model';
import { DivisionService } from '../../services/division.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { CommonModule } from '@angular/common';
import { ViewTogglesComponent } from "../shared/view-toggles/view-toggles.component";
import { GenericTableComponent } from "../shared/generic-table/generic-table.component";
import { GenericModalComponent } from '../shared/generic-modal/generic-modal.component';
import { GenericDropdownComponent } from '../shared/generic-dropdown/generic-dropdown.component';
import { ModalService } from '../../services/shared/modal.service';
import { Subscription } from 'rxjs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ViewStateService } from '../../services/shared/view-state.service';

interface Column {
  label: string;
  field: string;
  selected?: boolean;
}
@Component({
  selector: 'app-division-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ViewTogglesComponent,
    GenericTableComponent,
    GenericModalComponent,
    GenericDropdownComponent,
    NzTreeModule,
    NzIconModule,
    NzTagModule,
    NzEmptyModule,
],
  templateUrl: './divisions.component.html',
  styleUrls: [
    './divisions.component.scss',
  ]
})
export class DivisionListComponent implements OnInit {
  divisions: Division[] = [];
  filteredDivisions: Division[] = [];
  isModalVisible = false;
  searchText = '';
  divisionForm!: FormGroup;
  isFormSubmitting = false;
  selectedViewMode = 'list';
  editingDivision: Division | null = null;
  selectedTab = 'divisions'
  totalCollaborators: number = 0;
  modalFields: Array<
  | { key: string; label: string; type: 'text' | 'number'; required?: boolean; placeholder?: string; errorMessage?: string; min?: number; step?: number }
  | { key: string; label: string; type: 'select'; required?: boolean; options: { label: string; value: number }[]; placeholder?: string }
> = [
    {
      key: 'name',
      label: 'División',
      type: 'text' as const,
      required: true,
      errorMessage: 'El nombre es requerido (máximo 45 caracteres)',
      placeholder: 'Nombre de la división'
    },
    {
      key: 'parentDivisionId',
      label: 'División Superior',
      type: 'select' as const,
      options: [],
      placeholder: 'Seleccione división superior'
    },
    {
      key: 'ambassadorName',
      label: 'Embajador',
      type: 'text' as const,
      placeholder: 'Nombre del embajador'
    }
  ];
  columns: Column[] =  [
    { label: 'División', field: 'name', selected: true },
    { label: 'División Superior', field: 'description', selected: true },
    { label: 'Colaboradores', field: 'collaboratorsCount', selected: true },
    { label: 'Nivel', field: 'level', selected: true },
    { label: 'Subdivisiones', field: 'name', selected: true },
    { label: 'Embajadores', field: 'ambassadorName', selected: true },
  ];
  pageSize = 10;
  currentPage = 1;
  total = 0;

  private modalSubscription!: Subscription;

  constructor(
    private divisionService: DivisionService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    private modalService: ModalService,
    private viewStateService: ViewStateService
  ) {}

  ngOnInit(): void {
    this.loadDivisions();
    this.initForm();
    this.modalSubscription = this.modalService.showAddModal$.subscribe(() => {
      this.showAddModal();
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  initForm(): void {
    this.divisionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(45)]],
      level: [null, [Validators.required, Validators.min(1)]],
      collaboratorsCount: [null, [Validators.required, Validators.min(0)]],
      ambassadorName: [''],
      parentDivisionId: [null]
    });
  }

  loadDivisions(): void {
    this.divisionService.getDivisions().subscribe({
      next: (data) => {
        this.filteredDivisions = [...this.divisions];
        this.total = this.filteredDivisions.length;
        
        this.divisions = data.map(division => ({
          ...division,
          parent: division.parentDivision ? division.parentDivision.name : '-',
          subdivisions: division.subDivisions?.length || 0
        }));
        
        this.totalCollaborators = this.calculateTotalCollaborators();

        const parentDivisionField = this.modalFields.find(field => field.key === 'parentDivisionId');
      if (parentDivisionField && 'options' in parentDivisionField) {
        parentDivisionField.options = this.divisions.map(division => ({
          label: division.name,
          value: division.id
        }));
      }
      },
      error: (error) => {
        this.message.error('Error loading divisions');
        console.error('Error fetching divisions', error);
      }
    });
  }

  calculateTotalCollaborators(): number {
    return this.divisions
      .filter(division => division.parentDivisionId === null)
      .reduce((total, division) => {
        const count = Number(division.collaboratorsCount) || 0;
        return total + count;
      }, 0);
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  onViewModeChange(newMode: string) {
    this.selectedViewMode = newMode;
    this.viewStateService.setViewMode(newMode);
  }

  sortChange(order: string, key: string) {
    console.log('Orden cambiado:', order, 'para', key);
  }
  
  filterChange(filters: any, key: string) {
    console.log('Filtros aplicados:', filters, 'para', key);
  }

  search(): void {
    if (this.searchText) {
      this.filteredDivisions = this.divisions.filter(
        division => division.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredDivisions = [...this.divisions];
    }
    this.total = this.filteredDivisions.length;
  }

  showAddModal(): void {
    this.editingDivision = null;
    this.divisionForm.reset();
    this.isModalVisible = true;
  }

  showEditModal(division: Division): void {
    this.editingDivision = division;
    this.divisionForm.patchValue({
      name: division.name,
      level: division.level,
      collaboratorsCount: division.collaboratorsCount,
      ambassadorName: division.ambassadorName || '',
      parentDivisionId: division.parentDivisionId
    });
    this.isModalVisible = true;
  }
  onFormChange(form: FormGroup): void {
    this.divisionForm = form;
  }

  handleModalCancel(): void {
    this.isModalVisible = false;
  }

  handleModalOk(): void {
    if (this.divisionForm.valid) {
      this.isFormSubmitting = true;
      const formData = this.divisionForm.value;

      if (this.editingDivision) {
        this.divisionService.updateDivision(this.editingDivision.id, formData).subscribe({
          next: () => {
            this.message.success('División actualizada con éxito');
            this.isModalVisible = false;
            this.loadDivisions();
            this.isFormSubmitting = false;
          },
          error: (error) => {
            this.message.error('Error al actualizar la división');
            console.error('Error updating division', error);
            this.isFormSubmitting = false;
          }
        });
      } else {
        formData.level = Math.floor(Math.random() * 50) + 1;
        formData.collaboratorsCount = Math.floor(Math.random() * 50) + 1;

        if (!formData.parentDivisionId) {
          delete formData.parentDivisionId;
        }

        this.divisionService.createDivision(formData).subscribe({
          next: () => {
            this.message.success('División creada con éxito');
            this.isModalVisible = false;
            this.loadDivisions();
            this.isFormSubmitting = false;
          },
          error: (error) => {
            this.message.error('Error al crear la división');
            console.error('Error creating division', error);
            this.isFormSubmitting = false;
          }
        });
      }
    } else {
      Object.values(this.divisionForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  deleteDivision(id: number): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de que quieres eliminar esta división?',
      nzContent: 'Esta acción no se puede deshacer.',
      nzOkText: 'Eliminar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.divisionService.deleteDivision(id).subscribe({
          next: () => {
            this.message.success('División eliminada con éxito');
            this.loadDivisions();
          },
          error: (error) => {
            this.message.error('Error al eliminar la división');
            console.error('Error deleting division', error);
          }
        });
      },
      nzCancelText: 'Cancelar'
    });
  }

  getParentDivisionName(parentId?: number): string {
    if (!parentId) return '-';
    const parent = this.divisions.find(d => d.id === parentId);
    return parent ? parent.name : '-';
  }

  onPageIndexChange(page: number): void {
    this.currentPage = page;
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  applyColumnFilter(selectedColumns: Column[]) {
    console.log('Columnas seleccionadas:', selectedColumns);
  }

  getTreeData(): any[] {
    const divisionMap = new Map();
    this.divisions.forEach(division => {
      divisionMap.set(division.id, {
        ...division,
        children: []
      });
    });
    
    const processSubdivisions = (divisionId: number): any[] => {
      const result: any[] = [];
      
      this.divisions.filter(div => div.parentDivisionId === divisionId).forEach(subDiv => {
        const node = {
          key: subDiv.id.toString(),
          title: `${subDiv.name}`,
          expanded: true,
          isLeaf: false,
          ambassadorName: subDiv.ambassadorName,
          ...subDiv,
          children: processSubdivisions(subDiv.id)
        };
        
        if (node.children.length === 0) {
          node.isLeaf = true;
          node.title = `${subDiv.name}`;
        }
        
        result.push(node);
      });
      
      return result;
    };
    
    const rootDivisions = this.divisions.filter(division => !division.parentDivisionId);
    
    return rootDivisions.map(division => {
      return {
        key: division.id.toString(),
        title: `${division.name}`,
        expanded: true,
        isLeaf: false,
        ambassadorName: division.ambassadorName,
        ...division,
        children: processSubdivisions(division.id)
      };
    });
  }
  
}