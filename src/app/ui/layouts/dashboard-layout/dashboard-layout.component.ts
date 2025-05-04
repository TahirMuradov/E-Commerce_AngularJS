import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/dashboard/header/header.component";
import { HeaderDirective } from '../../../directive/header.directive';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, HeaderComponent,HeaderDirective],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
