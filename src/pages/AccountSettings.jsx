import React from 'react';
import '../App.css';

export default function AccountSettings() {
    return (
        <div className="account-container">
            <header className="account-header">
                <h1>SKILL Market</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="What service are you looking for today?"
                        className="search-input"
                    />
                </div>
                <nav className="account-nav">
                    <a href="#orders">Orders</a>
                    <button className="switch-button">Switch to Selling</button>
                    <div className="user-avatar">👤</div>
                </nav>
            </header>

            <div className="account-layout">
                <aside className="account-sidebar">
                    <h2 className="sidebar-title">Account</h2>
                    <ul className="sidebar-menu">
                        <li>Security</li>
                        <li>Notifications</li>
                        <li>Payment methods</li>
                        <li>Form W-9</li>
                    </ul>
                </aside>

                <main className="account-main">
                    <section className="account-info">
                        <h3 className="info-label">FULL NAME</h3>
                        <p className="info-value">Lipsum</p>

                        <h3 className="info-label">EMAIL</h3>
                        <p className="info-value">u*****@gmail.com</p>
                    </section>

                    <section className="account-deactivation">
                        <h3 className="deactivation-title">ACCOUNT DEACTIVATION</h3>
                        <p className="deactivation-subtitle">What happens when you deactivate your account?</p>

                        <ul className="deactivation-list">
                            <li>Your profile and Gigs won't be shown on Skill Market anymore.</li>
                            <li>Active orders will be canceled.</li>
                            <li>You won't be able to re-activate your Gigs.</li>
                        </ul>

                        <div className="deactivation-reason">
                            <label>I'm leaving because...</label>
                            <select className="reason-select">
                                <option>Choose a reason</option>
                                <option>Not satisfied</option>
                                <option>Found another platform</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <button className="deactivate-button">Deactivate Account</button>
                    </section>
                </main>
            </div>
        </div>
    );
}