"use client";

import { useState, useEffect } from "react";
import LeadForm from "../components/LeadForm";
import LeadsTable from "../components/LeadsTable";
import { fetchLeads } from "../services/api";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchLeads();
    setLeads(data);
    setLoading(false);
  };

  const handleAddNewLead = () => {
    setShowForm(true);
  };

  const handleBackToList = () => {
    setShowForm(false);
  };

  return (
    <div className=" mx-auto w-1/2 bg-white mt-4  shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      {showForm ? (
        <LeadForm onLeadAdded={loadLeads} onBack={handleBackToList} />
      ) : (
        <>
          <div className="flex justify-between items-center bg-green-600 text-white py-2 px-4 rounded-lg mb-2 mt-4">
            <h1 className="text-xl font-bold">Leads List</h1>
            <button 
              onClick={handleAddNewLead} 
              className="text-white font-bold transition  cursor-pointer"
            >
              + Add Lead
            </button>
          </div>
          {loading ? <p>Loading...</p> : <LeadsTable leads={leads} />}
        </>
      )}
    </div>
  );
}

