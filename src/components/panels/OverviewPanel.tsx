import React from 'react';
import { Card } from '@/components/ui/card';
import KPICard from '../KPICard';
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
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Shield, Clock, Users, Activity } from 'lucide-react';

const OverviewPanel: React.FC = () => {
  const { data: excelData } = useExcelData();
  const currentData = excelData.length > 0 ? excelData : fullCrimeData;

  // Nama bulan dalam Bahasa Indonesia
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  // Calculate KPIs
  const totalIncidents = currentData.length;
  const avgIncidentsPerMonth = Math.round((totalIncidents / 12) * 100) / 100;
  const avgResponseTime = Math.round(
    (currentData.reduce((sum, item) => sum + item.Durasi_Respons, 0) / totalIncidents) *
      100
  ) / 100;

  const statusCounts = currentData.reduce((acc, item) => {
    acc[item.Status] = (acc[item.Status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const completedPercentage = Math.round((statusCounts['Selesai'] / totalIncidents) * 100);

  // Monthly trend data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = i + 1;
    const incidents = currentData.filter((item) => item.Bulan === monthIndex);
    const avgResponse =
      incidents.length > 0
        ? Math.round(incidents.reduce((sum, item) => sum + item.Durasi_Respons, 0) / incidents.length)
        : 0;

    return {
      month: monthNames[i],
      incidents: incidents.length,
      avgResponse
    };
  });

  // Incident type distribution
  const typeData = currentData.reduce((acc, item) => {
    acc[item.Jenis_Kejadian] = (acc[item.Jenis_Kejadian] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeChartData = Object.entries(typeData)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Status distribution for pie chart
  const statusChartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: Math.round((count / totalIncidents) * 100)
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Insiden YTD"
          value={totalIncidents.toLocaleString()}
          subtitle="Januari - Desember 2025"
          trend="up"
          trendValue="+5.2%"
          icon={<Shield className="h-8 w-8" />}
          color="blue"
        />
        <KPICard
          title="Rata-rata Insiden/Bulan"
          value={avgIncidentsPerMonth}
          subtitle="Per bulan"
          trend="neutral"
          icon={<Activity className="h-8 w-8" />}
          color="green"
        />
        <KPICard
          title="Rata-rata Durasi Respons"
          value={`${avgResponseTime} menit`}
          subtitle="Waktu tanggap rata-rata"
          trend="down"
          trendValue="-2.1%"
          icon={<Clock className="h-8 w-8" />}
          color="yellow"
        />
        <KPICard
          title="Kasus Selesai"
          value={`${completedPercentage}%`}
          subtitle={`${statusCounts['Selesai']} dari ${totalIncidents} kasus`}
          trend="up"
          trendValue="+8.3%"
          icon={<Users className="h-8 w-8" />}
          color="purple"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Tren Bulanan Insiden</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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
                labelStyle={{ color: '#F1F5F9' }}
                itemStyle={{ color: '#F1F5F9' }}
              />
              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Distribution */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Distribusi Status Kasus</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F1F5F9' }}
                itemStyle={{ color: '#F1F5F9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        {/* Incident Type Distribution */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Distribusi Jenis Kejadian (Top 8)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={typeChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F1F5F9' }}
                itemStyle={{ color: '#F1F5F9' }}
              />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Ringkasan Bulanan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-700">
                <th className="text-left p-3 font-semibold text-slate-200">Bulan</th>
                <th className="text-left p-3 font-semibold text-slate-200">Jumlah Insiden</th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Rata-rata Durasi Respons
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">Kasus Selesai</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => {
                const monthIndex = index + 1;
                const monthIncidents = currentData.filter((item) => item.Bulan === monthIndex);
                const completed = monthIncidents.filter((item) => item.Status === 'Selesai').length;
                const completionRate =
                  monthIncidents.length > 0
                    ? Math.round((completed / monthIncidents.length) * 100)
                    : 0;

                return (
                  <tr
                    key={index}
                    className="border-b border-slate-600 hover:bg-slate-700/50"
                  >
                    <td className="p-3 font-medium text-slate-200">{data.month}</td>
                    <td className="p-3 text-slate-300">{data.incidents}</td>
                    <td className="p-3 text-slate-300">{data.avgResponse} menit</td>
                    <td className="p-3 text-slate-300">
                      {completed} ({completionRate}%)
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

export default OverviewPanel;
