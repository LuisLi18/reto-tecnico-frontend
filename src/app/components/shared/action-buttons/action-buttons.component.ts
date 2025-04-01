import { Component, EventEmitter, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent {
  @Output() addAction = new EventEmitter<void>();
  @Output() uploadAction = new EventEmitter<void>();
  @Output() downloadAction = new EventEmitter<void>();

  onAdd() {
    this.addAction.emit();
  }

  onUpload() {
    this.uploadAction.emit();
  }

  onDownload() {
    this.downloadAction.emit();
  }
}
