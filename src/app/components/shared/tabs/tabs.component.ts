import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NzTabsModule,
    RouterModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input() activeTab!: string;
  @Output() tabChange = new EventEmitter<string>();

  changeTab(tab: string) {
    this.tabChange.emit(tab);
  }
}