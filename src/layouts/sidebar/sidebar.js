import React from "react";
import {useNavigate} from 'react-router-dom'
import { Box } from '@material-ui/core';
import styled from "styled-components";
import imgLogo01 from "../../assets/image/new_logo01.png";
import { FaGithub, FaTwitter, FaDiscord, FaMedium, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize, MdBrightness5 } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <StyledComponent>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <MarkImg onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>
                    <img src={imgLogo01} alt="" width={"200px"}></img>
                </MarkImg>
                <LinkList>
                    <EachLink onClick={()=>{
                        navigate('/');
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}>
                        <MdOutlineDashboardCustomize />
                        <EachLinkTxt >Dashboard</EachLinkTxt>
                    </EachLink>
                    <EachLink onClick={()=>{
                        navigate('/stake');
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}>
                        <SiDatabricks />
                        <EachLinkTxt >Stake</EachLinkTxt>
                    </EachLink>
                    <EachLink>
                        <MdBrightness5 />
                        <EachLinkTxt >Dao</EachLinkTxt>
                    </EachLink>
                    <EachLink onClick={()=>{
                        navigate('/marketplace');
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}>
                        <FaShoppingCart />
                        <EachLinkTxt >Marketplace</EachLinkTxt>
                    </EachLink>

                </LinkList>
            </Box>

            <ContactList>
                <ContactBox><FaGithub /></ContactBox>
                <ContactBox><FaMedium /></ContactBox>
                <ContactBox><FaTwitter /></ContactBox>
                <ContactBox><FaDiscord /></ContactBox>
            </ContactList>
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    position: fixed;
    width: 320px;
    height: 100vh;
    overflow-y: auto;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-style: solid;
    border-width: 0px 1px 0px 0px;
    border-color: #000 rgba(0, 0, 0, 0.5) #000 #000;
    border-radius: 0px 30px 30px 0px;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 0 10px 0 #000;
    backdrop-filter: blur(5px);
    /* -webkit-backdrop-filter: blur(5px); */
    /* opacity: 1; */
    @media (max-width: 1000px) {
        display: none;
    }
`
const MarkImg = styled(Box)`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
`

// const MarkLetter = styled(Box)`
//     display: flex;
//     justify-content: content;
//     margin-top: 10px;
//     color: #333;
//     font-size: 2rem;
//     font-weight: 700;
//     cursor: pointer;
// `


const LinkList = styled(Box)`
    display: flex;
    width: 100%;
    flex-direction: column;
    color: white;
    font-weight: 700;
    margin-top: 30px;
    padding-left: 40px;
    box-sizing: border-box;
`
const EachLink = styled(Box)`
    display: flex;
    height: 80px;
    align-items: center;
    font-size: 2rem;
    text-shadow: 1px 1px 6px #000;
    font-family: 'Changa One', Impact, sans-serif;
    color: #fff;
    line-height: 1.25;
    text-align: center;
    letter-spacing: 1px;
    transition: all 150ms ease;
    &:hover{
        cursor: pointer;
        font-size: 2.2rem;
    }
`
const EachLinkTxt = styled(Box)`
    display: flex;
    margin-left: 15px;
`

const ContactList = styled(Box)`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: #93aebc;
`

const ContactBox = styled(Box)`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    transition: all 100ms ease;
    &:hover{
        color: white;
    }
`
export default Sidebar;
