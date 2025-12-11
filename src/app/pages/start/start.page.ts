import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ]
})
export class StartPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, 2000);

  }

}
