import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export class Alerta extends Component {
	render() {
		return (
			<div className="alerta">
				<Link className="alerta-texto" to="/batalha">
					Para usar o {this.props.nome} ainda faltam {this.props.quantasFaltam} jogadas
					<button className="ok-alerta" onClick={this.props.fechar}>
						OK
					</button>
				</Link>
			</div>
		);
	}
}
