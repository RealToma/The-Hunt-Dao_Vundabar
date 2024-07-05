import React, { useState, useEffect } from "react";
import { Box, Modal } from '@material-ui/core';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { FaWallet } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri"
import { injected, walletConnect, trustWallet, binance_wallet, chainId, NETWORK_NAME } from "../../utils/connectors";
// import { ethers } from "ethers";
// import { CONTRACTS } from "../../utils/constants";
// import { HUNT_ABI } from "../../utils/abi";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import imgDashboardLogo01 from "../../assets/image/dashboard_logo01.png"
import imgBackground02 from '../../assets/image/background02.png'
import imgMetamask from "../../assets/image/wallet/metamask.png";
import imgWalletConnect from "../../assets/image/wallet/walletConnect.svg";
import imgBinance from "../../assets/image/wallet/binance.png";
import imgTrust from "../../assets/image/wallet/trust.png";



const Navbar = () => {
    const { account, active, activate, deactivate } = useWeb3React();
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [flagDrop, setDrop] = useState(false);

    // const HUNT_Contract = useMemo(() => (library ? new ethers.Contract(CONTRACTS.HUNT_TOKEN, HUNT_ABI, library.getSigner()) : null), [library]);

    const DESKTOP_CONNECTORS = {
        MetaMask: injected,
        WalletConnect: walletConnect,
        BinanceWallet: binance_wallet,
        TrustWallet: trustWallet,
    };
    const walletConnectors = DESKTOP_CONNECTORS;
    const handleSwitch = async () => {
        try {
            if (window.ethereum.networkVersion !== chainId) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${Number(chainId).toString(16)}` }]
                }).then(() => {
                    //   setConnected(true);
                });
                console.log("You have successfully switched to Correct Network");
            }
        } catch (ex) {
            //   setConnected(false);
            NotificationManager.error("Failed to switch to " + NETWORK_NAME + " network.", "ERROR", 3000);
        }
    }

    const handleConnect = async (currentConnector) => {
        await activate(walletConnectors[currentConnector]);
        // set_wConnect(walletConnectors[currentConnector]);
        window.localStorage.setItem("CurrentWalletConnect", currentConnector);
        handleSwitch();
        // setConnected(true);
        handleClose();
    };



    useEffect(() => {
        const currentWalletState = window.localStorage.getItem("CurrentWalletConnect");
        currentWalletState && activate(walletConnectors[currentWalletState]);


    }, []);

    return (
        <StyledComponent>
            <DashboardLogo01 mt={"50px"}>
                <img src={imgDashboardLogo01} alt={""} />
            </DashboardLogo01>
            <ConnectWalletBtn mt={"20px"}
                onClick={() => {
                    if (active) {
                        setOpen(false);
                        setDrop(!flagDrop);
                    }
                    else {
                        setOpen(true);
                    }
                }} onMouseLeave={() => {
                    setDrop(false);
                }}>
                {active ? <Box display={"flex"} fontSize={'1.2rem'}>{account.slice(0, 6) + "..." + account.slice(-4)}</Box> : <><FaWallet /><Box display={"flex"} ml={"10px"}>Connect</Box></>}
                {
                    flagDrop ?
                        <DropBox onClick={async () => {
                            setDrop(false);
                            await deactivate(window.localStorage.getItem("CurrentWalletConnect"));
                            window.localStorage.removeItem("CurrentWalletConnect");
                        }}>
                            <RiLogoutBoxRLine />Disconnect
                        </DropBox> :
                        <></>
                }
            </ConnectWalletBtn>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" BackdropComponent={CustomBackdrop_ConnectWallet}>
                <ModalBox>
                    <UpText>Select Wallet</UpText>
                    <DownText>Connect to the site below with one of our available wallet providers.</DownText>
                    <ConnectPart>
                        <ConnectWallet onClick={() => {
                            handleConnect("MetaMask");
                        }}>
                            <Box display={"flex"} marginLeft={"5%"} >
                                Metamask
                            </Box>
                            <Box display={"flex"} marginRight={"5%"}>
                                <img src={imgMetamask} width={"24px"} height={"24px"} alt="" />
                            </Box>
                        </ConnectWallet>
                        <ConnectWallet onClick={() => {
                            handleConnect("BinanceWallet");
                        }}>
                            <Box display={"flex"} marginLeft={"5%"}>
                                BinanceWallet
                            </Box>
                            <Box display={"flex"} marginRight={"5%"}>
                                <img src={imgBinance} width={"24px"} height={"24px"} alt="" />
                            </Box>
                        </ConnectWallet>
                        <ConnectWallet onClick={() => {
                            handleConnect("WalletConnect");
                        }}>
                            <Box display={"flex"} marginLeft={"5%"}>
                                WalletConnect
                            </Box>
                            <Box display={"flex"} marginRight={"5%"}>
                                <img src={imgWalletConnect} width={"24px"} height={"24px"} alt="" />
                            </Box>
                        </ConnectWallet>
                        <ConnectWallet onClick={() => {
                            handleConnect("TrustWallet");
                        }}>
                            <Box display={"flex"} marginLeft={"5%"}>
                                TrustWallet
                            </Box>
                            <Box display={"flex"} marginRight={"5%"}>
                                <img src={imgTrust} width={"24px"} height={"24px"} alt="" />
                            </Box>
                        </ConnectWallet>
                    </ConnectPart>
                </ModalBox>
            </Modal>
            <NotificationContainer />
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    position: relative;
    width: 90%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`
// const BalanceBox = styled(Box)`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-family: "Inter",sans-serif!important;
//     font-style: normal;
//     font-weight: 600;
//     font-size: 20px;
//     line-height: 100%;
//     letter-spacing: -.01em;
//     color: #333;
//     margin-right: 20px;
//     text-align: center;
//     animation: fadeIn 1s;
//     @keyframes fadeIn {
//         0% { opacity: 0; }
//         100% { opacity: 1; }
//     }
// `

const ConnectWalletBtn = styled(Box)`
    display: flex;
    position: relative;
    width: 180px;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
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

const ConnectWallet = styled(Box)`
  display: flex;
  width: 100%;
  flex: 1;
  margin-top: 2%;
  margin-bottom: 2%;
  font-family: 'Changa One', Impact, sans-serif;
    font-size: 1.3rem;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    /* text-shadow: 1px 1px 6px #000; */
  justify-content: space-between;
  align-items: center;
  background: white;
  color: #412518;
  border-radius: 8px;
  transition: .5s;
  cursor: pointer;
  &:hover{
    background: #93aebc;
  }
`

const ConnectPart = styled(Box)`
  display: flex;
  flex: 4;
  flex-direction: column;
  font-family: "Inter",sans-serif!important;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -.01em;
  color: #333;
`

const UpText = styled(Box)`
  display: flex;
  flex:1;
  align-items: center;
  font-family: 'Changa One', Impact, sans-serif;
    font-size: 2rem;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
  color: white;


`
const DownText = styled(Box)`
  display: flex;
  flex:1;
  align-items: flex-start;
  font-family: 'Changa One', Impact, sans-serif;
    font-size: 1.2rem;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
  color: white;

`

const ModalBox = styled(Box)`
  display: flex;
  width: 350px;
  height: 400px;
  flex-direction: column;
  background-color: white;
  border: none;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 #000;
  border-radius: 20px;
  background-image: url(${imgBackground02});
    background-size: 120% 120%;
    background-position: center;
    background-repeat: no-repeat;
  padding: 30px;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  outline: none;
  animation: back_animation1 0.5s 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes back_animation1 {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
    @media (max-width: 600px) {
        transition: .5s !important;
        width: 300px;
    }
    @media (max-width: 450px) {
        transition: .5s !important;
        width: 200px;
        height: 330px;
    }
`

const DropBox = styled(Box)`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: -40px;
    width: 150px;
    height: 40px;
    border-radius: 0px 0px 8px 8px;
    /* background: hsla(0,30%,100%,.8); */
    border: none;
    transition: .5s;
    font-family: 'Changa One', Impact, sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    transition: .5s;
    cursor: pointer;
    &:hover{
        /* box-shadow: 0px 10px 10px rgb(0 0 0  / 20%), inset 2px 2px 2px #fff; */
        /* background: white; */
        color: #412518;
    }

`
const DashboardLogo01 = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    transition: .5s;
    .img{
        width: 100%;
    }
    @media (max-width: 1400px) {
        .img{
            width: 80%;
        }
    }

`

export const CustomBackdrop_ConnectWallet = styled(Box)`
    width: 100%;
    height: 100%;
    position: fixed;
    background: black;
    opacity: 0.8;
`

export default Navbar;

