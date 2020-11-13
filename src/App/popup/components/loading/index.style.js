import styled, { keyframes } from "styled-components";

const Wrapper = styled.div.attrs({ className: "la-timer" })`
	position: relative;
	color: ${(props) => props.theme.loading};
	width: ${(props) => props.multi * 32}px;
	height: ${(props) => props.multi * 32}px;
`;

const timerLoader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Content = styled.div`
	position: relative;
	width: ${(props) => props.multi * 32}px;
	height: ${(props) => props.multi * 32}px;
	background: transparent;
	border: ${(props) => props.multi * 2}px solid ${(props) => props.theme.loading};
	border-radius: 50%;

	&::before,
	&::after {
		position: absolute;
		top: ${(props) => props.multi * 14}px;
		left: ${(props) => props.multi * 14}px;
		width: ${(props) => props.multi * 2}px;
		margin-top: -${(props) => props.multi}px;
		margin-left: -${(props) => props.multi}px;
		content: "";
		background: ${(props) => props.theme.loading};
		border-radius: ${(props) => props.multi * 2}px;
		transform-origin: ${(props) => props.multi}px ${(props) => props.multi}px 0;
		animation: ${timerLoader} 1250ms infinite linear;
		animation-delay: -625ms;
	}

	&::before {
		height: ${(props) => props.multi * 12}px;
	}

	&::after {
		height: ${(props) => props.multi * 8}px;
		animation-duration: 15s;
		animation-delay: -7.5s;
	}
`;

const rotate = keyframes`
	from {
		transform: translateY(-50%) rotate(0deg);
	}
	to {
		transform: translateY(-50%) rotate(360deg);
	}
`

const TextWrapper = styled.p.attrs({ className: 'loading-text' })`
	font-size: 14px;
	color: ${(props) => props.theme.loading};
	position: relative;

	&::before {
		position: absolute;
		top: 50%;
		left: -30px;
		content: "";
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 2px solid ${(props) => props.theme.loading};
		border-right: none;
		animation: ${rotate} 0.5s linear forwards infinite;
	}
`

export { Wrapper, Content, TextWrapper };