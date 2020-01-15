import React from 'react';
import styled from 'styled-components';

const Queries = styled.div`
    display:inline-block;
    position: relative;
    background-color: red;
    width: 100px;
    height: 100px;
`;

const LastQueries = props => {

	return (
        <Queries></Queries>
	);
};

export default LastQueries;