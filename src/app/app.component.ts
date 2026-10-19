import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MODEL_IDENTITY } from './shared/constants/model-identity';
import { ACTIVE_THEME } from './shared/themes/active-theme';
import { applyThemeStyleProperties } from './shared/themes/theme-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = MODEL_IDENTITY.packageName;

  ngOnInit(): void {
    applyThemeStyleProperties(ACTIVE_THEME, document.documentElement);
  }
}
