import React from 'react';
import {AuthCard} from "../../components";
import Home from '../../assets/lottie/home.json'
import RegisterComponents from "./RegisterComponents";

const Index = () => {
    return (
        <>
            <AuthCard lottieFile={Home} authComponent={<RegisterComponents/>}/>
        </>
    )
}

export default Index;