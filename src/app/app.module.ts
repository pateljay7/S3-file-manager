import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonsModule } from './commons/commons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { S3ServiceService } from './commons/services/s3-service.service';
import { PopupmodelService } from './commons/services/popupmodel.service';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonsModule,
    NgbModule,
    HighlightModule,
  ],
  providers: [S3ServiceService, PopupmodelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
