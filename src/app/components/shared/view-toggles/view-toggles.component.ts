import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-toggles',
  standalone: true,
  imports: [],
  templateUrl: './view-toggles.component.html',
  styleUrl: './view-toggles.component.scss'
})
export class ViewTogglesComponent {
  @Input() viewMode!: string;
  @Output() viewModeChange = new EventEmitter<string>();

  toggleViewMode(mode: string) {
    if (this.viewMode !== mode) {
      this.viewModeChange.emit(mode);
    }
  }
}
