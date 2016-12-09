
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { WidgetComponent } from './Widget/Widget.component';
import {ContextMenuModule} from 'angular2-contextmenu';
import {ModalModule} from 'ng2-modal';
import {TooltipModule}  from 'ng2-tooltip';
import {DatePickerModule} from 'ng2-datepicker';
import {ContextMenuComponentCustom} from './Widget/ContextMenuComponentCustom';
import {OrderBy} from './Widget/Widget.component';
@NgModule({
  imports:      [ 
    BrowserModule ,
   FormsModule,
      HttpModule,
      ContextMenuModule, 
      TooltipModule,
      DatePickerModule
  ],
  declarations: [AppComponent, WidgetComponent, ContextMenuComponentCustom, OrderBy],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
