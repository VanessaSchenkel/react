import React, { Component } from 'react';
import listaDeLutadores from '../../personagens/listaDePersonagens';
import { LutadorCard } from '../lutadorCard/lutadorCard.component';
import './style.css';

export class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: ''
		};
	}

	onRadioChange = (lutador) => {
        
        this.setState({
			selectedOption: lutador
        });
        
        this.props.criarPersonagem(lutador);
	};

	renderLutadores = () => {
		return listaDeLutadores.map((lutador, key) => (
			<LutadorCard
				key={key}
				name={lutador.name}
				side={this.props.side}
				smallImg={lutador.smallImg}
				onClick={this.onRadioChange}
			/>
		));
	};

	personagemImagem = () => {
		let img;
		listaDeLutadores.map((lutador, key) => {
			if (lutador.name === this.state.selectedOption) {
				img = lutador.largeImg;
			}
		});

		return img;
	};

	imagemGrande = () => {
		let imagem = this.personagemImagem();

		return (
			<>
				<img className="imagem-grande" src={imagem} alt="lutador"/>
				<p className="nome-escolhido">{this.state.selectedOption} </p>
			</>
		);
	};

	render() {
		let style = {
			backgroundImage: `linear-gradient(to bottom, ${this.props.color} 0%, black 100%)`
		};

		return (
			<div className="tela-inicial" style={style}>
				<div className="personagem-escolhido">
					{this.state.selectedOption === '' ? (
						<h1 className="frase-inicial">Selecione um personagem</h1>
					) : (
						this.imagemGrande()
					)}
					<ul className="card">{this.renderLutadores()}</ul>
				</div>
			</div>
		);
	}
}
