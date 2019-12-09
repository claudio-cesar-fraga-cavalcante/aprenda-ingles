import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  public frases: Frase[] = FRASES
  public resposta: String = ""
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  private porcento: number = 100

  constructor() {
    this.atualizaRodada()
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {

    if (this.resposta == this.rodadaFrase.frasePtBr) {
      alert('A traudução está correta')
      //trocar pergunta da rodada
      this.rodada++

      // atualiza o objeto rodada frase
      this.atualizaRodada()

      // atualiza o progesso
      this.progresso = this.progresso + (this.porcento / this.frases.length)
    }
    else {
      alert('A traudução está errada')
    }

    // limpar resposta
    this.resposta = ""
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
  }

  ngOnInit() {
  }


}
