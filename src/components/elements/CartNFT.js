import React from 'react';
import { Box } from '@material-ui/core';
import styled from "styled-components";
import imgBackground02 from "../../assets/image/background02.png"
import imgHuntToken from "../../assets/image/huntcoin1.png"
import { useNavigate } from 'react-router-dom'

const CartNFT = ({ itemID,image, name, description, price, endDay }) => {
    const navigate = useNavigate();
    return (
        <StyledComponent onClick={()=>{
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            navigate('/detailNFT', {
                itemID:itemID
              });

        }}>
            <ImageBox>
                <img src={image} width={"100%"} height={"100%"} alt='' />
            </ImageBox>
            <DescriptionBox>
                <Box display="flex" flexDirection={"column"} flex="2">
                    <StrName>
                        {name}
                    </StrName>
                    <StrDescription>
                        {description}
                    </StrDescription>
                </Box>
                <Box display="flex" flexDirection={"column"} flex="2">
                    <StrPice mt={'10px'}>
                        Price
                    </StrPice>
                    <Box display="flex" alignItems="center">
                        <Box display={"flex"}>
                            <img src={imgHuntToken} width="30px" height={'30px'} alt={''} />
                        </Box>
                        <StrPice ml="5px">{price}</StrPice>
                    </Box>
                </Box>
                <Box display="flex" flexDirection={"column"} flex="1" justifyContent={"flex-end"}>
                    <StrEndday>Ends in {endDay} days</StrEndday>
                </Box>
            </DescriptionBox>
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 300px;
    height: 450px;
    border-radius: 20px;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 10px 0 #000;
    transition: .3s;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
    }


`
const ImageBox = styled(Box)`
    display: flex;
    flex: 2;
    width: 100%;
    height:100%;
    border-radius: 20px 20px 0px 0px;
    overflow: hidden;
    cursor: pointer;
    >img{
        transition: .3s;
        &:hover{
            transform: scale(1.2);
        }
    }

`
const DescriptionBox = styled(Box)`
    display: flex;
    flex: 1;
    width: 100%;
    height:100%;
    flex-direction: column;
    padding: 15px;
    box-sizing: border-box;
`
const StrName = styled(Box)`
    display: flex;
    font-size: 1.5rem;
`
const StrDescription = styled(Box)`
    display: flex;
    font-size: 1rem;
    color: #b3b3b3;
`
const StrPice = styled(Box)`
    display: flex;
    font-size: 1rem;
`
const StrEndday = styled(Box)`
    display: flex;
    font-size: 1rem;
    color: #b3b3b3;
`
export default CartNFT;
