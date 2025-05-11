import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import des composants clients
import Home from './pages/Home';
import FormulaireProjet from './pages/FormulaireProjet';
import AddTimelineAndBudget from './pages/AddTimelineAndBudget';
import Gig from './pages/Gig';
import Login from './pages/Login';


// Import des composants freelancer
import Dashboard from './Freelancer/src/pages/Dashboard';
import ServicesList from './Freelancer/src/pages/ServicesList';
import ServiceForm from './Freelancer/src/pages/ServiceForm';
import OrderRequests from './Freelancer/src/pages/OrderRequests';

// Import des composants UI
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Sidebar from './Freelancer/src/components/navigation/Sidebar';
import MobileNavigation from './Freelancer/src/components/navigation/MobileNavigation';
import FreelancerHeader from './Freelancer/src/components/common/Header';

// Import des providers
import { ServicesProvider } from './Freelancer/src/context/ServicesContext';
import { OrdersProvider } from './Freelancer/src/context/OrdersContext';

// Import des styles
import './App.css';
import './Freelancer/src/pages/Dashboard.css';

import Signup from './pages/Signup';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Layout pour la partie freelancer
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
                <Route path="services" element={<ServicesList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/edit/:id" element={<ServiceForm />} />
                <Route path="orders" element={<OrderRequests />} />
                <Route path="*" element={<Navigate to="/freelancer" />} />
              </Routes>
            </div>
          </div>
          <MobileNavigation />
        </div>
      </OrdersProvider>
    </ServicesProvider>
  );

  // Layout pour la partie client
  const ClientLayout = () => (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Routes>
  <Route index element={<Home />} />
  <Route path="home" element={<Home />} />
  <Route path="formulaire-projet" element={<FormulaireProjet />} />
  <Route path="add-timeline" element={<AddTimelineAndBudget />} />
  <Route path="gig" element={<Gig />} />
  <Route path="login" element={<Login />} />
  <Route path="signup" element={<Signup />} />
</Routes>

      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Routes Client - accessible via /* */}
        <Route path="/*" element={<ClientLayout />} />

        {/* Routes Freelancer - accessible via /freelancer/* */}
        <Route path="/freelancer/*" element={<FreelancerLayout />} />

        {/* Redirection par défaut vers /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
