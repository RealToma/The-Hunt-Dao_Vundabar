import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import styled from "styled-components";
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import imgBackground02 from '../../assets/image/background02.png'

const CustomDropDown = ({ width, height, content, setCollection }) => {
    const [flagArrow, setFlagArrow] = useState(false);
    const [selectedText, setSelectedText] = useState('Please select colletion');

    return (
        <SelectCollectionBox01 mr={'20px'} width={width} >
            <SelectedTextBox01 onClick={() => {
                setFlagArrow(!flagArrow);
            }}>{selectedText}</SelectedTextBox01>
            <ArrowBox01 onClick={() => {
                setFlagArrow(!flagArrow);
            }} >
                {
                    !flagArrow ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />
                }
            </ArrowBox01>
            {
                flagArrow ? <DropDownBox01 dropheight={height}>
                    {
                        content.map((each, index) => {
                            if (index === 0) {
                                return (
                                    <EachText01 onClick={() => {
                                        setFlagArrow(false);
                                        setSelectedText(each);
                                        setCollection(each);
                                    }} key={index}>{each}</EachText01>
                                )
                            }
                            else {
                                return (
                                    <EachText01 borderTop={"2px dashed white"} onClick={() => {
                                        setFlagArrow(false);
                                        setSelectedText(each);
                                        setCollection(each);
                                    }} key={index}>{each}</EachText01>
                                )
                            }
                        })
                    }
                </DropDownBox01> : <></>
            }
        </SelectCollectionBox01>
    );
}


const SelectCollectionBox01 = styled(Box)`
    display: flex;
    width: 400px;
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
    width: 100%;
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
            height: ${({ dropheight }) => dropheight ? dropheight : '0px'};
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

export default CustomDropDown;
