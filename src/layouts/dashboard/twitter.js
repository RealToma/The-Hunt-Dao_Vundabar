import React, { useState, forwardRef, useEffect } from "react";
import { Box } from '@material-ui/core';
import styled from "styled-components";
import imgBackground02 from '../../assets/image/background02.png'
import Marquee from "react-fast-marquee";
import { AiFillTwitterCircle } from "react-icons/ai"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from 'axios'


const Twitter = forwardRef((props, ref) => {
    const [twitterData, setTwitterData] = useState();

    useEffect(() => {
        axios.get("get_all_twitter").then((res) => {
            if(res.data.flagSuccess === true)
            {
                setTwitterData(res.data.twitterData);
            }
            else{
                return;
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <StyledComponent ref={ref} mt={"100px"}>
            <StateStr01>The Hunt: Twitter Activity</StateStr01>
            <MarqueeBox01 mt={"10px"}>
                <Marquee speed={"50"} gradientColor={[0, 0, 0]} style={{ borderRadius: "20px", height: '100%' }}>
                    {twitterData !== null && twitterData !== undefined ?
                        twitterData?.map((each, index) => {
                            return (
                                <EachTwitterBox01>
                                    <TwitterHeadText01>
                                        {
                                            each.name
                                        }
                                    </TwitterHeadText01>
                                    <TwitterContentText01>
                                        {
                                            each.text
                                        }
                                    </TwitterContentText01>
                                    <TwitterUserNameText01>
                                        {
                                            each.username
                                        }
                                    </TwitterUserNameText01>
                                    <TwitterDateText01>
                                        {
                                            each.created_at
                                        }
                                    </TwitterDateText01>
                                </EachTwitterBox01>
                            )
                        })
                        : <>
                            <EachTwitterBox01><AiFillTwitterCircle fontSize={"4rem"} color={"#1da1f2"} /></EachTwitterBox01>
                            <EachTwitterBox01><AiFillTwitterCircle fontSize={"4rem"} color={"#1da1f2"} /></EachTwitterBox01>
                            <EachTwitterBox01><AiFillTwitterCircle fontSize={"4rem"} color={"#1da1f2"} /></EachTwitterBox01>
                            <EachTwitterBox01><AiFillTwitterCircle fontSize={"4rem"} color={"#1da1f2"} /></EachTwitterBox01>
                            <EachTwitterBox01><AiFillTwitterCircle fontSize={"4rem"} color={"#1da1f2"} /></EachTwitterBox01>
                            <EachTwitterBox01><AiFillTwitterCircle fontSize={"4rem"} color={"#1da1f2"} /></EachTwitterBox01>
                        </>}

                </Marquee>
            </MarqueeBox01>
            <TwitterArticleBox01 mt={"100px"} mb={"100px"}>
                <NewArticleBox01>
                    <StateStr01>{"The Hunt: News & Articles"}</StateStr01>
                    <CarouselBox01 mt={"20px"}>
                        <CarouselProvider
                            naturalSlideWidth={1000}
                            naturalSlideHeight={450}
                            totalSlides={3}
                            infinite={true}
                            style={{
                                width: '70%',
                                height: '80%'
                            }}
                        >
                            <Slider style={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <Slide index={0}>
                                    <SlideBox01>
                                        <HeadText01>
                                            The Hunt Token — Week One
                                        </HeadText01>
                                        <ContentText01 mt={"20px"}>
                                            Welcome to The Hunt Token’s Medium!
                                            The Hunt Token is a decentralized currency — developed in response to recent rugpulls, contract exploits and fee scams. Our token seeks to buck the recent trend of developers robbing investors by providing a solid product and working with a defined goal in mind. $HUNT will be utilized through our DAO — with as much transparency as possible, our team seeks to create a community space where $HUNT holders have influence on the direction of new developments. In conjunction with the development of our DAO — we will be launching a P2E Idle game where community members with modest access to capital will be able to grow their investment and earn...
                                        </ContentText01>
                                        <ViewArticle01 mt={"20px"}>
                                            <CustomBtn02>View Article</CustomBtn02>

                                        </ViewArticle01>
                                    </SlideBox01>
                                </Slide>
                                <Slide index={1}>
                                    <SlideBox01>
                                        <HeadText01>
                                            The Hunt Token — Week Two
                                        </HeadText01>
                                        <ContentText01 mt={"20px"}>
                                            Welcome to The Hunt Token’s Medium!
                                            The Hunt Token is a decentralized currency — developed in response to recent rugpulls, contract exploits and fee scams. Our token seeks to buck the recent trend of developers robbing investors by providing a solid product and working with a defined goal in mind. $HUNT will be utilized through our DAO — with as much transparency as possible, our team seeks to create a community space where $HUNT holders have influence on the direction of new developments. In conjunction with the development of our DAO — we will be launching a P2E Idle game where community members with modest access to capital will be able to grow their investment and earn...
                                        </ContentText01>
                                        <ViewArticle01 mt={"20px"}>
                                            <CustomBtn02>View Article</CustomBtn02>

                                        </ViewArticle01>
                                    </SlideBox01>
                                </Slide>
                                <Slide index={0}>
                                    <SlideBox01>
                                        <HeadText01>
                                            The Hunt Token — Week Three
                                        </HeadText01>
                                        <ContentText01 mt={"20px"}>
                                            Welcome to The Hunt Token’s Medium!
                                            The Hunt Token is a decentralized currency — developed in response to recent rugpulls, contract exploits and fee scams. Our token seeks to buck the recent trend of developers robbing investors by providing a solid product and working with a defined goal in mind. $HUNT will be utilized through our DAO — with as much transparency as possible, our team seeks to create a community space where $HUNT holders have influence on the direction of new developments. In conjunction with the development of our DAO — we will be launching a P2E Idle game where community members with modest access to capital will be able to grow their investment and earn...
                                        </ContentText01>
                                        <ViewArticle01 mt={"20px"}>
                                            <CustomBtn02>View Article</CustomBtn02>

                                        </ViewArticle01>
                                    </SlideBox01>
                                </Slide>
                            </Slider>
                            <DotGroup />
                            <ButtonBack01>
                                <ButtonBack>
                                    <MdKeyboardArrowLeft color={"white"} fontSize={"4rem"} />
                                </ButtonBack>
                            </ButtonBack01>
                            <ButtonNext01>
                                <ButtonNext>
                                    <MdKeyboardArrowRight color={"white"} fontSize={"4rem"} />
                                </ButtonNext>
                            </ButtonNext01>
                        </CarouselProvider>
                    </CarouselBox01>
                </NewArticleBox01>
                <DaoPollsBox01>
                    <StateStr01>The Hunt: DAO Polls</StateStr01>
                    <CarouselBox01 mt={"20px"}>
                        <CarouselProvider
                            naturalSlideWidth={1000}
                            naturalSlideHeight={450}
                            totalSlides={3}
                            infinite={true}
                            style={{
                                width: '70%',
                                height: '80%'
                            }}
                        >
                            <Slider style={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <Slide index={0}>
                                    <SlideBox01>
                                        <HeadText01>
                                            First Community Item Vote 1
                                        </HeadText01>
                                        <ContentText01 mt={"20px"}>
                                            Welcome to The Hunt Token’s Medium!
                                            The Hunt Token is a decentralized currency — developed in response to recent rugpulls, contract exploits and fee scams. Our token seeks to buck the recent trend of developers robbing investors by providing a solid product and working with a defined goal in mind. $HUNT will be utilized through our DAO — with as much transparency as possible, our team seeks to create a community space where $HUNT holders have influence on the direction of new developments. In conjunction with the development of our DAO — we will be launching a P2E Idle game where community members with modest access to capital will be able to grow their investment and earn...
                                        </ContentText01>
                                        <ViewArticle01 mt={"20px"}>
                                            <CustomBtn02>View Article</CustomBtn02>
                                        </ViewArticle01>
                                    </SlideBox01>
                                </Slide>
                                <Slide index={1}>
                                    <SlideBox01>
                                        <HeadText01>
                                            First Community Item Vote 2
                                        </HeadText01>
                                        <ContentText01 mt={"20px"}>
                                            Welcome to The Hunt Token’s Medium!
                                            The Hunt Token is a decentralized currency — developed in response to recent rugpulls, contract exploits and fee scams. Our token seeks to buck the recent trend of developers robbing investors by providing a solid product and working with a defined goal in mind. $HUNT will be utilized through our DAO — with as much transparency as possible, our team seeks to create a community space where $HUNT holders have influence on the direction of new developments. In conjunction with the development of our DAO — we will be launching a P2E Idle game where community members with modest access to capital will be able to grow their investment and earn...
                                        </ContentText01>
                                        <ViewArticle01 mt={"20px"}>
                                            <CustomBtn02>View Article</CustomBtn02>
                                        </ViewArticle01>
                                    </SlideBox01>
                                </Slide>
                                <Slide index={0}>
                                    <SlideBox01>
                                        <HeadText01>
                                            First Community Item Vote 3
                                        </HeadText01>
                                        <ContentText01 mt={"20px"}>
                                            Welcome to The Hunt Token’s Medium!
                                            The Hunt Token is a decentralized currency — developed in response to recent rugpulls, contract exploits and fee scams. Our token seeks to buck the recent trend of developers robbing investors by providing a solid product and working with a defined goal in mind. $HUNT will be utilized through our DAO — with as much transparency as possible, our team seeks to create a community space where $HUNT holders have influence on the direction of new developments. In conjunction with the development of our DAO — we will be launching a P2E Idle game where community members with modest access to capital will be able to grow their investment and earn...
                                        </ContentText01>
                                        <ViewArticle01 mt={"20px"}>
                                            <CustomBtn02>View Article</CustomBtn02>
                                        </ViewArticle01>
                                    </SlideBox01>
                                </Slide>
                            </Slider>
                            <DotGroup />
                            <ButtonBack01>
                                <ButtonBack>
                                    <MdKeyboardArrowLeft color={"white"} fontSize={"4rem"} />
                                </ButtonBack>
                            </ButtonBack01>
                            <ButtonNext01>
                                <ButtonNext>
                                    <MdKeyboardArrowRight color={"white"} fontSize={"4rem"} />
                                </ButtonNext>
                            </ButtonNext01>
                        </CarouselProvider>
                    </CarouselBox01>
                </DaoPollsBox01>
            </TwitterArticleBox01>
        </StyledComponent>
    )
})

const StyledComponent = styled(Box)`
    display: flex;
    width: 90%;
    flex-direction: column;
`
const StateStr01 = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: 'Changa One', Impact, sans-serif;
    font-size: 3rem;
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    text-align: center;
    color: #fff;

`
const MarqueeBox01 = styled(Box)`
    display: flex;
    width: 100%;
    height: 250px;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    align-items: center;
    box-shadow: 0 0 10px 0 #000;
`
const EachTwitterBox01 = styled(Box)`
    display: flex;
    width:400px;
    height: 230px;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 30px;
    padding:20px;
    box-sizing: border-box;
    font-family: 'Changa One', Impact, sans-serif;
    text-align: center;
    color: black;
    flex-direction: column;
`
const TwitterHeadText01 = styled(Box)`
    display:flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
`
const TwitterContentText01 = styled(Box)`
    display: flex;
    flex: 5;
    width: 100%;
    justify-content: center;
    font-size: 1rem;
`
const TwitterUserNameText01 = styled(Box)`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 500;
`
const TwitterDateText01 = styled(Box)`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: flex-end;
    font-size: 0.8rem;
`
// const EachTwitterBox02 = styled(Box)`
//     display: flex;
//     width:400px;
//     height: 230px;
//     justify-content: center;
//     align-items: center;

// `
const TwitterArticleBox01 = styled(Box)`
    display: flex;
    width: 100%;
`
const NewArticleBox01 = styled(Box)`
    display: flex;
    flex: 1;
    margin-right:20px;
    flex-direction: column;
    align-items: center;
`
const DaoPollsBox01 = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
`
const CarouselBox01 = styled(Box)`
    display: flex;
    position: relative;
    width: 100%;
    height: 450px;
    justify-content: center;
    align-items: center;
    background-image: url(${imgBackground02});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #000; 
    >div>div:nth-of-type(2){
        display: flex;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%); 
    }
    >div>div:nth-of-type(2)>button{
        width: 1rem;
        height: 1rem;
        background-color: rgba(255,255,255,1);
        border-radius: 100%;
        cursor: pointer;
        transition: background-color 100ms,color 100ms;
        border: none;
        margin-left: 3px;
        margin-right: 3px;
    }
    >div>div:nth-of-type(2)>button:disabled{
        width: 1rem;
        height: 1rem;
        background-color: rgba(255,255,255,0.4);
        border-radius: 100%;
        cursor: pointer;
        transition: background-color 100ms,color 100ms;
        border: none;
        margin-left: 3px;
        margin-right: 3px;
    }

`
const ButtonBack01 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: none;
    left: 20px;
    top: 50%;
    transform: translateY(-50%); 
    cursor: pointer;
    >button{
        background: none;
        border: none;
    }
`
const ButtonNext01 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%); 
    cursor: pointer;
    >button{
        background: none;
        border: none;
    }
`

const SlideBox01 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Changa One', Impact, sans-serif;
    font-size: 1rem;
    letter-spacing: 1px;
    text-shadow: 1px 1px 6px #000;
    color: #fff;
    flex-direction: column;
`
const HeadText01 = styled(Box)`
    display: flex;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 400;
`
const ContentText01 = styled(Box)`
    display: flex;
    text-align: center;
`
const ViewArticle01 = styled(Box)`
    display: flex;
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



export default Twitter;
