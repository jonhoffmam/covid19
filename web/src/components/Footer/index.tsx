import React from 'react';
import { FooterBase, Icon, Text, Span } from './styles';

import logo from '../../assets/logo.svg';

const Footer = () => {
	return (
		<FooterBase>
			<a href="/">
				<img style={{height: '30px'}} src={logo} alt="Logo Covid19-BR" />
			</a>
			<Text>
				Desenvolvido com <Span><Icon /></Span> por 
				
				<a 
					style={{color: 'var(--frontEnd)', textDecoration: 'none', fontWeight: 'bold'}} 
					href="https://www.github.com/jonhoffmam" 
					target="_blank"
					rel="noopener noreferrer"
				>
					Jon Hoffmam
				</a>
			</Text>
		</FooterBase>
	);
}

export default Footer;