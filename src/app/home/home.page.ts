import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  score: any;
  zero: any = 0;

  constructor(private router: Router) {
    this.ver()
  }

  async ver() {
    const { value } = await Storage.get({ key: 'score' });
    this.score=value;
  }

  async reset(){
    await Storage.set({
      key: 'score',
      value: this.zero,
    });
    window.location.reload();
  }
}
