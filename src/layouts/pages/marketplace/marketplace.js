import React from "react";
import { useNavigate } from 'react-router-dom'
import { Box } from '@material-ui/core';
import styled from "styled-components";
import Navbar from "../../navbar/navbar";
import imgBackground02 from '../../../assets/image/background02.png'
import imgTopNFT from "../../../assets/image/NFTs/top_nft.png"
import CartNFT from "../../../components/elements/CartNFT";

import imgNFT01 from "../../../assets/image/NFTs/01.jpg";
import imgNFT02 from "../../../assets/image/NFTs/02.jpg";
import imgNFT03 from "../../../assets/image/NFTs/03.jpg";
import imgNFT04 from "../../../assets/image/NFTs/04.jpg";

const Marketplace = () => {
    const navigate = useNavigate();

    return (
        <StyledComponent>
            <Navbar />
            <MainPart01>
                <LeftPart01>
                    <StrHead01>
                        Discover, collect, and sell extraordinary NFTs
                    </StrHead01>
                    <StrDescription01 mt="20px">
                        Buy and Sell NFTs with Hunt
                    </StrDescription01>
                    <ButtonGroup1 mt={'50px'}>
                        <CustomBtn02 onClick={()=>{
                            navigate('/exploreNFT');
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        }}>Explore</CustomBtn02>
                        <CustomBtn02 ml="20px" onClick={()=>{
                            navigate('/createNFT');
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            
                        }}>Create</CustomBtn02>
                    </ButtonGroup1>
                </LeftPart01>
                <RightPart01>
                    <ImagePart01>
                        <ImageBox01>
                        </ImageBox01>
                        <DescriptionPart01>
                            <StrHead02>Black Collection : Fighting Monkey</StrHead02>
                            <StrDescription02>by HUNT User</StrDescription02>
                        </DescriptionPart01>
                    </ImagePart01>
                </RightPart01>
            </MainPart01>
            <LatestDrops>
                <StateStr01 mt={'50px'}>
                    Latest Drops
                </StateStr01>
                <DropsBox01 mt={'20px'}>
                    <CartNFT itemID={'0'} image={imgNFT01} name={"The HUNT NFT#001"} description={"this is the HUNT NFT#001"} price={"360.97"} endDay={"2"} />
                    <CartNFT itemID={'0'} image={imgNFT02} name={"The HUNT NFT#002"} description={"this is the HUNT NFT#002"} price={"207641700"} endDay={"34"} />
                    <CartNFT itemID={'0'} image={imgNFT03} name={"The HUNT NFT#003"} description={"this is the HUNT NFT#003"} price={"6341.53"} endDay={"12"} />
                    <CartNFT itemID={'0'} image={imgNFT04} name={"The HUNT NFT#004"} description={"this is the HUNT NFT#004"} price={"12500"} endDay={"7"} />
                </DropsBox01>
            </LatestDrops>
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    align-items: center;
    flex-direction: column;
    margin-left: 320px;
    @media (max-width: 1000px) {
        transition: .5s;
        margin-left: 0px;
    }
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
`
const MainPart01 = styled(Box)`
    display: flex;
    width: 80%;
    margin-top: 50px;
`
const LeftPart01 = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;

`
const RightPart01 = styled(Box)`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: flex-end;
`
const StrHead01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 3.5rem;
`
const StrDescription01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 1.5rem;
    font-weight: 400;
`
const ButtonGroup1 = styled(Box)`
    display: flex;
    align-items: center;
`

const CustomBtn02 = styled(Box)`
    display: flex;
    position: relative;
    padding:15px 40px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-size: 1.5rem;
    border-radius: 20px;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120% 120%;
    box-shadow: 0px 2px 10px black;
    border: 1px solid rgba(0,0,0,0);
    color: white;
    cursor: pointer;
    transition: .5s;
    &:hover{
        border: 1px solid rgba(255,255,255,100);
        background-size: 200% 200%;
    }
`
const ImagePart01 = styled(Box)`
    display: flex;
    width: 450px;
    height: 450px;
    flex-direction: column;
    border-radius: 20px;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: .3s;
    box-shadow: 0 0 10px 0 #000;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
    }
`

const ImageBox01 = styled(Box)`
    display: flex;
    width: 100%;
    height: 80%;
    background: url(${imgTopNFT});
    border-radius: 20px 20px 0px 0px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    transition: .3s;
    &:hover{
        background-size: 120% 120%;
    }
`
const DescriptionPart01 = styled(Box)`
    display: flex;
    width: 100%;
    height: 20%;
    padding: 5px 30px;
    box-sizing: border-box;
    flex-direction: column;
    color: white;
`
const StrHead02 = styled(Box)`
    display: flex;
    flex: 1;
    font-size: 1.2rem;
    align-items: center;
    text-align: start;
`
const StrDescription02 = styled(Box)`
    display: flex;
    flex: 1;
    font-size: 1rem;
    align-items: center;
    text-align: start;
`
const LatestDrops = styled(Box)`
    display: flex;
    width : 80%;
    flex-direction: column;
`
const StateStr01 = styled(Box)`
    display: flex;
    font-size: 3rem;
`
const DropsBox01 = styled(Box)`
    display: grid;
    width :100%;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    margin-bottom: 100px;
`


export default Marketplace;
