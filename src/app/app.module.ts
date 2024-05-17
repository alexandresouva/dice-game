import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { PlayerDisplayComponent } from './player-display/player-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PlayerDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
