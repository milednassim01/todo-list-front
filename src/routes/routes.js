import {Switch} from 'react-router-dom';
import {Home, Login, Register} from "../pages";
import {AuthRoute, PrivateRoute} from './RoutesMiddleware';
const Routes = () => {
    return (
        <Switch>
            <AuthRoute exact path="/login" component={Login}/>
            <AuthRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/" component={Home}/>
        </Switch>
    );
};

export default Routes;
