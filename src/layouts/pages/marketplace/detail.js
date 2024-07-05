import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Box } from '@material-ui/core';
import styled from "styled-components";
import imgBackground02 from '../../../assets/image/background02.png'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import imgHuntToken from "../../../assets/image/huntcoin1.png"
import image from "../../../assets/image/NFTs/01.jpg"

import imgNFT01 from "../../../assets/image/NFTs/01.jpg";
import imgNFT02 from "../../../assets/image/NFTs/02.jpg";
import imgNFT03 from "../../../assets/image/NFTs/03.jpg";
import imgNFT04 from "../../../assets/image/NFTs/04.jpg";


import CartNFT from "../../../components/elements/CartNFT";

const DetailNFT = () => {
    const navigate = useNavigate();

    const handelBuyNFT = () => {

    }
    return (
        <StyledComponent>
            <NFTMainBox01 mt={'100px'}>
                <ImagePart01>
                    <img src={image} width={"100%"} height={"100%"} alt='' />
                </ImagePart01>
                <ContentPart01>
                    <StrTitle02>Collection</StrTitle02>
                    <StrDescription02 mt="10px" >Collection HUNT#01</StrDescription02>
                    <StrTitle02 mt={"50px"}>Name</StrTitle02>
                    <StrDescription02 mt="10px" >HUNT NFT#001</StrDescription02>
                    <StrTitle02 mt={"50px"}>Description</StrTitle02>
                    <StrDescription02 mt="10px" >This is the HUNT NFT#001</StrDescription02>
                    <StrTitle02 mt={"50px"}>Price</StrTitle02>
                    <PriceBox01 mt={"10px"}>
                        <Box display={"flex"}>
                            <img src={imgHuntToken} width="50px" height={'50px'} alt={''} />
                        </Box>
                        <StrDescription02 ml="5px">370</StrDescription02>
                    </PriceBox01>
                    <BuyNFTBox01 mt={"50px"}>
                        <CustomBtn02 onClick={handelBuyNFT}>
                            Buy NFT
                        </CustomBtn02>
                    </BuyNFTBox01>
                </ContentPart01>
            </NFTMainBox01>
            <NFTDetailBox01 mt={"50px"}>
                <DetailsBox01 mr={'50px'}>
                    <StrTitle01>
                        Details
                    </StrTitle01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Contract Address
                        </StrDetails01>
                        <StrDetails01>
                            0x231d...353R
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Token ID
                        </StrDetails01>
                        <StrDetails01>
                            6024...1345
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Token Standard
                        </StrDetails01>
                        <StrDetails01>
                            ERC-721
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Blockchain
                        </StrDetails01>
                        <StrDetails01>
                            Ethereum
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Metadata
                        </StrDetails01>
                        <StrDetails01>
                            Centralized
                        </StrDetails01>
                    </EachDetailsBox01>
                </DetailsBox01>
                <PropertiesBox01>
                    <StrTitle01>
                        Properties
                    </StrTitle01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Color
                        </StrDetails01>
                        <StrDetails01>
                            Red
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Clothes
                        </StrDetails01>
                        <StrDetails01>
                            Suit
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Glasses
                        </StrDetails01>
                        <StrDetails01>
                            Sunglasses
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Eye
                        </StrDetails01>
                        <StrDetails01>
                            Black
                        </StrDetails01>
                    </EachDetailsBox01>
                    <EachDetailsBox01>
                        <StrDetails01>
                            Type
                        </StrDetails01>
                        <StrDetails01>
                            Monkey
                        </StrDetails01>
                    </EachDetailsBox01>
                </PropertiesBox01>
            </NFTDetailBox01>
            <StrHead01 mt="100px">
                More from this collection
            </StrHead01>
            <DropsBox01 mt={'20px'}>
                <CartNFT itemID={'0'} image={imgNFT01} name={"The HUNT NFT#001"} description={"this is the HUNT NFT#001"} price={"360.97"} endDay={"2"} />
                <CartNFT itemID={'0'} image={imgNFT02} name={"The HUNT NFT#002"} description={"this is the HUNT NFT#002"} price={"207641700"} endDay={"34"} />
                <CartNFT itemID={'0'} image={imgNFT03} name={"The HUNT NFT#003"} description={"this is the HUNT NFT#003"} price={"6341.53"} endDay={"12"} />
                <CartNFT itemID={'0'} image={imgNFT04} name={"The HUNT NFT#004"} description={"this is the HUNT NFT#004"} price={"12500"} endDay={"7"} />
            </DropsBox01>
            <NotificationContainer />
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
const NFTMainBox01 = styled(Box)`
    display: flex;
    width: 80%;
`
const ImagePart01 = styled(Box)`
    display: flex;
    flex: 1;
    width: 100%;
    height:100%;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #000;
    overflow: hidden;
    transition: .3s;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
    }
    >img{
        transition: .5s;
        &:hover{
            transform: scale(1.3);
        }
    }
    margin-right: 50px;
`
const ContentPart01 = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
`
const StrTitle01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 1.5rem;
`
const EachDetailsBox01 = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top:10px;
`
const StrDetails01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 1rem;
    
`

const StrHead01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 3rem;
`

const StrTitle02 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 1.5rem;
    color: #b3b3b3;
`

const StrDescription02 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 2rem;
`
const PriceBox01 = styled(Box)`
    display: flex;
    align-items: center;
`
const BuyNFTBox01 = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
`
const CustomBtn02 = styled(Box)`
    display: flex;
    position: relative;
    padding:10px 30px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-size: 1.2rem;
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
const NFTDetailBox01 = styled(Box)`
    display: flex;
    width: 80%;
`
const DetailsBox01 = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
`
const PropertiesBox01 = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const DropsBox01 = styled(Box)`
    display: grid;
    width :80%;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    margin-bottom: 100px;
`

export default DetailNFT;
