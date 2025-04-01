import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() title: string = 'Aún no tienes colaboradores';
  @Input() description: string = 'Agrega nuevos miembros a tu organización para comenzar';

}
