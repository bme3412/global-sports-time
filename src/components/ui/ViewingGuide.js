import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tv, Globe, DollarSign, AlertTriangle, Info, Users, MapPin, Clock, Trophy, Calendar } from 'lucide-react';

const ViewingGuide = ({ league, teams = [], location, viewingOptions, teamDetails = {} }) => {
  const options = viewingOptions[league]?.[location];

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
                {teams.map((teamName) => {
                  const team = teamDetails[teamName] || {};
                  return (
                    <div key={teamName} className="mb-4 p-3 bg-gray-100 rounded-lg">
                      <h4 className="text-md font-medium mb-2">{teamName}</h4>
                      <InfoSection
                        title="Home Arena"
                        icon={MapPin}
                        content={<p>{team.homeArena || 'N/A'}</p>}
                      />
                      <InfoSection
                        title="Key Players"
                        icon={Users}
                        content={
                          <ul className="list-disc pl-5">
                            {team.keyPlayers?.map((player, index) => (
                              <li key={index}>{player.name} - {player.position}</li>
                            )) || 'N/A'}
                          </ul>
                        }
                      />
                      <InfoSection
                        title="Recent Form"
                        icon={Clock}
                        content={<p>{team.recentForm || 'N/A'}</p>}
                      />
                      <InfoSection
                        title="Championships"
                        icon={Trophy}
                        content={<p>{team.championships || 'N/A'}</p>}
                      />
                      <InfoSection
                        title="Current Season"
                        icon={Calendar}
                        content={
                          <p>
                            Wins: {team.currentSeasonStats?.wins || 'N/A'}, 
                            Losses: {team.currentSeasonStats?.losses || 'N/A'}
                            {team.currentSeasonStats?.draws !== undefined && `, Draws: ${team.currentSeasonStats.draws}`}
                          </p>
                        }
                      />
                      <InfoSection
                        title="Team History"
                        icon={Info}
                        content={<p>{team.teamHistory || 'N/A'}</p>}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No team information available.</p>
            )}
          </div>

          {/* Viewing Info */}
          <div className="sm:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Viewing Information</h3>
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
            {options.additionalInfo && (
              <InfoSection
                title="Additional Information"
                icon={Info}
                content={<p>{options.additionalInfo}</p>}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewingGuide;