import styled from "styled-components";
import Color from 'color'

const Wrapper = styled.div.attrs({ className: 'section-group' })`
  width: ${props => props.wide ? '672px' : '500px'};
  will-change: width;
  height: 40px;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(4, 1fr);
  background-color: ${props => Color(props.theme.background).alpha(0.3)};
`

export { Wrapper }