import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { Navbar } from '../../../../shared/components/navbar/navbar';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
}