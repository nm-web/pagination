import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, OnDestroy} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SubSet} from '../../services/subset';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchBox', {static: true}) searchBox: ElementRef;
  @Output() onResultChange = new EventEmitter<any>();
  sub = new SubSet();

  constructor() {
  }

  ngOnInit(): void {
    this.initSearch();
  }

  initSearch() {
    const typeahead =  fromEvent(this.searchBox.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged(),
    );
    this.sub.add = typeahead.subscribe((data: any) => {this.onResultChange.emit(data);});

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
