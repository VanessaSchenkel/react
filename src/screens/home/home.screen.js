import React, { Component } from 'react';
import { StorageService } from '../../storage/storage.service';
import { CardList } from '../../components';
import './style.css';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jogador1: '',
			jogador2: ''
		};
		this.storageService = new StorageService();
	}

	criarPersonagem1 = (personagem) => {
		this.setState({
			jogador1: personagem
		});
	};

	criarPersonagem2 = (personagem) => {
		this.setState({
			jogador2: personagem
		});
	};

	checarSeHaPersonagens = () => {
		if (this.state.jogador1 !== '' && this.state.jogador2 !== '') {
			return (
				<button className="botao-jogar" onClick={this.redirecionar}>
					Jogar
				</button>
			);
		}
	};

	redirecionar = () => {
		this.storageService.setString('1', this.state.jogador1);
		this.storageService.setString('2', this.state.jogador2);
		this.props.history.push(`/batalha`);
	};

	render() {
		return (
			<div className="home">
				<CardList color="red" side="direito" criarPersonagem={this.criarPersonagem1} />
				{this.checarSeHaPersonagens()}
				<CardList color="blue" side="esquerdo" criarPersonagem={this.criarPersonagem2} />
			</div>
		);
	}
}
