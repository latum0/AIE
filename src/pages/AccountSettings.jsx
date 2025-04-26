import React from "react";
import "./AccountSettings.css";

const AccountSettings = () => {
    return (
        <div className="settings-layout">


            <ul className="menu">
                <li className="active">Account</li>
                <li>Security</li>
                <li>Notifications</li>
                <li>Payment methods</li>
                <li>Form W-9</li>
            </ul>


            <div className="account-settings-container">
                <div className="settings-card">
                    <h2 className="section-title">Account</h2>

                    <div className="form-section">
                        <label>FULL NAME</label>
                        <input type="text" placeholder="Lipsum" />
                    </div>

                    <div className="form-section">
                        <label>EMAIL</label>
                        <input type="email" placeholder="u*****@gmail.com" />
                    </div>

                    <button className="save-btn">Save changes</button>

                    <hr className="divider" />

                    <div className="deactivate-section">
                        <div className="deactivation-info">
                            <h3>ACCOUNT DEACTIVATION</h3>
                            <p>What happens when you deactivate your account?</p>
                            <ul>
                                <li>Your profile and Gigs won’t be shown on Skill Market anymore.</li>
                                <li>Active orders will be cancelled.</li>
                                <li>You won’t be able to re-activate your Gigs.</li>
                            </ul>
                        </div>

                        <div className="deactivation-form">
                            <label>I'm leaving because…</label>
                            <select>
                                <option>Choose a reason</option>
                                <option>Found a better platform</option>
                                <option>Temporary break</option>
                                <option>Other</option>
                            </select>

                            <button className="deactivate-btn">Deactivate Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AccountSettings;
