import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-data-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-popup.component.html',
  styleUrl: './data-popup.component.scss'
})
export class DataPopupComponent {
  @Input() responseData: any = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  close() {
    this.closeModal.emit();
  }
}
