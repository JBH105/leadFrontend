const API_URL =`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/leads`;

export const fetchLeads = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch leads");
    return await res.json();
  } catch (error) {
    console.error("Error fetching leads", error);
    return [];
  }
};

export const addLead = async (form) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Failed to add lead");
    return res.json();
  } catch (error) {
    console.error("Error adding lead", error);
    throw error;
  }
};
