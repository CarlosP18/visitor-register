import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomeScreen } from '../components/screens/HomeScreen';
import { RegisterForm } from '../components/screens/RegisterForm';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={HomeScreen} />
                    <Route path='/registro' component={RegisterForm} />
                </Switch>
            </div>
        </Router>
    );
};
