import React, { useState } from "react";
import styled from "styled-components";
import { Box, Modal } from '@material-ui/core';
import Sidebar from "./layouts/sidebar/sidebar";
import Dashboard from "./layouts/dashboard/dashboard";
import Stake from "./layouts/pages/stake/stake";
import Marketplace from "./layouts/pages/marketplace/marketplace";
import CreateNFT from "./layouts/pages/marketplace/create";
import ExploreNFT from "./layouts/pages/marketplace/explore";
import DetailNFT from "./layouts/pages/marketplace/detail";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import imgBack01 from "./assets/image/background01.jpg"
import imgLogo01 from "./assets/image/new_logo01.png";
import { FaGithub, FaTwitter, FaDiscord, FaMedium, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize, MdMenu, MdBrightness5 } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";
import { MoralisProvider } from "react-moralis";


function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MoralisProvider appId="0PGiZ9K8sBDBNXDwvdH8qHeRNU9O1S8rg9N0IB9X" serverUrl="https://auqhlniptgrw.usemoralis.com:2053/server">
          <BrowserRouter>
            <StyledComponent>
              <Sidebar />
              <Routes>
                <Route path="*" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/createNFT" element={<CreateNFT />} />
                <Route path="/exploreNFT" element={<ExploreNFT />} />
                <Route path="/detailNFT" element={<DetailNFT />} />
              </Routes>
              <CustomBtn2 onClick={() => {
                handleOpen();
              }}>
                <MdMenu />
              </CustomBtn2>
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" BackdropComponent={CustomBackdrop_Navbar}>
                <ModalComponent>
                  <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <MarkImg onClick={() => {
                      window.scrollTo(0, 0);
                    }}>
                      <img src={imgLogo01} alt="" width={"200px"}></img>
                    </MarkImg>
                    <LinkList>
                      <Link to='/' style={{ textDecoration: 'none' }}><EachLink onClick={() => {
                        handleClose();
                        window.scroll(0, 0);
                      }}>
                        <MdOutlineDashboardCustomize />
                        <EachLinkTxt >Dashboard</EachLinkTxt>
                      </EachLink>
                      </Link>
                      <Link to='/stake' style={{ textDecoration: 'none' }}><EachLink onClick={() => {
                        handleClose();
                        window.scroll(0, 0);
                      }}>
                        <SiDatabricks />
                        <EachLinkTxt >Stake</EachLinkTxt>
                      </EachLink>
                      </Link>
                      <Link to='' style={{ textDecoration: 'none' }}><EachLink onClick={() => {
                        handleClose();
                        window.scroll(0, 0);
                      }}>
                        <MdBrightness5 />
                        <EachLinkTxt >Dao</EachLinkTxt>
                      </EachLink>
                      </Link>
                      <Link to='/marketplace' style={{ textDecoration: 'none' }}><EachLink onClick={() => {
                        handleClose();
                        window.scroll(0, 0);
                      }}>
                        <FaShoppingCart />
                        <EachLinkTxt >Marketplace</EachLinkTxt>
                      </EachLink>
                      </Link>
                    </LinkList>
                  </Box>
                  <ContactList>
                    <Box display={"flex"} width="80%">
                      <ContactBox onClick={() => handleClose()}><FaGithub /></ContactBox>
                      <ContactBox onClick={() => handleClose()}><FaMedium /></ContactBox>
                      <ContactBox onClick={() => handleClose()}><FaTwitter /></ContactBox>
                      <ContactBox onClick={() => handleClose()}><FaDiscord /></ContactBox>
                    </Box>
                  </ContactList>
                </ModalComponent>
              </Modal>
            </StyledComponent>
          </BrowserRouter>
        </MoralisProvider>
      </Web3ReactProvider>
    </>
  );
}

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  /* background-color: #e5e5e5; */
  background-image: url(${imgBack01});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; 
`

const ModalComponent = styled(Box)`
    display: flex;
    transition: all 100ms ease;
    width: 300px;
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
    outline: none;

`

const MarkImg = styled(Box)`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
`
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
    transition: all 100ms ease;
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
const CustomBtn2 = styled(Box)`
    display: none;
    position: fixed;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    left: 20px;
    top: 20px;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background-color: #333;
    color: white;
    cursor: pointer;
    transition: .5s;
    &:hover{
        color: #ffd47d;
    }
    @media (max-width: 1000px) {
        display: flex;
    }
`
export const CustomBackdrop_Navbar = styled(Box)`
    width: 100%;
    height: 100%;
    position: fixed;
    background: black;
    opacity: 0.6;
`


export default App;
