import React from 'react';
import {AuthCard} from "../../components";
import Home from '../../assets/lottie/task-list.json'
import LoginComponents from "./LoginComponents";

const Index = () => {
    return (
        <>
            <AuthCard lottieFile={Home} authComponent={<LoginComponents/>}/>
        </>
    )
}

export default Index;