import React,{forwardRef} from "react";
import { Box } from '@material-ui/core';
import styled from "styled-components";

import CustomButton from '../../components/elements/buttons';

const Reward = forwardRef((props,ref) => {

    return (
        <StyledComponent ref={ref}>
            <RewardText>
                <LeftText01>
                    Claim Rewards
                </LeftText01>
                <RightText01>
                    Staking rewards enter a 12 month vesting period after claiming. Staked Hunt tokens are non-transferable and only used for accounting purposes.                </RightText01>
            </RewardText>

            <RewardText marginTop={"5%"}>
                <LeftText01>
                    Claim
                </LeftText01>
            </RewardText>
            <PoolsPart>
                <Row01>
                    <Box display={"flex"} flex="1" alignItems={"center"} >
                        Care Pools
                    </Box>
                    <Box display={"flex"} flex="1" alignItems={"center"} >
                        Total Value Locked
                    </Box>
                    <Box display={"flex"} flex="0.4" alignItems={"center"} >
                        APR
                    </Box>
                    <Box display={"flex"} flex="1.6" alignItems={"center"} ></Box>
                </Row01>
                <Row02>
                    <Box display={"flex"} flex="1" alignItems={"center"} >
                        HUNT
                    </Box>
                    <Box display={"flex"} flex="1" alignItems={"center"} >
                        $ 1200
                    </Box>
                    <Box display={"flex"} flex="0.4" alignItems={"center"} >
                        100%
                    </Box>
                    <Box display={"flex"} flex="1.6" alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                        <Box display={"1"} width={"24%"}>
                            <CustomButton str={""} width={"100%"} height={""} color={""} bgcolor={""} fsize={""} fweight={""} bradius={""}>
                            </CustomButton>
                        </Box>
                        <Box display={"1"} width={"24%"}>
                            <CustomButton str={"Details"} width={"100%"} height={"30px"} color={"black"} bgcolor={"white"} fsize={"16px"} fweight={"600"} bradius={"8px"}>
                            </CustomButton>
                        </Box>
                        <Box display={"1"} width={"24%"}>
                            <CustomButton str={"Stake"} width={"100%"} height={"30px"} color={"white"} bgcolor={"#333"} fsize={"16px"} fweight={"600"} bradius={"8px"}></CustomButton>
                        </Box>
                    </Box>
                </Row02>
                <Row03>
                    <Box display={"flex"} flex="1" alignItems={"center"} >
                        HUNT/ETH Uniswap LP
                    </Box>
                    <Box display={"flex"} flex="1" alignItems={"center"} >
                        $ 120
                    </Box>
                    <Box display={"flex"} flex="0.4" alignItems={"center"} >
                        104.421%
                    </Box>
                    <Box display={"flex"} flex="1.6" alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                        <Box display={"1"} width={"24%"}>
                            <a target="_blank" rel="noopener noreferrer" href="https://v2.info.uniswap.org/pair/0xccb63225a7b19dcf66717e4d40c9a72b39331d61"><CustomButton str={"Buy LP"} width={"100%"} height={"30px"} color={"black"} bgcolor={"white"} fsize={"16px"} fweight={"600"} bradius={"8px"}></CustomButton></a></Box>
                        <Box display={"1"} width={"24%"}>
                            <CustomButton str={"Details"} width={"100%"} height={"30px"} color={"black"} bgcolor={"white"} fsize={"16px"} fweight={"600"} bradius={"8px"}>
                            </CustomButton>
                        </Box>
                        <Box display={"1"} width={"24%"} >
                            <CustomButton str={"Stake"} width={"100%"} height={"30px"} color={"white"} bgcolor={"#333"} fsize={"16px"} fweight={"600"} bradius={"8px"}></CustomButton>
                        </Box>
                    </Box>
                </Row03>
            </PoolsPart>
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
`

const RightText01 = styled(Box)`
    display: flex;
    flex: 1;
    font-family: "Inter",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -.01em;
    max-width: 560px;
    float: right;
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

const PoolsPart = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 3%;
    margin-bottom: 5%;
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
    margin-top: 5%;
    width: 90%;
`

const Row02 = styled(Box)`
    display: flex;
    flex:1;
    margin-top: 2%;
    width: 90%;
    border-top: 1px solid rgb(255 255 255 /50%);
    padding-top: 2%;
`
const Row03 = styled(Box)`
    display: flex;
    flex:1;
    margin-top: 2%;
    width: 90%;
    border-top: 1px solid rgb(255 255 255 /50%);
    padding-top: 2%;
    margin-bottom: 5%;
`

export default Reward;
