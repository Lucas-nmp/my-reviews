import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { DatabaseService } from './services/database.service';
import { IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonLabel, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonMenu,  RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonLabel, IonRouterOutlet],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private dbService: DatabaseService
  ) {
    this.platform.ready().then(() => {
      this.dbService.initDatabase();
    });
  }
}
