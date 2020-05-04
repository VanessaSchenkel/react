import React, { Component } from 'react';
import './style.css';

export class Temporizador extends Component {
	constructor(props) {
		super(props);
	}

	poucoTempoRestante = () => {
		if (this.props.tempoRestante <= 10) {
			return <p className="tempo-restante acabando">{this.props.tempoRestante}</p>;
		} else {
			return <p className="tempo-restante">{this.props.tempoRestante}</p>;
		}
	};

	render() {
		return (
			<div className="relogio">
				<div className="restante" style={{ height: `${this.props.tempoRestante}%` }}>
					{this.poucoTempoRestante()}
				</div>
			</div>
		);
	}
}
