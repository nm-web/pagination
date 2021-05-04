import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../model/types';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product:IProduct;


  constructor(
  ) {
  }

  ngOnInit(): void {

  }

}
