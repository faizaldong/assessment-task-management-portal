import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly #snackBar = inject(MatSnackBar);

  showSuccess(message: string): void {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['toast-success']
    });
  }

  showError(message: string): void {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['toast-error']
    });
  }
}