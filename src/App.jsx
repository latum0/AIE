import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountSettings from './pages/AccountSettings';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/%20accountSettings" element={<Navigate to="/account-settings" replace />} />
            </Routes>
        </Router>
    );
}

export default App;