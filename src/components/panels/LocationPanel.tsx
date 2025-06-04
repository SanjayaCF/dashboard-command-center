import React from 'react';
import { Card } from '@/components/ui/card';
import { useExcelData } from '../../hooks/useExcelData';
import { fullCrimeData } from '../../data/crimeData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LocationPanel: React.FC = () => {
  const { data: excelData } = useExcelData();
  const currentData = excelData.length > 0 ? excelData : fullCrimeData;

  // District analysis
  const districtData = [...new Set(currentData.map(item => item.Kecamatan))]
    .map(district => {
      const districtIncidents = currentData.filter(item => item.Kecamatan === district);
      const avgResponse = districtIncidents.length > 0 
        ? Math.round(districtIncidents.reduce((sum, item) => sum + item.Durasi_Respons, 0) / districtIncidents.length)
        : 0;
      const totalVictims = districtIncidents.reduce((sum, item) => sum + item.Korban, 0);
      
      return {
        district,
        count: districtIncidents.length,
        avgResponse,
        totalVictims
      };
    })
    .sort((a, b) => b.count - a.count);

  // Crime type distribution by top districts
  const topDistricts = districtData.slice(0, 5);
  const crimeTypeByDistrict = topDistricts.map(district => {
    const districtIncidents = currentData.filter(item => item.Kecamatan === district.district);
    const crimeTypes = districtIncidents.reduce((acc, item) => {
      acc[item.Jenis_Kejadian] = (acc[item.Jenis_Kejadian] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCrime = Object.entries(crimeTypes).sort((a, b) => b[1] - a[1])[0];
    
    return {
      district: district.district,
      topCrime: topCrime ? topCrime[0] : 'N/A',
      topCrimeCount: topCrime ? topCrime[1] : 0,
      totalIncidents: district.count
    };
  });

  // Response time heatmap data
  const responseTimeRanges = [
    { range: '0-30 min', min: 0, max: 30 },
    { range: '31-60 min', min: 31, max: 60 },
    { range: '61-90 min', min: 61, max: 90 },
    { range: '91+ min', min: 91, max: 999 }
  ];

  const responseDistribution = responseTimeRanges.map(range => ({
    range: range.range,
    count: currentData.filter(item => 
      item.Durasi_Respons >= range.min && item.Durasi_Respons <= range.max
    ).length
  }));

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Location Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Total Kecamatan</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">{districtData.length}</p>
          <p className="text-sm text-slate-400 mt-1">Area cakupan</p>
        </Card>
        
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Hotspot Teratas</h3>
          <p className="text-3xl font-bold text-red-400 mt-2">{districtData[0]?.district || 'N/A'}</p>
          <p className="text-sm text-slate-400 mt-1">{districtData[0]?.count || 0} insiden</p>
        </Card>
        
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Respons Tercepat</h3>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {Math.min(...districtData.map(d => d.avgResponse))} min
          </p>
          <p className="text-sm text-slate-400 mt-1">Rata-rata minimum</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Incident Count */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Insiden per Kecamatan</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={districtData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="district" 
                angle={-45} 
                textAnchor="end" 
                height={100} 
                stroke="#94A3B8"
              />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
              />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Response Time Distribution */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Distribusi Waktu Respons</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={responseDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, count }) => `${range}: ${count}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {responseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E293B', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Response Time by District */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Rata-rata Waktu Respons per Kecamatan</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={districtData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis 
              dataKey="district" 
              angle={-45} 
              textAnchor="end" 
              height={100} 
              stroke="#94A3B8"
            />
            <YAxis stroke="#94A3B8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E293B', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#F1F5F9'
              }}
            />
            <Bar dataKey="avgResponse" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* District Analysis Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Analisis Detail per Kecamatan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-700">
                <th className="text-left p-3 font-semibold text-slate-200">Kecamatan</th>
                <th className="text-left p-3 font-semibold text-slate-200">Total Insiden</th>
                <th className="text-left p-3 font-semibold text-slate-200">Total Korban</th>
                <th className="text-left p-3 font-semibold text-slate-200">Rata-rata Respons</th>
                <th className="text-left p-3 font-semibold text-slate-200">Jenis Dominan</th>
              </tr>
            </thead>
            <tbody>
              {districtData.map((district, index) => {
                const crimeTypeData = crimeTypeByDistrict.find(item => item.district === district.district);
                return (
                  <tr key={index} className="border-b border-slate-600 hover:bg-slate-700/50">
                    <td className="p-3 font-medium text-slate-200">{district.district}</td>
                    <td className="p-3 text-slate-300">{district.count}</td>
                    <td className="p-3 text-slate-300">{district.totalVictims}</td>
                    <td className="p-3 text-slate-300">{district.avgResponse} menit</td>
                    <td className="p-3 text-slate-300">{crimeTypeData?.topCrime || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LocationPanel;
