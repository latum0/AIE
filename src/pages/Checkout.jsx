import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, RefreshCw, Check } from "lucide-react";
import "./checkout.css";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gigData, setGigData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Non authentifié");

        const response = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Non authentifié");
        }

        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error("❌ Auth Error:", error);
        navigate("/login");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (!id || !currentUser) return;

    const fetchGig = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/gigs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch gig");

        const gig = await response.json();
        setGigData(gig);
      } catch (error) {
        console.error("❌ Error fetching gig:", error);
      }
    };

    fetchGig();
  }, [id, currentUser]);

  // 🔹 Handle Order Creation Separately
  const handleCreateOrder = async () => {
    try {
      if (!currentUser) throw new Error("Utilisateur non connecté");
      if (!gigData) throw new Error("Gig data not loaded");

      const selectedPackage = gigData.packages[selectedTab]; 

      const orderResponse = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gigId: id,
          buyerId: currentUser._id,
          sellerId: gigData.userId,
          price: parseInt(selectedPackage.price),
          status: "pending",
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || "Order creation failed");
      }

      const orderData = await orderResponse.json();
      console.log("✅ Order Created:", orderData);

      return orderData; // 🔥 Return the order data so it can be used in invoice
    } catch (err) {
      setError(err.message);
      console.error("❌ Erreur de commande :", err);
      throw err;
    }
  };

  // 🔹 Handle Invoice Creation Separately (Matches Invoice Schema)
  const handleCreateInvoice = async (orderData) => {
    try {
    const invoiceResponse = await fetch("http://localhost:5000/api/invoices/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: orderData._id,
      }),
    });

      if (!invoiceResponse.ok) {
        const errorData = await invoiceResponse.text(); 
        console.log("📝 Raw Invoice API response:", errorData);
        throw new Error(`❌ Invoice API Error: ${errorData}`);
      }

      console.log("✅ Invoice Created");
      navigate("/orders?success=true");
    } catch (err) {
      setError(err.message);
      console.error("❌ Erreur lors de la création de la facture :", err);
    }
  };

  // 🔹 Combined Click Handler for Order & Invoice
  const handleOrderAndInvoice = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderData = await handleCreateOrder();
      await handleCreateInvoice(orderData);
    } catch (error) {
      console.error("❌ Error processing order and invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!gigData || !currentUser) return <div>Chargement...</div>;

  const selectedPackage = gigData.packages[selectedTab];

  return (
    <div className="checkout">
      <main className="checkout__main">
        <div className="container">
          <div className="checkout__grid">
            {/* Gig Details */}
            <div className="checkout__gig-details">
              <h1 className="checkout__title">{gigData.title}</h1>

              <div className="checkout__package-card">
                <div className="checkout__tabs">
                  {["basic", "standard", "premium"].map((pkg) => (
                    <button
                      key={pkg}
                      className={`checkout__tab ${selectedTab === pkg ? "active" : ""}`}
                      onClick={() => setSelectedTab(pkg)}
                    >
                      {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="checkout__package-content">
                  <div className="checkout__package-header">
                    <h2 className="checkout__package-name">{selectedPackage.name || "No Package Name"}</h2>
                    <div className="checkout__package-price">{selectedPackage.price || 0} €</div>
                  </div>

                  <div className="checkout__delivery-info">
                    <div className="checkout__delivery-time">
                      <Clock size={16} />
                      <span>{selectedPackage.deliveryDays || 3} jours</span>
                    </div>
                    <div className="checkout__revision-count">
                      <RefreshCw size={16} />
                      <span>{selectedPackage.revisions || 1} Révision</span>
                    </div>
                  </div>

                  <ul className="checkout__features">
                    {selectedPackage.includedServices.map((service, index) => (
                      <li key={index} className="checkout__feature-item">
                        <Check size={14} className="included" />
                        <span className="checkout__feature-text">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="checkout__summary">
              <h2>Résumé de la commande</h2>

              <div className="checkout__totals">
                <div className="checkout__total-row checkout__grand-total">
                  <span>Total à payer:</span>
                  <span>{selectedPackage.price} €</span>
                </div>
              </div>

              <button 
                className="checkout__order-btn" 
                onClick={handleOrderAndInvoice}
                disabled={loading}
              >
                {loading ? "Traitement..." : "Passer la commande"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
