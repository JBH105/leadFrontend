export default function LeadsTable({ leads }) {
  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Email</th>
          <th className="border border-gray-300 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.email} className="text-center">
            <td className="border border-gray-300 p-2">{lead.name}</td>
            <td className="border border-gray-300 p-2">{lead.email}</td>
            <td className="border border-gray-300 p-2">{lead.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
