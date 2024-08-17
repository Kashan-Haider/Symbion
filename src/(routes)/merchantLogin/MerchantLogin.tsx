import { crowdFunding_abi, crowdFunding_address } from "../../lib/abi";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { ethers } from 'ethers';

const CrowdfundingManager = () => {
    const [merchants, setMerchants] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(crowdFunding_address, crowdFunding_abi, signer);

    const addMerchant = async () => {
        try {
            setLoading(true);
            const tx = await contract.addMerchant();
            await tx.wait();
            alert('Merchant added successfully!');
        } catch (error) {
            console.error('Error adding merchant:', error);
            alert('Failed to add merchant.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllMerchants = async () => {
        try {
            setLoading(true);
            const merchantsData = await contract.getAllMerchants();
            const merchantList = [];

            for (let i = 0; i < merchantsData[0].length; i++) {
                merchantList.push({
                    merchantId: merchantsData[0][i].toString(),
                    merchantWallet: merchantsData[1][i],
                    reputationPoints: merchantsData[2][i].toString(),
                    successfulProjects: merchantsData[3][i].toString(),
                    failedProjects: merchantsData[4][i].toString(),
                    totalInvestments: merchantsData[5][i].toString(),
                    isActive: merchantsData[6][i],
                });
            }

            setMerchants(merchantList);
        } catch (error) {
            console.error('Error fetching merchants:', error);
            alert('Failed to fetch merchants.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ color: 'white' }}>
            <h2>Crowdfunding Manager</h2>
            <button onClick={addMerchant} disabled={loading}>
                {loading ? 'Processing...' : 'Add Merchant'}
            </button><br></br>
            <button onClick={fetchAllMerchants} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch All Merchants'}
            </button>
            <div>
                <h3>Merchants List:</h3>
                {merchants.length > 0 ? (
                    <ul>
                        {merchants.map((merchant, index) => (
                            <li key={index}>
                                <p>Merchant ID: {merchant.merchantId}</p>
                                <p>Wallet: {merchant.merchantWallet}</p>
                                <p>Reputation Points: {merchant.reputationPoints}</p>
                                <p>Successful Projects: {merchant.successfulProjects}</p>
                                <p>Failed Projects: {merchant.failedProjects}</p>
                                <p>Total Investments: {merchant.totalInvestments}</p>
                                <p>Is Active: {merchant.isActive ? 'Yes' : 'No'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No merchants found.</p>
                )}
            </div>
        </div>
    );
};

export default CrowdfundingManager;
