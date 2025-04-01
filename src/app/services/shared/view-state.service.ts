import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewStateService {
  private viewModeSubject = new BehaviorSubject<string>('list');
  currentViewMode$ = this.viewModeSubject.asObservable();

  setViewMode(mode: string) {
    this.viewModeSubject.next(mode);
  }
}