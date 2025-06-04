import React from 'react';
import { Card } from '@/components/ui/card';
import { useExcelData } from '../../hooks/useExcelData';
import { fullCrimeData } from '../../data/crimeData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Utility function to convert Excel serial date to JS Date
function excelDateToJSDate(excelSerial: number): Date {
  // Offset 25569 days between Excel epoch (Jan 1 1900) and JS epoch (Jan 1 1970)
  const utcDays = excelSerial - 25569;
  const msPerDay = 24 * 60 * 60 * 1000;
  return new Date(utcDays * msPerDay);
}

const TrafficPanel: React.FC = () => {
  const { data: excelData } = useExcelData();
  const currentData = excelData.length > 0 ? excelData : fullCrimeData;

  // Filter traffic-related incidents
  const trafficData = React.useMemo(
    () => currentData.filter(item => item.Jenis_Kejadian === 'Kecelakaan Lalu Lintas'),
    [currentData]
  );

  // Monthly traffic trend
  const monthlyTrend = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const monthData = trafficData.filter(item => item.Bulan === month);
      const avgVictims =
        monthData.length > 0
          ? monthData.reduce((sum, item) => sum + item.Korban, 0) / monthData.length
          : 0;

      return {
        month: `Bulan ${month}`,
        count: monthData.length,
        avgVictims: Math.round(avgVictims * 10) / 10
      };
    });
  }, [trafficData]);

  // Response time distribution by district
  const districtData = React.useMemo(() => {
    const map: Record<string, { count: number; totalResponse: number }> = {};
    trafficData.forEach(item => {
      if (!map[item.Kecamatan]) {
        map[item.Kecamatan] = { count: 0, totalResponse: 0 };
      }
      map[item.Kecamatan].count += 1;
      map[item.Kecamatan].totalResponse += item.Durasi_Respons;
    });
    return Object.entries(map)
      .map(([district, { count, totalResponse }]) => ({
        district,
        count,
        avgResponse: Math.round(totalResponse / count)
      }))
      .sort((a, b) => b.count - a.count);
  }, [trafficData]);

  // Hourly distribution (extract hour from time)
  const hourlyData = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => {
      const count = trafficData.filter(item => {
        const [h] = item.Waktu_Kejadian.split(':');
        return parseInt(h, 10) === hour;
      }).length;

      return {
        hour: `${hour.toString().padStart(2, '0')}:00`,
        count
      };
    });
  }, [trafficData]);

  // Total statistics
  const totalAccidents = trafficData.length;
  const totalVictims = trafficData.reduce((sum, item) => sum + item.Korban, 0);
  const avgResponse =
    trafficData.length > 0
      ? Math.round(trafficData.reduce((sum, item) => sum + item.Durasi_Respons, 0) / trafficData.length)
      : 0;
  const avgVictimsPerAccident =
    trafficData.length > 0
      ? Math.round((totalVictims / trafficData.length) * 10) / 10
      : 0;

  return (
    <div className="space-y-6">
      {/* Traffic Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Total Kecelakaan</h3>
          <p className="text-3xl font-bold text-orange-400 mt-2">{totalAccidents}</p>
          <p className="text-sm text-slate-400 mt-1">Kecelakaan YTD</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Total Korban</h3>
          <p className="text-3xl font-bold text-red-400 mt-2">{totalVictims}</p>
          <p className="text-sm text-slate-400 mt-1">Korban kecelakaan</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Rata-rata Respons</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">{avgResponse} min</p>
          <p className="text-sm text-slate-400 mt-1">Waktu respons</p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Rata-rata Korban</h3>
          <p className="text-3xl font-bold text-purple-400 mt-2">{avgVictimsPerAccident}</p>
          <p className="text-sm text-slate-400 mt-1">Per kejadian</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Tren Bulanan Kecelakaan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* District Distribution */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Kecelakaan per Kecamatan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="district" angle={-45} textAnchor="end" height={80} stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
              />
              <Bar dataKey="count" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Hourly Distribution */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Distribusi Kecelakaan per Jam</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="hour" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#F1F5F9'
              }}
            />
            <Bar dataKey="count" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Traffic Accidents Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Daftar Kecelakaan Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-700">
                <th className="text-left p-3 font-semibold text-slate-200">ID</th>
                <th className="text-left p-3 font-semibold text-slate-200">Tanggal</th>
                <th className="text-left p-3 font-semibold text-slate-200">Waktu</th>
                <th className="text-left p-3 font-semibold text-slate-200">Kecamatan</th>
                <th className="text-left p-3 font-semibold text-slate-200">Korban</th>
                <th className="text-left p-3 font-semibold text-slate-200">Respons (min)</th>
                <th className="text-left p-3 font-semibold text-slate-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.slice(0, 10).map(incident => {
                // Ambil serial Excel dan konversi ke JS Date
                const serialValue = Number(incident.Tanggal_Kejadian);
                const jsDate = excelDateToJSDate(serialValue);
                const formattedDate = jsDate.toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });

                return (
                  <tr
                    key={incident.ID_Kejadian}
                    className="border-b border-slate-600 hover:bg-slate-700/50"
                  >
                    <td className="p-3 text-slate-300">{incident.ID_Kejadian}</td>
                    <td className="p-3 text-slate-300">{formattedDate}</td>
                    <td className="p-3 text-slate-300">{incident.Waktu_Kejadian}</td>
                    <td className="p-3 text-slate-300">{incident.Kecamatan}</td>
                    <td className="p-3 text-slate-300">{incident.Korban}</td>
                    <td className="p-3 text-slate-300">{incident.Durasi_Respons}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          incident.Status === 'Selesai'
                            ? 'bg-green-500/20 text-green-400'
                            : incident.Status === 'Penyidikan Lanjutan'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {incident.Status}
                      </span>
                    </td>
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

export default TrafficPanel;
