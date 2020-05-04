import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export class Modal extends Component {
	render() {
		return (
			<div className="modal-tela">
				<div className="modal" />
				<div className="frase-ganhadora">{this.props.ganhador} WINS!</div>
				<div className="botoes">
					<Link className="botao-modal" to="/">
						Trocar personagens
					</Link>
					<Link className="botao-modal" to="/batalha" onClick={this.props.reiniciar}>
						Jogar novamente
					</Link>
				</div>
			</div>
		);
	}
}
