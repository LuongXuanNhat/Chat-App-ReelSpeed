import { Component } from '@angular/core';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

}
