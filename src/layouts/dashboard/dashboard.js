import React, { useRef } from "react";
import { Box } from '@material-ui/core';
import styled from "styled-components";

import Navbar from "../navbar/navbar";
import Overview from "./overview";
// import Reward from "./reward";
// import Pool from "./pool";
// import Deposit from "./deposit";
import Twitter from "./twitter"
// import IMG_HUNTDAO_LOGO from "../../assets/image/HUNT_logo.png"
// import imgLogo01 from "../../assets/image/new_logo01.png";

const Dashboard = () => {
    // const { active } = useWeb3React();
    // const [flagStack, setFlagStack] = useState(false);
    // const [flagClaim, setFlagClaim] = useState(false);


    // const poolRef = useRef();
    const rewardRef = useRef();
    const twitterRef = useRef();

    // const [scrollPosition, setScrollPosition] = useState(0);
    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    // };


    return (
        <StyledComponent>
            <Navbar />
            <Overview twitterRef={twitterRef} rewardRef={rewardRef} />
            <Twitter ref={twitterRef} />
            {/* <Deposit ref={rewardRef} /> */}
            {/* <Pool ref={poolRef} /> */}
            {/* <Reward ref={rewardRef} /> */}

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

export default Dashboard;
