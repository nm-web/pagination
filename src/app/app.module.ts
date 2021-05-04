import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import {SearchComponent} from './components/search/search.component';
import { SelectComponent } from './components/select/select.component';
import {ShopComponent} from './pages/shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ListCardComponent,
    SelectComponent,
    SearchComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSliderModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
