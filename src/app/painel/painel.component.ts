import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES
  public resposta: String = ""
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  private porcento: number = 100
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    if (this.resposta == this.rodadaFrase.frasePtBr) {
      //trocar pergunta da rodada
      this.rodada++

      // atualiza o progesso
      this.progresso = this.progresso + (this.porcento / this.frases.length)

      // Verifica se acertou todas as frases
      if (this.rodada === 4) {
        this.encerrarJogo.emit("Vitoria")
      }

      // atualiza o objeto rodada frase
      this.atualizaRodada()

    }
    else {
      // diminuir a variável tentativa
      this.tentativas--
      // Perdeu todas tentativas
      if (this.tentativas === -1) {
        this.encerrarJogo.emit("Derrota")
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    // limpar resposta
    this.resposta = ""
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log("Componente painel destruído")
  }


}
