// TeamInfo.js
import React from "react";
import { MapPin, Clock } from "lucide-react";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg shadow-sm">
    <div className={`p-2 rounded-full ${label.includes("Location") ? "bg-blue-100" : "bg-green-100"}`}>
      <Icon className={`w-5 h-5 ${label.includes("Location") ? "text-blue-600" : "text-green-600"}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const TeamInfo = ({ getTeamLocation, getTeamTimezone }) => {
  const location = getTeamLocation();
  const timezone = getTeamTimezone();

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Team Information</h2>
      {location && <InfoItem icon={MapPin} label="Team Location" value={location} />}
      {timezone && <InfoItem icon={Clock} label="Team Timezone" value={timezone} />}
      {!location && !timezone && (
        <p className="text-gray-500 italic">No team selected</p>
      )}
    </div>
  );
};

export default TeamInfo;