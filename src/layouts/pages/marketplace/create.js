import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Box } from '@material-ui/core';
import styled from "styled-components";
import imgBackground02 from '../../../assets/image/background02.png'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { create } from "ipfs-http-client";
import CustomDropDown from "../../../components/elements/DropDown";

const CreateNFT = () => {
    const collectionData = [
        'Hunt Collection #01',
        'Hunt Collection #02',
        'Hunt Collection #03',
        'Hunt Collection #04'
    ]
    const navigate = useNavigate();

    const [chooseFileURL, setChooseFileURL] = useState();
    const chooseFileRef = useRef();
    const handleSelectFileClick = () => {
        chooseFileRef.current.click();
    }
    const handleSelectFileChange = async (e) => {
        setChooseFileURL(URL.createObjectURL(e.target.files[0]));
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [supply, setSupply] = useState(1);
    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);
    const [collection, setCollection] = useState('');


    const handelMintNFT = async () => {
        console.log(collection)
        
        // const tt = await create("https://ipfs.infura.io:5001/api/v0/2c1e6d82793fb7f61cc2");

        // const date = {
        //     name: name,
        //     description: description,

        // }
        // const temp_hash = await client.add(JSON.stringify(date));
    }

    return (
        <StyledComponent>
            <CreatePart01 mb={'100px'}>
                <StrHead01 mt={'50px'}>
                    Create NFT
                </StrHead01>
                <StrTitle01 mt="100px">Choose image</StrTitle01>
                <StrDescription01 mt="10px">JPEG, BMP, PNG, SVG, GIF, WEBP and etc. Max 100MB.</StrDescription01>
                {/* <StrTitle01 mt="100px">Image, Video, 3D model or Audio</StrTitle01>
                <StrDescription01 mt="10px">JPEG, PNG, SVG, GIF, WEBP, MP4, GLB, GLFT, MP3, WAV, OGG. Max 100mb.</StrDescription01> */}
                <SelectImageBox01 mt="30px" choosefile={chooseFileURL}>
                    <input
                        type="file"
                        ref={chooseFileRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => { handleSelectFileChange(e) }}
                    />
                    <CustomBtn02 onClick={handleSelectFileClick}>
                        Choose
                    </CustomBtn02>
                </SelectImageBox01>

                <StrTitle01 mt="100px">Name</StrTitle01>
                <StrDescription01 mt="10px">Type NFT name</StrDescription01>
                <CustomInput01 component={'input'} mt={"30px"} value={name} onChange={(e) => {
                    setName(e.target.value);
                }}></CustomInput01>

                <StrTitle01 mt="100px">Description</StrTitle01>
                <StrDescription01 mt="10px">Displayed on the item page</StrDescription01>
                <CustomInput01 component={'input'} mt={"30px"} value={description} onChange={(e) => {
                    setDescription(e.target.value);
                }}></CustomInput01>

                <StrTitle01 mt="100px">Supply</StrTitle01>
                <StrDescription01 mt="10px">The number of copies that can be minted</StrDescription01>
                <MinusPlusBox01 mt={"30px"}>
                    <MinusButton01 onClick={() => {
                        let temp = supply;
                        temp--;
                        if (temp <= 0) {
                            NotificationManager.error('It must be greater than 1.', 'Error!', 3000);
                            temp = 1;
                        }
                        setSupply(temp);
                    }}>
                        -
                    </MinusButton01>
                    <ValueBox01>
                        {supply}
                    </ValueBox01>
                    <PlusButton01 onClick={() => {
                        let temp = supply;
                        temp++;
                        setSupply(temp);
                    }}>
                        +
                    </PlusButton01>
                </MinusPlusBox01>
                {/* 
                <StrTitle01 mt="100px">Transaction</StrTitle01>
                <StrDescription01 mt="10px">Choose type</StrDescription01> */}

                <StrTitle01 mt="100px">Duration</StrTitle01>
                <StrDescription01 mt="10px">Selected value shows one day</StrDescription01>
                <MinusPlusBox01 mt={"30px"}>
                    <MinusButton01 onClick={() => {
                        let temp = duration;
                        temp--;
                        if (temp < 0) {
                            NotificationManager.error('It must be greater than 0.', 'Error!', 3000);
                            temp = 0;
                        }
                        setDuration(temp);
                    }}>
                        -
                    </MinusButton01>
                    <ValueBox01>
                        {duration}
                    </ValueBox01>
                    <PlusButton01 onClick={() => {
                        let temp = duration;
                        temp++;
                        setDuration(temp);
                    }}>
                        +
                    </PlusButton01>
                </MinusPlusBox01>

                <StrTitle01 mt="100px">Price</StrTitle01>
                <StrDescription01 mt="10px">Price per item copies</StrDescription01>
                <CustomInput02 component={'input'} type={'number'} mt={"30px"} value={price} onChange={(e) => {
                    if (e.target.value <= 0) {
                        NotificationManager.error('It must be greater than 0.', 'Error!', 3000);
                        setPrice(0);
                        return;
                    }
                    setPrice(e.target.value);
                }}></CustomInput02>

                <StrTitle01 mt="100px">Collection</StrTitle01>
                <StrDescription01 mt="10px">Select existing collection or create new one</StrDescription01>
                <Box display="flex" mt={'30px'}>
                    <CustomDropDown width={"400px"} height={`${collectionData.length * 50}px`} content={collectionData} setCollection={setCollection} />
                </Box>

                <MintNFTBox01 mt={"100px"}>
                    <CustomBtn02 onClick={handelMintNFT}>
                        Mint NFT
                    </CustomBtn02>
                </MintNFTBox01>
            </CreatePart01>

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

const CreatePart01 = styled(Box)`
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
const StrTitle01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 1.5rem;
`
const StrDescription01 = styled(Box)`
    display: flex;
    text-align: start;
    font-size: 1rem;
    color: #b3b3b3;
`
const SelectImageBox01 = styled(Box)`
    display: flex;
    width: 400px;
    height: 400px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 2px dashed white;
    background-image: url(${({ choosefile }) => choosefile ? choosefile : imgBackground02});
    /* background-image: url(${imgBackground02}); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: .3s;
    box-shadow: 0 0 10px 0 #000;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
        border: 2px inset white;
    }
`
const CustomBtn02 = styled(Box)`
    display: flex;
    position: relative;
    padding:10px 20px;
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
const CustomInput01 = styled(Box)`
    display: flex;
    width: 100%;
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
const CustomInput02 = styled(Box)`
    display: flex;
    width: 400px;
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

const MinusPlusBox01 = styled(Box)`
    display: flex;
    width: 400px;
    height: 50px;
    border-radius: 20px;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 120% 120%;
    /* border: 2px dashed white; */
    transition: .3s;
    box-shadow: 0 0 10px 0 #000;
    &:hover{
        box-shadow: 0 0 30px 0 #000;
    }
`
const MinusButton01 = styled(Box)`
    display: flex;
    flex: 2;
    justify-content: center;
    align-items: center;
    transition: .2s;
    font-size: 2rem;
    border-radius: 20px 0px 0px 20px;
    border: 2px dashed white;
    cursor: pointer;
    &:hover{
        font-size: 2.5rem;
        border: 2px solid white;
    }
    &:active{
        font-size:1.5rem;
    }

`
const PlusButton01 = styled(Box)`
    display: flex;
    flex: 2;
    justify-content: center;
    align-items: center;
    transition: .2s;
    font-size: 2rem;
    border-radius: 0px 20px 20px 0px;
    border: 2px dashed white;
    cursor: pointer;
    &:hover{
        font-size: 2.5rem;
        border: 2px solid white;
    }
    &:active{
        font-size: 1.5rem;
    }
`
const ValueBox01 = styled(Box)`
    display: flex;
    flex: 1.5;
    border-top: 2px dashed white;
    border-bottom: 2px dashed white;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`
const MintNFTBox01 = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
`



export default CreateNFT;
