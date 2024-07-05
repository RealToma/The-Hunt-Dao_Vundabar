import React, { useState, useMemo, useEffect } from "react";
import { Modal, Box } from '@material-ui/core';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import Triangle01 from "../../assets/image/triangle.png"

// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
import { ethers } from "ethers";
import { CONTRACTS } from "../../utils/constants";
import { HUNT_ABI } from "../../utils/abi";
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import imgBackground02 from '../../assets/image/background02.png'
import imgHuntToken01 from '../../assets/image/coin01.png'
import { useNavigate } from "react-router-dom"
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

var axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:3001/';


// const data = [
//     {
//         name: 'Sun',
//         price: 1,
//         trading: 3908,
//         staked: 2000,
//     },
//     {
//         name: 'Mon',
//         price: 0.4,
//         trading: 2400,
//         staked: 2400,
//     },
//     {
//         name: 'Tue',
//         price: 0.8,
//         trading: 1398,
//         staked: 2210,
//     },
//     {
//         name: 'Wed',
//         price: 0.5,
//         trading: 3908,
//         staked: 2000,
//     },
//     {
//         name: 'Thr',
//         price: 1.2,
//         trading: 4800,
//         staked: 1881,
//     },
//     {
//         name: 'Fri',
//         price: 0.1,
//         trading: 2400,
//         staked: 2400,
//     },
//     {
//         name: 'Sat',
//         price: 0.8,
//         trading: 1398,
//         staked: 2210,
//     },
// ];


const Overview = ({ twitterRef }) => {
    const navigate = useNavigate();
    const { account, active, library } = useWeb3React();
    const HUNT_Contract = useMemo(() => (library ? new ethers.Contract(CONTRACTS.HUNT_TOKEN, HUNT_ABI, library.getSigner()) : null), [library]);
    // const SHUNT_CONTRACT = useMemo(() => (library ? new ethers.Contract(CONTRACTS.STAKED_HUNT, SHUNT_ABI, library.getSigner()) : null), [library]);

    const Web3Api = useMoralisWeb3Api();
    const { isInitialized } = useMoralis();

    const [open_graph, setGraphOpen] = useState(false);
    // const handleGraphOpen = () => setGraphOpen(true);
    const handleGraphClose = () => setGraphOpen(false);

    const [priceEth, setPriceEth] = useState(0);
    const [balanceHunt, setBalanceHunt] = useState();
    const [priceHunt, setPriceHunt] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    // const [historicalPrice, setHistoricalPrice] = useState();


    const getBalance = async () => {
        try {
            let tempBalance = await HUNT_Contract.balanceOf(account);
            setBalanceHunt(parseInt(tempBalance._hex) / Math.pow(10, 18))
        }
        catch (error) {
            console.log(error);
        }
    }

    const getTotalSupply = async () => {
        try {
            let tempSupply = await axios.get("get_total_supply");
            setTotalSupply(parseFloat(tempSupply.data.totalSupply / Math.pow(10, 18)));
        }
        catch (error) {
            console.log(error);
        }
    }

    const getPriceHunt = async () => {
        const options = {
            address: "0x4387946a7ed6561cf3390faaac90c1f52b593f2e",
            chain: "eth",
            exchange: "uniswap-v2",
        };
        const price = await Web3Api.token.getTokenPrice(options);
        setPriceHunt(parseFloat(price.usdPrice));
    }

    const shortForm = (num, fixed) => {
        if (num === null) { return null; } // terminate early
        if (num === 0) { return '0'; } // terminate early
        fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        var b = (num).toPrecision(2).split("e"), // get power
            k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
            c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
            d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
            e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
    }

    useEffect(() => {
        if (active) {
            getBalance();
            getTotalSupply();
        }
        else {
            setBalanceHunt();
        }
    }, [active])

    useEffect(() => {
        setInterval(() => {
            axios.get("get_price_ether").then((res) => {
                setPriceEth(parseFloat(res.data.priceEth).toFixed(2));
            }).catch((error) => {
                console.log(error);
            })
        }, 2000);
        // axios.get("get_historical_price").then((res) => {
        //     setHistoricalPrice(res.data.historicalPrice);
        // }).catch((error) => {
        //     console.log(error);
        // })
        if (isInitialized) {
            getPriceHunt();
        }
    }, [isInitialized])

    return (
        <StyledComponent>
            <MainStatePart>

                <StateStr01 mt="30px">The Hunt: Main Stats</StateStr01>
                <MainStaeBox01 mt={"10px"}>
                    <StateStr02>$ETH Price:{'\u00a0'}{priceEth}</StateStr02>
                    <StateStr02>$HUNT Price:{'\u00a0'}{priceHunt}</StateStr02>
                    <StateStr02>$HUNT Marketcap:{'\u00a0'}{shortForm(parseInt(totalSupply * priceHunt), 1)}</StateStr02>
                </MainStaeBox01>
                <MainStaeBox02 mt={"20px"}>
                    <MyStateBox01>
                        <ProfileBox01>
                            <TokenImageBox01>
                                <img src={imgHuntToken01} width={"100%"} height={"100%"} alt={""} style={{ borderRadius: '100%' }} />
                            </TokenImageBox01>
                            <ProfileInfoBox01>
                                <StateStr02>Profile</StateStr02>
                                <StateStr02>{active ? account.slice(0, 8) + "..." + account.slice(-6) : ""}</StateStr02>
                            </ProfileInfoBox01>
                        </ProfileBox01>
                        <MyStateInfo01 mt={'20px'}>
                            <StateStr03>Your stats:</StateStr03>
                            <StateStr02 mt={'20px'}>$HUNT Balance:{'\u00a0'}{balanceHunt}</StateStr02>
                            <StateStr02 mt={'20px'}>$HUNT Worth: $ {(balanceHunt * priceHunt).toFixed(2)}{'\u00a0'}</StateStr02>
                            <StateStr02 mt={'20px'}>$HUNT Staking Rewards:{'\u00a0'}</StateStr02>
                            <StateStr02 mt={'20px'}>$Hunt APY: 100%{'\u00a0'}</StateStr02>
                        </MyStateInfo01>
                        <ButtonPart01 mt={"50px"}>
                            <CustomBtn01>Buy $HUNT</CustomBtn01>
                            <CustomBtn01 onClick={() => {
                                navigate('/stake');
                                window.scroll(0, 0);
                            }}>Stake $HUNT</CustomBtn01>
                            <CustomBtn01 onClick={() => {
                                twitterRef.current.scrollIntoView({ behavior: 'smooth' });
                            }}>Tweet $HUNT</CustomBtn01>
                        </ButtonPart01>
                    </MyStateBox01>
                    <GraphBox01 onClick={() => {
                        // handleGraphOpen();
                    }}>
                        <TradingViewWidget
                            symbol="UNISWAP:HUNTWETH"
                            theme={Themes.DARK}
                            interval={5}
                            timezone="America/New_York"
                            style={1}
                            locale="en"
                            toolbar_bg="#f1f3f6"
                            enable_publishing={false}
                            withdateranges={true}
                            hide_side_toolbar={false}
                            allow_symbol_change={true}
                            container_id="tradingview_726f9"
                            autosize
                        />
                        {/* {
                            historicalPrice === null || historicalPrice === undefined ?
                                <Box fontSize={"1.5rem"}>Can't get price to display!</Box> :
                            <ResponsiveContainer width="95%" height="90%" >
                                <AreaChart
                                    width={"100%"}
                                    height={"100%"}
                                    data={historicalPrice}
                                    margin={{
                                        top: 30,
                                        right: 20,
                                        left: -20,
                                        bottom: 0,
                                    }}

                                >
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="price" stroke="#333" fill="#93aebc" />
                                </AreaChart>
                            </ResponsiveContainer>
                        } */}
                        {/* <Box>
                                <AdvancedRealTimeChart theme="dark" width={"800px"} height={"600px"} ></AdvancedRealTimeChart>
                            </Box> */}

                    </GraphBox01>
                </MainStaeBox02>
            </MainStatePart>

            {/* Graph modal */}
            <Modal open={open_graph} onClose={handleGraphClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" BackdropComponent={CustomBackdrop_Graph}>
                <GraphModalComponent>
                    <Box display={"flex"} width={"100%"} height={"100%"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'}>
                        <GraphInfoBox>
                            <Box display={"flex"} flex="1" fontSize={"2rem"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"}>HUNT Price</Box>
                            <Box display={"flex"} flex="1" fontSize={"2rem"} justifyContent={"center"} alignItems={"center"} fontWeight={"700"}>$ {priceHunt}</Box>
                            <Box display={"flex"} flex="1" fontSize={"18px"} justifyContent={"center"} alignItems={"center"} fontWeight={"600"} color={"white"}>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}><img src={Triangle01} width={"24px"} height={"24px"} alt="" /></Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginLeft={"2%"} fontSize={"1.6rem"}>1.63%</Box>
                            </Box>
                        </GraphInfoBox>
                        <GraphBox02>
                            <TradingViewWidget
                                symbol="UNISWAP:HUNTWETH"
                                theme={Themes.DARK}
                                interval={5}
                                timezone="America/New_York"
                                style={1}
                                locale="en"
                                toolbar_bg="#f1f3f6"
                                enable_publishing={false}
                                withdateranges={true}
                                hide_side_toolbar={false}
                                allow_symbol_change={true}
                                container_id="tradingview_726f9"
                                autosize
                            />
                            {/* {
                                historicalPrice === null || historicalPrice === undefined ?
                                    <Box fontSize={"1.5rem"}>Can't get price to display!</Box> :
                                    <ResponsiveContainer width="100%" height="100%" >
                                        <AreaChart
                                            width={"100%"}
                                            height={"100%"}
                                            data={historicalPrice}
                                            margin={{
                                                top: 0,
                                                right: 10,
                                                left: -10,
                                                bottom: 0,
                                            }}                                >
                                            <CartesianGrid strokeDasharray="2 2" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="price" stroke="#333" fill="#93aebc" />
                                            <Area type="monotone" dataKey="price" stroke="#82ca9d" fill="#82ca9d" />
                                            <Area type="monotone" dataKey="price" stroke="#ffc658" fill="#ffc658" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                            } */}
                        </GraphBox02>
                    </Box>
                </GraphModalComponent>
            </Modal>
            {/* <NotificationContainer /> */}
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    width: 90%;
    flex-direction: column;
`

const GraphModalComponent = styled(Box)`
 display: flex;
  width: 900px;
  height: 600px;
  flex-direction: column;
  background-color: white;
  border: none;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(100px)!important;
  border-radius: 20px!important;
  background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  padding: 30px;
  box-sizing: initial;
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
    @media (max-width: 1200px) {
        transition: .5s !important;
        width: 750px;
        height: 500px;
    }
    @media (max-width: 1000px) {
        transition: .5s !important;
        width: 600px;
        height: 400px;
    }
    @media (max-width: 800px) {
        transition: .5s !important;
        width: 450px;
        height: 300px;
    }
    @media (max-width: 600px) {
        transition: .5s !important;
        width: 300px;
        height: 200px;
    }
    @media (max-width: 450px) {
        transition: .5s !important;
        width: 180px;
        height: 120px;
    }
`

const GraphBox01 = styled(Box)`
    display: flex;
    flex: 2;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    /* width: 90%;
    height: 90%; */
    justify-content: center;
    align-items: center;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #000;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    font-size: 1rem;

`
const GraphBox02 = styled(Box)`
    display: flex;
    flex: 2;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
    font-size: 1rem;
`

const GraphInfoBox = styled(Box)`
    display: flex;
    flex: 1;
    width: 90%;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: white;
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
const MainStatePart = styled(Box)`
    display: flex;
    width: 100%;
    flex-direction: column;
    color: white;
    align-items: center;
`
const MainStaeBox01 = styled(Box)`
    display: flex;
    /* width: 800px; */
    padding: 30px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-image: url(${imgBackground02});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 10px 0 #000;
    border-radius: 20px;
`
const StateStr02 = styled(Box)`
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
    font-family: 'Changa One', Impact, sans-serif;
    color: #f7f7f7;
    font-size: 1.2rem;
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
const MyStateInfo01 = styled(Box)`
    display: flex;
    flex-direction: column;

`

const MainStaeBox02 = styled(Box)`
    display: flex;
    width: 100%;
    height: 450px;
`

const MyStateBox01 = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    margin-right: 20px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 #000;
`
const ProfileBox01 = styled(Box)`
    display: flex;
    width: 100%;
    align-items: center;
`
const TokenImageBox01 = styled(Box)`
    display: flex;
    width: 75px;
    height: 75px;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 3px solid white;
    margin-right:20px;
`
const ProfileInfoBox01 = styled(Box)`
    display: flex;
    flex-direction: column;
`
const ButtonPart01 = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const CustomBtn01 = styled(Box)`
    display: flex;
    position: relative;
    padding:9px 16px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    font-size: 0.9rem;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    letter-spacing: 2px;
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

export const CustomBackdrop_Graph = styled(Box)`
    width: 100%;
    height: 100%;
    position: fixed;
    background: black;
    opacity: 0.8;
`

export default Overview;
