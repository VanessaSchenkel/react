import React, { Component } from 'react';
import listaDeLutadores from '../../personagens/listaDePersonagens';
import { StorageService } from '../../storage/storage.service';
import { BarraDeVida, BotaoDoPoder, Modal, Alerta, Temporizador} from '../';
import './style.css';

export class Batalha extends Component {
    constructor(props) {
        super(props);
        this.storageService = new StorageService();
		this.state = {
            jogador1: this.construirJogador('1'),
            jogador2: this.construirJogador('2'), 
            vidaJogador1: 100,
            vidaJogador2: 100,
            golpeEscolhido: '', 
            danoDoGolpe: 5, 
            turnoDoGolpe: 5,
            jogador1Começa: this.primeiroALutar(), 
            listaDeGolpes: [], 
            quantasFaltam: 0, 
            golpeAlerta: '',
            mostrarAlerta: false, 
            tempo: 30
        };
        this.maisGolpe = 0;
    }

    temporizador() {
        this.setState(prevState => ({
          tempo: prevState.tempo - 1
        }));
    }

    componentDidMount() {
      this.interval = setInterval(() => this.temporizador(), 1000);
    }

	construirJogador = (num) => {
		let nome = this.storageService.getString(num);
		return listaDeLutadores.find((lutador) => lutador.name === nome);
	};
    
    primeiroALutar = () => {
        let primeiro = Math.floor(Math.random() * 2)
        
        if (primeiro === 1){
           return true
        } else {
            return false
        }
    }
    
    
    golpeEscolhido = (golpe) => {
        let posicao = 0;
        for (let i = 0; i < this.state.listaDeGolpes.length; i++) {
           if (this.state.listaDeGolpes[i].name === golpe.name){
              posicao = i;
           }
        }
        let jogadas = this.state.listaDeGolpes.length - posicao;
        
        const jaTem = this.state.listaDeGolpes.some(e =>  e.name === golpe.name);

        if (jogadas >= golpe.turnsToUse || !jaTem) {
            let lista = [...this.state.listaDeGolpes, golpe]
            console.log(lista);
            this.setState({
                danoDoGolpe: golpe.damage,
                golpeEscolhido: golpe.name,
                turnoDoGolpe: golpe.turnsToUse,
                listaDeGolpes: lista
            });
            this.maisGolpe++;
            this.batalhar();
        } else {
            let faltam = (jogadas - golpe.turnsToUse);
            this.setState({
                quantasFaltam: faltam,
                golpeAlerta: golpe.name,
                mostrarAlerta: true
            })
        }
            
    } 
        
    batalhar = () => {
        let danoGolpe = this.state.danoDoGolpe;

        if (this.state.jogador1Começa){
           let dano = this.state.vidaJogador2 - (this.vaiFalhar() ? 0 : this.eDanoCritico(danoGolpe));
           this.vezesJogador1++;
           
           this.setState({
               vidaJogador2: dano,
               jogador1Começa: false,
               tempo: 30
            })
        } else {
            let dano = this.state.vidaJogador1 - (this.vaiFalhar() ? 0 : this.eDanoCritico(danoGolpe));
            this.vezesJogador2++;
           
            this.setState({
                vidaJogador1: dano, 
                jogador1Começa: true,
                tempo: 30
            })
        }
    }

    eDanoCritico = (dano) => {
        let falha = Math.floor(Math.random()*100);
        if (falha <= 3){
            return dano * 2;
        } else return dano;
    }
    
    vaiFalhar = () => {
        let falha = Math.floor(Math.random()*100);
        if (falha <= 20){
            return true;
        } else return false;
    }


    verificaMortes = () => {
        if (this.state.vidaJogador1 <= 0){
            return <Modal reiniciar={this.reiniciar} ganhador={this.state.jogador2.name} />
        } else if (this.state.vidaJogador2 <= 0){
            return <Modal reiniciar={this.reiniciar} ganhador={this.state.jogador1.name} />
        } 
    }

    reiniciar = () => {
        this.setState({
            vidaJogador1: 100,
            vidaJogador2: 100,
            golpeEscolhido: '', 
            danoDoGolpe: 5, 
            turnoDoGolpe: 5,
            tempo: 30,
            jogador1Começa: this.primeiroALutar()
        })
    }

    fecharAlerta = () => {
        this.setState({
            mostrarAlerta: false
        })
    }

    checarTempo() {
        let contrario = !!!this.state.jogador1Começa;
        if (this.state.tempo === 0) {
            this.setState({
                jogador1Começa: contrario,
                tempo: 30
            })
        }
    }

    render() {
            return (
            <>
            {this.verificaMortes()}
            {this.checarTempo()}
            
            {this.state.mostrarAlerta ? <Alerta nome={this.state.golpeAlerta} quantasFaltam={this.state.quantasFaltam} fechar={this.fecharAlerta} /> : ''}
            <div className="metade-batalha">                        
                <BarraDeVida vida={this.state.vidaJogador1} nome={this.state.jogador1.name}/>
                <div className="personagem-lutando">
	    			<img className={`luta-img-esquerda esq-${this.state.jogador1Começa}`} alt="luta" src={this.state.jogador1.largeImg} />
                 </div>
                {this.state.jogador1Começa ? <BotaoDoPoder golpeEscolhido={this.golpeEscolhido} lado="esquerda" golpes={this.state.jogador1.skills} /> : ''}
            </div>
            <Temporizador tempoRestante={this.state.tempo}/>
            <div className="metade-batalha">
				<BarraDeVida vida={this.state.vidaJogador2} nome={this.state.jogador2.name}/>
				<div className="personagem-lutando">
					<img className={`luta-img-direita dir-${this.state.jogador1Começa}`} alt="luta" src={this.state.jogador2.largeImg} />
                </div>
               {this.state.jogador1Começa ? '' : <BotaoDoPoder lado="direita" golpeEscolhido={this.golpeEscolhido} golpes={this.state.jogador2.skills} />}
            </div>
            </>
		);
	}
}
