import styled from 'styled-components';
import { TiHeartFullOutline } from 'react-icons/ti';

export const FooterBase = styled.footer`
	width: 100%;
	background: #F0F0F0;
	border-top: 1px solid var(--text-color);
	padding: 32px 16px;	
	color: var(--title-color);
	text-align: center;
	margin-top: 20px;
`;

export const Text = styled.p`
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
`;

export const Icon = styled(TiHeartFullOutline)`	
	height: 30px;
	width: 30px;
	color: red;
`;

export const Span = styled.span`
	display: inline-block;
	transform: scale(.9);
	animation: Icon .5s linear infinite alternate-reverse;	
`;