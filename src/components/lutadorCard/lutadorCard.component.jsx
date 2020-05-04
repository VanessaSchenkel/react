import React, { Component } from 'react';
import './style.css';

export class LutadorCard extends Component {

	escolherLutador = () => {
		this.props.onClick(this.props.name);
	};

	render() {
		return (
			<li className="lutador-card">
				<label>
					<img src={this.props.smallImg} className="lutador-image" alt={this.props.name} />
					<input name={this.props.side} className="radio-input" type="radio" onClick={this.escolherLutador} />
					<div className="nome-do-jogador">{this.props.name.toUpperCase()}</div>
				</label>
			</li>
		);
	}
}
