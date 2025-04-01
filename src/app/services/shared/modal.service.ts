import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private showAddModalSubject = new Subject<void>();
  
  showAddModal$ = this.showAddModalSubject.asObservable();

  openAddModal() {
    this.showAddModalSubject.next();
  }
}