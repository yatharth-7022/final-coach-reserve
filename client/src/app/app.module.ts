import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { APP_CONFIG, appConfig } from './app.config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
