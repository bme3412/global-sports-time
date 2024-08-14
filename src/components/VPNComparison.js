'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const VPNComparison = ({ vpns }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">VPN Service</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Number of Servers</TableHead>
            <TableHead>Max Devices</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vpns.map((vpn) => (
            <TableRow key={vpn.name}>
              <TableCell className="font-medium">{vpn.name}</TableCell>
              <TableCell>${vpn.price}/mo</TableCell>
              <TableCell>{vpn.servers.toLocaleString()}</TableCell>
              <TableCell>{vpn.maxDevices}</TableCell>
              <TableCell className="text-right">
                <Button 
                  onClick={() => window.open(vpn.affiliateLink, '_blank')}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Get Deal
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VPNComparison;