import { Component } from '@angular/core';
import { EmptyStateComponent } from "../shared/empty-state/empty-state.component";

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [EmptyStateComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.scss'
})
export class CollaboratorsComponent {

}
