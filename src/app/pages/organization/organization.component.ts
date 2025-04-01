import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { TabsComponent } from '../../components/shared/tabs/tabs.component';
import { PageTitleComponent } from '../../components/shared/page-title/page-title.component';
import { filter } from 'rxjs/operators';
import { ActionButtonsComponent } from "../../components/shared/action-buttons/action-buttons.component";
import { ModalService } from '../../services/shared/modal.service';
import { DivisionListComponent } from '../../components/divisions/divisions.component';
import { CommonModule } from '@angular/common';
import { ViewStateService } from '../../services/shared/view-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HeaderComponent,
    TabsComponent,
    PageTitleComponent,
    ActionButtonsComponent
],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {
  selectedTab: string = 'divisions';
  @Output() showAddModal = new EventEmitter<void>();
  @ViewChild(DivisionListComponent) divisionList!: DivisionListComponent;
  currentViewMode = 'list';
  private viewModeSubscription!: Subscription;

  constructor(private router: Router, private modalService: ModalService, private viewStateService: ViewStateService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      if (url.includes('/divisiones')) {
        this.selectedTab = 'divisions';
      } else if (url.includes('/colaboradores')) {
        this.selectedTab = 'collaborators';
      }
    });

    this.viewModeSubscription = this.viewStateService.currentViewMode$.subscribe(
      mode => this.currentViewMode = mode
    );
  }

  ngOnDestroy() {
    this.viewModeSubscription.unsubscribe();
  }
  
  onTabChange(tab: string) {
    this.selectedTab = tab;
    
    if (tab === 'divisions') {
      this.router.navigate(['organizacion/divisiones']);
    } else if (tab === 'collaborators') {
      this.router.navigate(['organizacion/colaboradores']);
    }
  }
  onAddAction() {
    this.modalService.openAddModal();
  }

  onUploadAction() {
    console.log('Se hizo clic en Subir');
  }

  onDownloadAction() {
    console.log('Se hizo clic en Descargar');
  }
}