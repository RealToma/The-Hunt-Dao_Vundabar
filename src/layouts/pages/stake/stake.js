import React, { useState, useEffect, useMemo } from "react";
import { Box, Modal } from '@material-ui/core';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { CONTRACTS } from "../../../utils/constants";
import { HUNT_ABI,SHUNT_ABI } from "../../../utils/abi";
import Navbar from "../../navbar/navbar";
import Staked01 from "../../../assets/image/stake.svg"
import Reward01 from "../../../assets/image/rewards.svg";
import Triangle01 from "../../../assets/image/triangle.png"
import imgBackground02 from '../../../assets/image/background02.png'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { GiCancel } from 'react-icons/gi';
import Slider from '@material-ui/core/Slider';
import { TailSpin } from 'react-loader-spinner';

const Stake = () => {
    const { account, active, library } = useWeb3React();

    const HUNT_Contract = useMemo(() => (library ? new ethers.Contract(CONTRACTS.HUNT_TOKEN, HUNT_ABI, library.getSigner()) : null), [library]);
    const SHUNT_CONTRACT = useMemo(() => (library ? new ethers.Contract(CONTRACTS.STAKED_HUNT, SHUNT_ABI, library.getSigner()) : null), [library]);

    const [deposit, setDeposit] = useState();
    const [totalStaked, setTotalStaked] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [amount, set_amount] = useState(0);
    const [duration, set_duration] = useState(0);
    const [locked, set_locked] = useState(false);
    const [flag_spin_load, set_spin_load] = useState(false);



    const marks = [
        {
            value: 0,
            label: '0 weeks',
        },
        {
            value: 52,
            label: '52 weeks',
        },
    ];
    function valuetext(value) {
        return `${value} weeks`;
    }

    const handleSliderChange = (event, newValue) => {
        set_duration(newValue);
    };

    const getDeposit = async () => {
        try {
            const tempDeposit = await SHUNT_CONTRACT.getDepositsOf(account);
            setDeposit(tempDeposit);
        }
        catch (error) {
            console.log(error)
        }
    }

    
    const getTotalStaked = async () => {
        try {
            const staked = await SHUNT_CONTRACT.getTotalDeposit(account);
            setTotalStaked(parseInt(staked._hex) / Math.pow(10, 18))
        }
        catch (error) {
            console.log(error)
        }
    }

    const stake = async () => {
        try {
            set_spin_load(true);
            let amount_wei = amount * Math.pow(10, 18);
            const approve = await HUNT_Contract.approve(CONTRACTS.STAKED_HUNT, "0x" + amount_wei.toString(16));
            await approve.wait();
            var t_duration;
            if (locked === true) {
                t_duration = duration * 60 * 60 * 24 * 7;
            }
            else {
                t_duration = 0;
            }
            const stakeHunt = await SHUNT_CONTRACT.deposit("0x" + amount_wei.toString(16), "0x" + t_duration.toString(16), account);
            await stakeHunt.wait();
            NotificationManager.success('Successed. See your results.', 'Hi.', 3000);
            setTimeout(() => {
                set_spin_load(false);
                set_amount(0);
                set_locked(false);
                getTotalStaked();
                handleClose();
                set_duration(0);
            }, 3000);

        }
        catch (err) {
            console.log(err);
            NotificationManager.error('Failed. Try it again.', 'Hi.', 3000);
            set_spin_load(false);
            set_locked(false);
            set_amount(0);
            handleClose();
            set_duration(0);
        }
    }

    const unstake = async (index) => {
        try {
            const unstakeHunt = await SHUNT_CONTRACT.withdraw(index, account);
            await unstakeHunt.wait();
            NotificationManager.success('Successed. See your results.', 'Hi.', 3000);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (active === false) {
            return;
        }
        else {
            getTotalStaked();
            getDeposit();
        }
    }, [active])

    return (
        <StyledComponent>
            <Navbar />
            <CenterPart>
                <Left01>
                    <Box display={"flex"} flex={"2.5"} width={'100%'} height={"100%"} flexDirection={"column"} borderBottom={"1px solid white"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop="auto" marginBottom={"auto"} width={"100%"}>
                            <img src={Staked01} alt="staked01"></img>
                        </Box>
                        <SmText01>
                            Staked
                        </SmText01>
                        <BgText01>
                            {totalStaked} HUNT

                        </BgText01>
                    </Box>
                    <Box display={"flex"} flex={"1"} justifyContent="center" height={"100%"} alignItems={"center"} width={'100%'}>
                        {

                            active ?
                                <>
                                    <CustomBtn02 onClick={() => {
                                        handleOpen();
                                    }}>
                                        Stake
                                    </CustomBtn02>
                                </> :
                                <>
                                    <CustomBtn02>
                                        Connect Wallet
                                    </CustomBtn02>
                                </>
                        }
                    </Box>
                </Left01>
                <Center01>
                    <Box display={"flex"} flex={"2.5"} width={'100%'} justifyContent="center" alignItems={"center"} flexDirection={"column"} borderBottom={"1px solid white"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop="auto" marginBottom={"auto"} width={"100%"}>
                            <img src={Reward01} alt="reward01"></img>
                        </Box>
                        <SmText01>
                            Deposit
                        </SmText01>
                        <BgText01>

                        </BgText01>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={"auto"} marginBottom={'auto'} width={"100%"}>
                            <SmText02 display={"flex"} justifyContent={"center"} alignContent={"center"} width={"100%"}>

                            </SmText02>
                        </Box>
                    </Box>
                    <Box display={"flex"} flex={"1"} justifyContent="center" alignItems={"center"} width={'100%'}>
                        {

                            active ?
                                <>
                                    <CustomBtn02 onClick={() => {
                                    }}>
                                        Unstake
                                    </CustomBtn02>
                                </> :
                                <>
                                    <CustomBtn02 >
                                        Connect Wallet
                                    </CustomBtn02>
                                </>
                        }
                    </Box>
                </Center01>
                <Right01>
                    <Part01 display={"flex"} position={"relative"} flex={"1"} justifyContent="center" alignItems={"center"} flexDirection={"column"} width="100%">
                        <GraphInfoBox>
                            <Box display={"flex"} flex="1" fontSize={"20px"} justifyContent={"center"} alignItems={"center"} >HUNT Price</Box>
                            <Box display={"flex"} flex="1" fontSize={"25px"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"}>$ 1</Box>
                            <Box display={"flex"} flex="1" fontSize={"20px"} justifyContent={"center"} alignItems={"center"} >
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}><img src={Triangle01} width={"16px"} height={"16px"} alt="" /></Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginLeft={"2%"}>1.63%</Box>
                            </Box>
                        </GraphInfoBox>
                    </Part01>
                    <Part01 display={"flex"} justifyContent="center" alignItems={"center"} flexDirection={"column"} width="100%" marginTop={"20px"}>
                        <SmText03>
                            Total Locked Amount
                        </SmText03>
                        <Bgtext02>
                            $ {totalStaked}
                        </Bgtext02>
                        <SmText03>
                            Total Claimed Amount
                        </SmText03>
                        <Bgtext02>
                            $ 0.00
                        </Bgtext02>
                    </Part01>

                </Right01>
            </CenterPart>
            <DepositPart>
                <RewardText marginTop={"30px"}>
                    <StateStr01>
                        Deposit History
                    </StateStr01>
                    <StateStr03 mt={"20px"} justifyContent={"center"}>
                        All your deposits will be listed here for the Hunt you're entered into.
                    </StateStr03>
                </RewardText>
                <PoolsPart>
                    <Row01>
                        <Box display={"flex"} flex="1" alignItems={"center"} >
                            STAKED AMOUNT
                        </Box>
                        <Box display={"flex"} flex="1.2" alignItems={"center"} >

                            LOCK TIME
                        </Box>
                        <Box display={"flex"} flex="1.2" alignItems={"center"} >
                            UNLOCK TIME
                        </Box>
                        <Box display={"flex"} flex="0.6" alignItems={"center"} >
                            APR
                        </Box>
                        <Box display={"flex"} flex="1" alignItems={"center"} >
                        </Box>
                    </Row01>

                    {deposit && deposit.map((each, index) => {
                        return (
                            <Row02 key={index}>
                                <Box display={"flex"} flex="1" alignItems={"center"} >
                                    {(parseInt(each.amount._hex) / Math.pow(10, 18)).toFixed(2)} HUNT
                                </Box>
                                <Box display={"flex"} flex="1.2" alignItems={"center"} >
                                    {
                                        new Date(parseInt(each.start._hex) * 1000).toLocaleDateString() + " "
                                        + new Date(parseInt(each.start._hex) * 1000).toLocaleTimeString()
                                    }
                                </Box>
                                <Box display={"flex"} flex="1.2" alignItems={"center"} >
                                    {
                                        new Date(parseInt(each.end._hex) * 1000).toLocaleDateString() + " "
                                        + new Date(parseInt(each.end._hex) * 1000).toLocaleTimeString()
                                    }
                                </Box>

                                <Box display={"flex"} flex="0.6" alignItems={"center"} >
                                    100%
                                </Box>
                                <Box display={"flex"} flex="1" alignItems={"center"} >
                                    {
                                        Date.now() > (parseInt(each.end._hex) * 1000) ?
                                            <>
                                                <Box display={"flex"} width={"100%"} justifyContent={"center"} onClick={() => {
                                                    unstake(index);
                                                }}>
                                                    <CustomBtn02>Unstake</CustomBtn02>
                                                </Box>
                                            </> : <></>
                                    }
                                </Box>
                            </Row02>
                        )
                    })}
                </PoolsPart>
            </DepositPart>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" BackdropComponent={CustomBackdrop_ConnectWallet}>
                <ModalBox>
                    <CancelBox01 onClick={() => {
                        handleClose();
                        set_spin_load(false);
                        set_locked(false);
                        set_amount(0);
                        set_duration(0);
                    }}>
                        <GiCancel></GiCancel>
                    </CancelBox01>
                    <TitleText01>
                        {/* <img src={Mark01} width={"30px"} height={"30px"} alt=""></img> */}
                        Hunt Staking
                    </TitleText01>

                    <SelectDuration>
                        <FlexibleBox onClick={() => {
                            if (flag_spin_load === true) {
                                NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                                return;
                            }
                            set_locked(false);
                        }} locked={locked ? 1 : 0}>Flexible</FlexibleBox>
                        <LockedBox onClick={() => {
                            if (flag_spin_load === true) {
                                NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                                return;
                            }
                            set_locked(true);
                        }} locked={locked ? 1 : 0}>Locked</LockedBox>
                    </SelectDuration>

                    <SmText04 >
                        Amount
                    </SmText04>
                    <InputAmount component={"input"} value={amount} type={'number'} onChange={(e) => {
                        if (flag_spin_load === true) {
                            NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                            return;
                        }
                        set_amount(e.target.value);
                    }}></InputAmount>
                    {locked ? <SliderPart>
                        <Box display={"flex"} width={"100%"}>
                            <Box display={"flex"} flex="1" width={"100%"}>
                                <SmText04>
                                    Lock for : ({duration} weeks)
                                </SmText04></Box>
                            <Box display={"flex"} flex="1" width={"100%"} >
                                <SmText04 justifyContent={"flex-end"}>
                                    Weight : ({(1 + duration / 52).toFixed(2)})
                                </SmText04></Box>
                        </Box>
                        <Slider
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            // step={10}
                            value={duration}
                            marks={marks}
                            max={52}
                            valueLabelDisplay="on"
                            onChange={handleSliderChange}
                            style={{
                                // color: 'white',
                            }}
                        />

                    </SliderPart> : <></>}
                    <Box display={"flex"} width={"100%"} marginTop={"20px"} position={"relative"} justifyContent={'center'} onClick={() => {
                        if (flag_spin_load === true) {
                            NotificationManager.error('Please wait while processing.', 'Hi.', 2000);
                            return;
                        }
                        stake();
                    }}>
                        {flag_spin_load ?
                            <Box display={"flex"} position={"absolute"} left={"20%"} justifyContent={"center"} alignItems={"center"} top="10%">
                                <TailSpin color="white" height={35} width={35} />
                            </Box>
                            :
                            <></>
                        }
                        <CustomBtn02>Stake</CustomBtn02>
                    </Box>
                </ModalBox>
            </Modal>
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
`
const CenterPart = styled(Box)`
    display: grid;
    width: 90%;
    margin-top: 50px;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 20px;
    @media (max-width: 1200px) {
        transition: 0.5s;
        grid-auto-flow: row;
  }
`
const Left01 = styled(Box)`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    background: white;
    padding: 30px;
    box-sizing: border-box;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    color: white;
    box-shadow: 0 0 10px 0 #000;

`

const Center01 = styled(Box)`
    display: flex;
    flex: 1 1 0%;
    flex-direction:column;
    background: white;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 #000;
`

const Right01 = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:414px;
`

const SmText01 = styled(Box)`
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;

`
const BgText01 = styled(Box)`
    display: flex;
    margin-top:auto;
    margin-bottom: auto;
    width: 100%;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    justify-content: center;
    text-align: center;
    font-size: 40px;
`
const Bgtext02 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    text-align: center;

`
const SmText03 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    justify-content: center;
    align-items: flex-end;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    color: white;
`

const SmText02 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 24px;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    letter-spacing: -.01em;
    color: #333;
`
const Part01 = styled(Box)`
    display: flex;
    flex: 1;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #000;

`

const GraphInfoBox = styled(Box)`
    display: flex;
    flex: 1;
    width: 90%;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    font-size: 1.5rem;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
`
const DepositPart = styled(Box)`
    display: flex;
    width: 90%;
    flex-direction: column;
    margin-top: 50px;
    color: white;
`

const RewardText = styled(Box)`
    display: flex;
    width: 100%;
    flex-direction: column;
`

const PoolsPart = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    margin-bottom:100px;
    padding: 50px;
    box-sizing: border-box;
    font-weight: 600;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    font-size: 18px;
    align-items: center;
    transition: .3s;
    background-image: url(${imgBackground02});
    background-size: 120% 120%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #000;

`
const Row01 = styled(Box)`
    display: flex;
    flex:1;
    width: 100%;
`

const Row02 = styled(Box)`
    display: flex;
    flex:1;
    margin-top: 30px;
    width: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    border-top: 1px solid white;
`

const StateStr01 = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: 'Changa One', Impact, sans-serif;
    color: #fff;
    font-size: 3rem;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
`
const StateStr03 = styled(Box)`
    display: flex;
    font-family: 'Changa One', Impact, sans-serif;
    color: #f7f7f7;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
`
const CustomBtn02 = styled(Box)`
    display: flex;
    position: relative;
    padding:10px 25px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-size: 0.9rem;
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

const ModalBox = styled(Box)`
    display: flex;
    width: 400px;
    flex-direction: column;
    background-image: url(${imgBackground02});
    background-size: 120% 120%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #000;
    border: none;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
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
`

const CancelBox01 = styled(Box)`
    display: flex;
    position: absolute;
    right: 25px;
    top: 25px;
    font-size: 30px;
    opacity: 1;
    transition: .1s;
    color:white;
    transition: .3s;
    cursor:pointer;
    &:hover{
        opacity: 0.4;
    }
`

const FlexibleBox = styled(Box)`
    display: flex;
    flex: 1;
    opacity: ${({ locked }) => locked ? 0.4 : 1};
    border-bottom: ${({ locked }) => locked ? "2px solid white" : "2px solid white"};
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    font-weight: 400;
    font-size: 20px;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    transition: .3s;
    &:hover{
        cursor: pointer;
        opacity: 1;
        border-bottom: 2px solid white;
    }
`
const TitleText01 = styled(Box)`
    display: flex;
    flex:1;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-size: 25px;
    color: white;
`
const SelectDuration = styled(Box)`
    display: flex;
    width: 100%;
    margin-top: 8%;
    height: 50px;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-weight: 600;
    font-size: 16px;
    color: white;

`

const LockedBox = styled(Box)`
    display: flex;
    flex: 1;
    opacity: ${({ locked }) => locked ? 1 : 0.4};
    border-bottom: ${({ locked }) => locked ? "2px solid white" : "2px solid white"};
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    font-weight: 400;
    font-size: 20px;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    transition: .3s;
    &:hover{
        cursor: pointer;
        border-bottom: 2px solid white;
        opacity: 1;
    }
`

const InputAmount = styled(Box)`
    display: flex;
    margin-top: 2%;
    height: 40px;
    outline: none;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-weight: 400;
    font-size: 25px;
    color:  white;
    border: none ;
    background: none ;
    border-bottom: 2px solid white;
`

const SmText04 = styled(Box)`
    display: flex;
    width: 100%;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 2px;
    text-shadow: 1px 1px 6px #000;
    font-size: 16px;
    text-transform: uppercase;
    color: white;
    margin-top: 30px;
`
const SliderPart = styled(Box)`
    display: flex;
    flex-direction: column;
    .MuiSlider-root{
        color: white;
    }
    .MuiSlider-markLabelActive{
        color: white;
    }
    .MuiSlider-markLabel{
        font-family: 'Changa One', Impact, sans-serif;
        line-height: 1.25;
        letter-spacing: 2px;
        text-shadow: 1px 1px 6px #000;
        font-size: 14px;
        text-transform: uppercase;
        color: white;        
    }
    >span>span:nth-of-type(7)>span>span>span{
        color:#43271a ;
        font-family: 'Changa One', Impact, sans-serif;
        text-shadow: 1px 1px 6px #000;
        font-size: 15px;
        text-transform: uppercase;
    }

    
    .MuiSlider-mark{
        display: none;
    }
    >span>span:nth-of-type(4){
        left: 30px !important;
    }
    >span>span:nth-of-type(6){
        padding-right: 70px;
    }
`

export const CustomBackdrop_ConnectWallet = styled(Box)`
    width: 100%;
    height: 100%;
    position: fixed;
    background: black;
    opacity: 0.8;
`

export default Stake;
