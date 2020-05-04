import React, { Component } from 'react';
import './style.css';

export class BarraDeVida extends Component {
	
	vidaFraca = () => {
		if (this.props.vida <= 30) {
			return <div className="vida vida-fraca" style={{ width: `${this.props.vida}%` }} />;
		}
		return <div className="vida" style={{ width: `${this.props.vida}%` }} />;
	};

	render() {
		return (
			<div className="barra">
				{this.vidaFraca()}
				<p className="quanto-de-vida">{this.props.vida}</p>
				<p className="nome-na-barra">{this.props.nome}</p>
			</div>
		);
	}
}
