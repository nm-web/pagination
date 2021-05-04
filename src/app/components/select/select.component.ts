import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {SubSet} from '../../services/subset';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() set options(options: string[]) {
    this.optionsWithIndex = options.map((value, index) => ({value, index}));
    this.selectedOption = this.optionsWithIndex[0];}
  @Input() addSearchToSelect: boolean;
  @Input() resetFilters:Subject<any>;
  @Output() selectionChange = new EventEmitter<{ value: any; index: number }>();
  private subs = new SubSet();
  optionsWithIndex: { value: any; index: number }[];
  selectedOption: { value: any; index: number };
  showContent: boolean = false;
  filteredOptions: any[];


  constructor() {
  }

  ngOnInit(): void {
   this.subs.add = this.resetFilters.subscribe({
      next: data =>{
        if (data) {
          this.selectedOption = this.optionsWithIndex[0];
        }
      }

    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options?.currentValue) {
      this.filteredOptions = [...this.optionsWithIndex];
    }
  }

  optionClick($event: Event, option:{ value: any; index: number }) {
    this.selectedOption = option;
    this.selectionChange.emit(this.selectedOption);
    this.showContent = false;
  }

  onSearchChange(search:string) {
    this.filteredOptions = this.optionsWithIndex
      .filter(option => option.value.toString().toLowerCase().startsWith(search.toString().toLowerCase()))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
