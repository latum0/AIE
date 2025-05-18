"use client";
import { useContext, useState, useEffect } from "react";
import { ServicesContext } from "../context/ServicesContext";
import { useParams } from "react-router-dom";
import { RefreshCw, Info } from "lucide-react";
import "./OrderRequests.css";

const OrderRequests = () => {
  const { services } = useContext(ServicesContext);
  const { userId } = useParams();
  const [orders, setOrders] = useState([]); // local orders state fetched from backend
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  // Fetch orders for gigs owned by the freelancer
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/orders/freelancer/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Échec du chargement des commandes. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  // Local function to update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating order status");
      }
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
      if (
        selectedOrder &&
        (selectedOrder.id === orderId || selectedOrder._id === orderId)
      ) {
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut de la commande:", err);
    }
  };

  // Filter orders by status
  const filteredOrders = orders.filter((order) =>
    filterStatus === "all" || order.status === filterStatus
  );

  // Get service title via the ServicesContext (check both _id and id)
  const getServiceTitle = (serviceId) => {
    const service = services.find(
      (s) => s._id === serviceId || s.id === serviceId
    );
    return service ? service.title : "Service Inconnu";
  };

  // Set an order to be displayed in the modal
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Close the order details modal
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Return a badge class based on order status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "accepted":
        return "info";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "info";
    }
  };

  // Format a date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="orders-loading">
        <RefreshCw className="loading-icon" />
        <p>Chargement des commandes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-error">
        <Info size={48} className="error-icon" />
        <h3>Un problème est survenu</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="filters-row">
        <div className="status-filters">
          <button
            className={`btn ${filterStatus === "all" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilterStatus("all")}
          >
            Tout
          </button>
          <button
            className={`btn ${filterStatus === "pending" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilterStatus("pending")}
          >
            En Attente
          </button>
          <button
            className={`btn ${filterStatus === "accepted" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilterStatus("accepted")}
          >
            Accepté
          </button>
          <button
            className={`btn ${filterStatus === "in-progress" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilterStatus("in-progress")}
          >
            En Cours
          </button>
          <button
            className={`btn ${filterStatus === "completed" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilterStatus("completed")}
          >
            Complété
          </button>
          <button
            className={`btn ${filterStatus === "cancelled" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilterStatus("cancelled")}
          >
            Annulé
          </button>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id || order._id}
                  className={`order-row ${order.status}`}
                >
                  <td className="client-cell">
                    <div className="client-name">{order.clientName}</div>
                    <div className="client-email">{order.clientEmail}</div>
                  </td>
                  <td>{getServiceTitle(order.serviceId)}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <span className={`badge badge-${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="order-actions">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => viewOrderDetails(order)}
                      >
                        Voir
                      </button>
                      {order.status === "pending" && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            handleStatusUpdate(
                              order.id || order._id,
                              "accepted"
                            )
                          }
                        >
                          Accepter
                        </button>
                      )}
                      {order.status === "accepted" && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            handleStatusUpdate(
                              order.id || order._id,
                              "in-progress"
                            )
                          }
                        >
                          Commencer
                        </button>
                      )}
                      {order.status === "in-progress" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            handleStatusUpdate(
                              order.id || order._id,
                              "completed"
                            )
                          }
                        >
                          Compléter
                        </button>
                      )}
                      {(order.status === "pending" ||
                        order.status === "accepted") && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleStatusUpdate(
                              order.id || order._id,
                              "cancelled"
                            )
                          }
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-orders">
          <p>Aucune commande trouvée avec le filtre sélectionné.</p>
        </div>
      )}

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="order-modal-backdrop" onClick={closeOrderDetails}>
          <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3>Détails de la commande</h3>
              <button className="close-modal" onClick={closeOrderDetails}>
                ×
              </button>
            </div>
            <div className="order-modal-body">
              <div className="order-detail-row">
                <div className="order-detail-label">Service:</div>
                <div className="order-detail-value">
                  {getServiceTitle(selectedOrder.serviceId)}
                </div>
              </div>
              <div className="order-detail-row">
                <div className="order-detail-label">Client:</div>
                <div className="order-detail-value">{selectedOrder.clientName}</div>
              </div>
              <div className="order-detail-row">
                <div className="order-detail-label">Email:</div>
                <div className="order-detail-value">{selectedOrder.clientEmail}</div>
              </div>
              <div className="order-detail-row">
                <div className="order-detail-label">Date:</div>
                <div className="order-detail-value">
                  {formatDate(selectedOrder.createdAt)}
                </div>
              </div>
              <div className="order-detail-row">
                <div className="order-detail-label">Statut:</div>
                <div className="order-detail-value">
                  <span className={`badge badge-${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              {selectedOrder.message && (
                <div className="order-message">
                  <div className="order-detail-label">Message:</div>
                  <div className="message-content">{selectedOrder.message}</div>
                </div>
              )}
            </div>
            <div className="order-modal-footer">
              {selectedOrder.status === "pending" && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedOrder.id || selectedOrder._id,
                        "accepted"
                      )
                    }
                  >
                    Accepter la demande
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedOrder.id || selectedOrder._id,
                        "cancelled"
                      )
                    }
                  >
                    Refuser
                  </button>
                </>
              )}
              {selectedOrder.status === "accepted" && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleStatusUpdate(
                      selectedOrder.id || selectedOrder._id,
                      "in-progress"
                    )
                  }
                >
                  Commencer le travail
                </button>
              )}
              {selectedOrder.status === "in-progress" && (
                <button
                  className="btn btn-success"
                  onClick={() =>
                    handleStatusUpdate(
                      selectedOrder.id || selectedOrder._id,
                      "completed"
                    )
                  }
                >
                  Marquer comme complété
                </button>
              )}
              <button className="btn btn-outline" onClick={closeOrderDetails}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
