import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Box } from '@material-ui/core';
import styled from "styled-components";
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import imgBackground02 from '../../../assets/image/background02.png'
import CustomDropDown from "../../../components/elements/DropDown";
import CartNFT from "../../../components/elements/CartNFT";

import imgNFT01 from "../../../assets/image/NFTs/01.jpg";
import imgNFT02 from "../../../assets/image/NFTs/02.jpg";
import imgNFT03 from "../../../assets/image/NFTs/03.jpg";
import imgNFT04 from "../../../assets/image/NFTs/04.jpg";

const ExploreNFT = () => {
    const navigate = useNavigate();

    const [flagArrow, setFlagArrow] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');

    return (
        <StyledComponent>
            <ExplorePart01 mb={'100px'}>
                <StrHead01 mt={'50px'}>
                    Explore NFT
                </StrHead01>
                <FilterBox01 mt={"100px"}>
                    <SelectCollectionBox01 mr={'20px'}>
                        <SelectedTextBox01 onClick={() => {
                            setFlagArrow(!flagArrow);
                        }}>Collection #01</SelectedTextBox01>
                        <ArrowBox01 onClick={() => {
                            setFlagArrow(!flagArrow);
                        }} >
                            {
                                !flagArrow ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />
                            }
                        </ArrowBox01>
                        {
                            flagArrow ? <DropDownBox01>
                                <EachText01 onClick={() => { setFlagArrow(false) }}>Collection #01</EachText01>
                                <EachText01 borderTop={"2px dashed white"} onClick={() => { setFlagArrow(false) }}>Collection #02</EachText01>
                                <EachText01 borderTop={"2px dashed white"} onClick={() => { setFlagArrow(false) }}>Collection #03</EachText01>
                                <EachText01 borderTop={"2px dashed white"} onClick={() => { setFlagArrow(false) }}>Collection #04</EachText01>
                            </DropDownBox01> : <></>
                        }
                    </SelectCollectionBox01>
                    <CustomInput01 mr={"20px"} component={'input'} searchValue={searchInputValue} placeholder={"Search items, collections, prices and etc."} onChange={(e) => {
                        setSearchInputValue(e.target.value);
                    }}></CustomInput01>
                    <CustomDropDown />
                </FilterBox01>
                <ItemsBox01 mt={'50px'}>
                    <CartNFT image={imgNFT01} name={"The HUNT NFT#001"} description={"this is the HUNT NFT#001"} price={"360.97"} endDay={"2"} />
                    <CartNFT image={imgNFT02} name={"The HUNT NFT#002"} description={"this is the HUNT NFT#002"} price={"207641700"} endDay={"34"} />
                    <CartNFT image={imgNFT03} name={"The HUNT NFT#003"} description={"this is the HUNT NFT#003"} price={"6341.53"} endDay={"12"} />
                    <CartNFT image={imgNFT04} name={"The HUNT NFT#004"} description={"this is the HUNT NFT#004"} price={"12500"} endDay={"7"} />

                    <CartNFT image={imgNFT01} name={"The HUNT NFT#001"} description={"this is the HUNT NFT#001"} price={"360.97"} endDay={"2"} />
                    <CartNFT image={imgNFT02} name={"The HUNT NFT#002"} description={"this is the HUNT NFT#002"} price={"207641700"} endDay={"34"} />
                    <CartNFT image={imgNFT03} name={"The HUNT NFT#003"} description={"this is the HUNT NFT#003"} price={"6341.53"} endDay={"12"} />
                    <CartNFT image={imgNFT04} name={"The HUNT NFT#004"} description={"this is the HUNT NFT#004"} price={"12500"} endDay={"7"} />
                    
                    <CartNFT image={imgNFT01} name={"The HUNT NFT#001"} description={"this is the HUNT NFT#001"} price={"360.97"} endDay={"2"} />
                    <CartNFT image={imgNFT02} name={"The HUNT NFT#002"} description={"this is the HUNT NFT#002"} price={"207641700"} endDay={"34"} />
                    <CartNFT image={imgNFT03} name={"The HUNT NFT#003"} description={"this is the HUNT NFT#003"} price={"6341.53"} endDay={"12"} />
                    <CartNFT image={imgNFT04} name={"The HUNT NFT#004"} description={"this is the HUNT NFT#004"} price={"12500"} endDay={"7"} />
                </ItemsBox01>
            </ExplorePart01>
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
const ExplorePart01 = styled(Box)`
    display: flex;
    width: 80%;
    flex-direction: column;
    margin-top: 50px;
`

const StrHead01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 3rem;
`
const FilterBox01 = styled(Box)`
    display: flex;
    width: 100%;
    align-items: center;
`
const SelectCollectionBox01 = styled(Box)`
    display: flex;
    width: 300px;
    height: 50px;
    position: relative;
    font-size: 1.5rem;
    padding: 10px 20px;
    border-radius: 20px;
    box-sizing: border-box;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120% 120%;
    border: 2px dashed white;
    transition: .3s;
    cursor: pointer;
    box-shadow: 0 0 10px 0 #000;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
        border: 2px inset  white;
    }
`
const SelectedTextBox01 = styled(Box)`
    display: flex;
    flex: 7;

`
const ArrowBox01 = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    transition: .3s;
    cursor: pointer;
    &:hover{
        font-size: 1.5rem;
    }
    &:active{
        font-size: 1.2rem;
    }
`
const DropDownBox01 = styled(Box)`
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 53px;
    height: 0px;
    left: 0px;
    width: 300px;
    font-size: 1.5rem;
    padding: 10px 20px;
    border-radius: 20px;
    box-sizing: border-box;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120% 120%;
    border: 2px dashed white;
    transition: .3s;
    box-shadow: 0 0 10px 0 #000;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
        border: 2px inset  white;
    }
    animation: dropAnimation01 0.3s 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    transform-origin: bottom;
    @keyframes dropAnimation01 {
        0%{
            height: 0px;
        }
        100%{
            height: 200px;
        }
    }
`
const EachText01 = styled(Box)`
    display: flex;
    flex: 1;
    align-items: center;
    cursor: pointer;
    transition: .3s;
    &:hover{
        color: #b3b3b3;
    }
    animation: dropAnimation02 1s 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    transform-origin: bottom;
    @keyframes dropAnimation02 {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
`
const CustomInput01 = styled(Box)`
    display: flex;
    flex: 1;
    height: 50px;
    outline: none;
    padding: 10px 20px;
    border-radius: 20px;
    box-sizing: border-box;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120% 120%;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    text-align: start;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    font-size: 1.5rem;
    /* border: 2px solid #b3b3b3; */
    border: 2px dashed white;
    transition: .3s;
    box-shadow: 0 0 10px 0 #000;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
        border: 2px inset  white;
    }
`
const ItemsBox01 = styled(Box)`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: auto;
    grid-row-gap: 20px;

`

export default ExploreNFT;
