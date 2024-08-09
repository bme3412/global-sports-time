import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tv, Globe, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const ViewingGuide = ({ league, team1, team2, location, viewingOptions }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const options = viewingOptions[league]?.[location];

  if (!options) {
    return <p>No viewing information available for this combination.</p>;
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const Section = ({ title, content, icon: Icon }) => (
    <div className="mb-2">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => toggleSection(title)}
      >
        <span className="flex items-center">
          <Icon className="mr-2" />
          {title}
        </span>
        {expandedSection === title ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {expandedSection === title && (
        <Card className="mt-2">
          <CardContent className="pt-4">{content}</CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Viewing Guide for {team1} vs {team2} in {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <Section
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
        <Section
          title="Estimated Cost"
          icon={DollarSign}
          content={<p>{options.cost}</p>}
        />
        <Section
          title="Restrictions"
          icon={Globe}
          content={<p>{options.restrictions}</p>}
        />
      </CardContent>
    </Card>
  );
};

export default ViewingGuide;