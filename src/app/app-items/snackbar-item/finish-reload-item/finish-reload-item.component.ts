import { Component, inject } from '@angular/core';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-finish-reload-item',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './finish-reload-item.component.html',
  styleUrl: './finish-reload-item.component.scss'
})
export class FinishReloadItemComponent {
  snackBarRef = inject(MatSnackBarRef);

  refreshPage() {
    // Recargar la página
    window.location.reload();
  }
}
