import React from 'react';
import DisplayLottie from "../DisplayLottie";

const Index = ({lottieFile, authComponent}) => {
    return (
        <div className="container">
            <div className="lottie">
                <DisplayLottie animationData={lottieFile}/>
            </div>
            {authComponent}
        </div>
    )
}

export default Index;