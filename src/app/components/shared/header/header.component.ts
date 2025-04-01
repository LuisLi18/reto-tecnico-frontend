import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { UserActionsComponent } from "../user-actions/user-actions.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigationComponent, UserActionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
