import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tv, Globe, DollarSign, AlertTriangle } from 'lucide-react';

const ViewingGuide = ({ league, teams = [], location, viewingOptions }) => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const options = viewingOptions[league]?.[location];

  const toggleTeam = (team) => {
    setSelectedTeams(prevSelectedTeams =>
      prevSelectedTeams.includes(team)
        ? prevSelectedTeams.filter(t => t !== team)
        : [...prevSelectedTeams, team]
    );
  };

  const InfoSection = ({ title, content, icon: Icon }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Icon className="mr-2" />
        {title}
      </h3>
      <div className="pl-6">{content}</div>
    </div>
  );

  if (!options) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 text-yellow-500" />
            No Viewing Information Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>We don&apos;t have specific viewing information for {league?.toUpperCase() || 'this league'} in {location || 'this location'}.</p>
          <p className="mt-2">Suggestions:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Check the official league website for international viewing options.</li>
            <li>Look for sports streaming services available in your area.</li>
            <li>Consider using a VPN to access streaming services from other countries.</li>
          </ul>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Viewing Guide for {league?.toUpperCase() || 'League'} in {location || 'Location'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          {/* Team Info */}
          <div className="sm:w-1/2 mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Team Information</h3>
            {teams.length > 0 ? (
              <div>
                <h4 className="text-md font-medium mb-1">Select Teams:</h4>
                {teams.map((team) => (
                  <div key={team} className="flex items-center space-x-2 mb-1">
                    <Checkbox
                      id={team}
                      checked={selectedTeams.includes(team)}
                      onCheckedChange={() => toggleTeam(team)}
                    />
                    <label
                      htmlFor={team}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {team}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No teams available for selection.</p>
            )}
          </div>

          {/* Game Info */}
          <div className="sm:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Game Information</h3>
            <InfoSection
              title="Available Services"
              icon={Tv}
              content={
                <ul className="list-disc pl-5">
                  {options.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              }
            />
            <InfoSection
              title="Estimated Cost"
              icon={DollarSign}
              content={<p>{options.cost}</p>}
            />
            {options.restrictions && (
              <InfoSection
                title="Restrictions"
                icon={Globe}
                content={<p>{options.restrictions}</p>}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewingGuide;