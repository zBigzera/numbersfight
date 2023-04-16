import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContasPage implements OnInit {
  public timeLeft = 20;
  public displayTime: string = "20";

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
  const interval=   setInterval(() => {
      this.timeLeft--;
      this.displayTime = `${this.timeLeft.toString().padStart(2, '0')}`;
      if (this.timeLeft <= 0) {
        clearInterval(interval);
         alert("O tempo acabou!")
        this.router.navigate(['home']);
      }
    }, 1000);
  }
}