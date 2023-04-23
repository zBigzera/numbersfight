import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContasPage implements OnInit, OnDestroy {
  public timeLeft = 20;
  public displayTime: string = "20";
  private interval: any;

  constructor(private router: Router) { 
     this.gerar_equacao();
    this.ver();
  }
  
  valor1 : any = 1;
  valor2 : any = 1;
  resultado: any;
  score: number = 0;

  formulario: any = {valor: ''};
  
  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft--;
      this.displayTime = `${this.timeLeft.toString().padStart(2, '0')}`;
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        alert("O tempo acabou!")
        this.router.navigate(['home']);
      }
    }, 1000);
  }

  gerar_equacao() {
    this.valor1 += Math.floor(Math.random() * 10);
    this.valor2 += Math.floor(Math.random() * 10);
    this.resultado = this.valor1 * this.valor2;
  }

  checar_resultado() {
    if (this.formulario.valor == this.resultado) {
      this.ver();
      this.score += 10;
      this.salvar();
      window.location.reload();
    } else {
      alert("Errado!");
      clearInterval(this.interval);
      this.router.navigate(['home']);
    }
  }

  async salvar(){
    await Storage.set({
      key: 'score',
      value: String(this.score),
    });
  }

  async ver() {
    const { value } = await Storage.get({ key: 'score' });
    this.score = Number(value);
  }
}
