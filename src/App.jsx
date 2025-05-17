import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Client pages
import Home from './pages/Home';
import Gig from './pages/Gig';
import AccountSettings from './pages/AccountSettings';
import OrderExtras from './pages/OrderExtras';
import ConfirmP from './pages/ConfirmP';
import Chat from './pages/Chat';
import FreelancerProfile from './pages/FreelancerProfile';
import ConversationPage from './pages/ConversationPage';
import FormulaireProjet from './pages/FormulaireProjet';
import AddTimelineAndBudget from './pages/AddTimelineAndBudget';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Gigspage from './pages/Gigspage';
import Histor from './pages/Histor';
import Checkout from './pages/Checkout';

// Freelancer pages
import Dashboard from './Freelancer/src/pages/Dashboard';
import ServicesList from './Freelancer/src/pages/ServicesList';
import ServiceForm from './Freelancer/src/pages/ServiceForm';
import OrderRequests from './Freelancer/src/pages/OrderRequests';
import FreelancerShowcase from './Freelancer/src/pages/FreelancerShowcase';

// UI components
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
// Freelancer UI components
import Sidebar from './Freelancer/src/components/navigation/Sidebar';
import MobileNavigation from './Freelancer/src/components/navigation/MobileNavigation';
import FreelancerHeader from './Freelancer/src/components/common/Header';

// Providers
import { ServicesProvider } from './Freelancer/src/context/ServicesContext';
import { OrdersProvider } from './Freelancer/src/context/OrdersContext';

// Styles
import './App.css';
import './Freelancer/src/pages/Dashboard.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Client layout: includes Header, Footer, and client routes.
  const ClientLayout = () => (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gig" element={<Gig />} />
        <Route path="/gig/:id" element={<Gig />} />
        <Route path="/gigs/:id" element={<Gig />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/orderExtras" element={<OrderExtras />} />
        <Route path="/confirmP" element={<ConfirmP />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/freelancerProfile/:id" element={<FreelancerProfile />} />
        <Route path="/conversation" element={<ConversationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/formulaire-projet" element={<FormulaireProjet />} />
        <Route path="/add-timeline" element={<AddTimelineAndBudget />} />
        <Route path="/FreelancerShowcase" element={<FreelancerShowcase />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Histor" element={<Histor />} />
        <Route path="/Gigspage" element={<Gigspage />} />
      </Routes>
      <Footer />
    </>
  );

  // Freelancer layout: includes sidebar, header, and freelancer routes.
  const FreelancerLayout = () => (
    <ServicesProvider>
      <OrdersProvider>
        <div className="app">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <FreelancerHeader toggleSidebar={toggleSidebar} />
            <div className="page-container">
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="services" element={<ServicesList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/edit/:id" element={<ServiceForm />} />
                <Route path="orders" element={<OrderRequests />} />
              </Routes>
            </div>
          </div>
          <MobileNavigation />
        </div>
      </OrdersProvider>
    </ServicesProvider>
  );

  return (
    <Router>
      <Routes>
        {/* Freelancer routes */}
        <Route path="/freelancer/*" element={<FreelancerLayout />} />
        {/* All other routes use the client layout */}
        <Route path="/*" element={<ClientLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
