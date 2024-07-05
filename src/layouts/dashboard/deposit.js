import React, { useState, useMemo, useEffect, forwardRef, useCallback } from "react";
import { Box } from '@material-ui/core';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { CONTRACTS } from "../../utils/constants";
import { SHUNT_ABI } from "../../utils/abi";
import CustomButton from '../../components/elements/buttons';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Deposit = forwardRef((props, ref) => {
    const { account, active, library } = useWeb3React();
    // const HUNT_Contract = useMemo(() => (library ? new ethers.Contract(CONTRACTS.HUNT_TOKEN, HUNT_ABI, library.getSigner()) : null), [library]);
    const SHUNT_CONTRACT = useMemo(() => (library ? new ethers.Contract(CONTRACTS.STAKED_HUNT, SHUNT_ABI, library.getSigner()) : null), [library]);

    const [deposit, setDeposit] = useState();


    const getDeposit = useCallback(async () => {
        try {
            const tempDeposit = await SHUNT_CONTRACT.getDepositsOf(account);
            setDeposit(tempDeposit);
        }
        catch (error) {
            console.log(error)
        }
    }, []);

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
            getDeposit();
        }
    }, [active])
    return (
        <StyledComponent ref={ref}>
            <RewardText marginTop={"5%"}>
                <LeftText01>
                    Deposit History
                </LeftText01>
                <LeftText02 mt={"30px"}>
                    All your deposits will be listed here for the Hunt you're entered into.
                </LeftText02>
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
                                            <Box display={"flex"} width={"100%"} onClick={() => {
                                                unstake(index);
                                            }}>
                                                <CustomButton str={"Unstake"} width={"80%"} height={"40px"} color={"white"} bgcolor={"#333"} fsize={"16px"} fweight={"600"} bradius={"8px"}></CustomButton>
                                            </Box>
                                        </> : <></>
                                }
                            </Box>
                        </Row02>
                    )
                })}
            </PoolsPart>

            <NotificationContainer />
        </StyledComponent>
    );
})

const StyledComponent = styled(Box)`
    display: flex;
    width: 80%;
    flex-direction: column;
    margin-top: 50px;
    color: #333;
`

const RewardText = styled(Box)`
    display: flex;
    width: 100%;
    margin-top: 50px;
    flex-direction: column;
`


const LeftText01 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 54px;
    line-height: 36px;
    letter-spacing: -.01em;
`

const LeftText02 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -.01em;
`

const PoolsPart = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    margin-bottom:100px;
    padding: 50px;
    box-sizing: border-box;
    background: white;
    backdrop-filter: blur(100px);
    border-radius: 8px;
    transition: .3s;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -.01em;
    color: #333;
    font-size: 18px;
    line-height: 24px;
    align-items: center;
    &:hover{
        transition: .5s;
        box-shadow: 0 10px 15px rgb(0 0 0  / 30%);
    }
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
    border-top: 1px solid rgb(0 0 0 /50%);
`
export default Deposit;
