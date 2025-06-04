import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import OverviewPanel from './panels/OverviewPanel';
import CrimePanel from './panels/CrimePanel';
import TrafficPanel from './panels/TrafficPanel';
import LocationPanel from './panels/LocationPanel';
import { Shield, LayoutDashboard, Car, MapPin } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 text-white px-6 py-4 shadow-lg border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Command Center Polisi
                </h1>
                <p className="text-sm text-slate-300">
                  Kota Yogyakarta - Real Time Dashboard
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-white">
              {new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <Card className="p-4 bg-slate-800 shadow-sm border-slate-700">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700">
              <TabsTrigger
                value="overview"
                className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="crime"
                className="flex items-center space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white text-slate-300"
              >
                <Shield className="h-4 w-4" />
                <span>Kejahatan</span>
              </TabsTrigger>
              <TabsTrigger
                value="traffic"
                className="flex items-center space-x-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-300"
              >
                <Car className="h-4 w-4" />
                <span>Kecelakaan & Lalu Lintas</span>
              </TabsTrigger>
              <TabsTrigger
                value="location"
                className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white text-slate-300"
              >
                <MapPin className="h-4 w-4" />
                <span>Analisis Lokasi</span>
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="overview">
            <OverviewPanel />
          </TabsContent>

          <TabsContent value="crime">
            <CrimePanel />
          </TabsContent>

          <TabsContent value="traffic">
            <TrafficPanel />
          </TabsContent>

          <TabsContent value="location">
            <LocationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
