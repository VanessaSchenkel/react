import React, { Component } from 'react';
import './style.css';

export class BotaoDoPoder extends Component {
	
	vamola = () => {
		return this.props.golpes.map((golpe) => (
			<button className="botao-com-poder" onClick={() => this.props.golpeEscolhido(golpe)}>
				<div className={`paragrafo paragrafo-${this.props.lado}`}>{golpe.name}</div>{' '}
				<div className={`especificacoes especificacoes-${this.props.lado}`}>
					{golpe.damage} DANO | {golpe.turnsToUse} TURNOS
				</div>
			</button>
		));
	};

	render() {
		return (
			<div className={this.props.lado}>
				<h3 className="poderes">Poderes</h3>
				<div className={`poder-${this.props.lado}`}>{this.props.golpes && this.vamola()}</div>
			</div>
		);
	}
}
