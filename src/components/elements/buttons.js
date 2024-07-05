import React from 'react';
import { Box } from '@material-ui/core';
import styled from "styled-components";

const CustomButton = ({str, width, height, color, bgcolor, fsize, fstyle, fweight, bradius }) => {
    return (
        <StyledComponent  width={width} height={height} color={color} bgcolor={bgcolor} fontSize={fsize} fweight={fweight} borderRadius={bradius}>
            {str}
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        transition: .5s;
        color: #ffd47d;
    }
    font-family: "Inter",sans-serif;
`

export default CustomButton;
