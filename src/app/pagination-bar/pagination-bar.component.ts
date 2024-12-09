import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  imports: [],
  templateUrl: './pagination-bar.component.html',
  standalone: true,
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() changePageEvent = new EventEmitter<number>();

  goToFirstPage() {
    this.changePage(0);
  }

  goToPreviousPage() {
    if (this.isNotPossibleToDisplayPreviousPage()) {
      return;
    }
    this.changePage(this.currentPage - 1);
  }

  goToNextPage() {
    if (this.isNotPossibleToDisplayNextPage()) {
      return;
    }
    this.changePage(this.currentPage + 1);
  }

  goToLastPage() {
    this.changePage(this.totalPages - 1);
  }

  isNotPossibleToDisplayPreviousPage() {
    return this.currentPage == 0;
  }

  isNotPossibleToDisplayNextPage() {
    return this.currentPage + 1 >= this.totalPages;
  }



  private changePage(value: number) {
    this.changePageEvent.emit(value);
  }


}
