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
  // Excel's epoch starts at Jan 1, 1900 (serial 1), but JS Date epoch is Jan 1, 1970.
  // Offset 25569 days is the difference between Jan 1, 1900 and Jan 1, 1970.
  const utcDays = excelSerial - 25569;
  const msPerDay = 24 * 60 * 60 * 1000;
  return new Date(utcDays * msPerDay);
}

const CrimePanel: React.FC = () => {
  const { data: excelData } = useExcelData();
  const currentData = excelData.length > 0 ? excelData : fullCrimeData;

  // Daftar jenis kejahatan yang akan ditampilkan (tidak termasuk kecelakaan lalu lintas)
const crimeTypes = [
  'Penganiayaan',
  'Kekerasan Seksual',
  'Curat',
  'Curanmor',
  'Tawuran',
  'Perampokan',
  'Narkoba',
  'Klitih',
  'Vandalisme'
];
  // Filter data sesuai jenis kejahatan
  const crimeData = currentData.filter((item) =>
    crimeTypes.includes(item.Jenis_Kejadian)
  );

  // Tren bulanan: hitung jumlah kejadian per bulan
  const monthlyTrend = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthCrimes = crimeData.filter((item) => item.Bulan === month);
    return {
      month: `Bulan ${month}`,
      count: monthCrimes.length
    };
  });

  // Distribusi jenis kejahatan: hitung jumlah per jenis, lalu urutkan menurun
  const crimeTypeData = crimeTypes
    .map((type) => ({
      type,
      count: crimeData.filter((item) => item.Jenis_Kejadian === type).length
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  // Analisis waktu respons rata‐rata per jenis kejahatan
  const responseTimeData = crimeTypes
    .map((type) => {
      const typeData = crimeData.filter((item) => item.Jenis_Kejadian === type);
      const avgResponse =
        typeData.length > 0
          ? Math.round(
              typeData.reduce((sum, item) => sum + item.Durasi_Respons, 0) /
                typeData.length
            )
          : 0;

      return {
        type: type.length > 15 ? type.substring(0, 15) + '...' : type,
        avgResponse,
        count: typeData.length
      };
    })
    .filter((item) => item.count > 0);

  // Data lokasi untuk scatter (jika nanti ingin dipakai)
  const locationData = crimeData.map((item) => ({
    lat: item.Latitude,
    lng: item.Longitude,
    korban: item.Korban,
    type: item.Jenis_Kejadian,
    status: item.Status
  }));

  return (
    <div className="space-y-6">
      {/* Crime Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Total Kejahatan</h3>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {crimeData.length}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Kejadian kriminal YTD
          </p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            Rata-rata Respons
          </h3>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {Math.round(
              crimeData.reduce((sum, item) => sum + item.Durasi_Respons, 0) /
                crimeData.length
            )}{' '}
            min
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Waktu respons kejahatan
          </p>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white">Total Korban</h3>
          <p className="text-3xl font-bold text-red-400 mt-2">
            {crimeData.reduce((sum, item) => sum + item.Korban, 0)}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Korban kejahatan YTD
          </p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Crime Trend */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Tren Bulanan Kejahatan
          </h3>
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
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Crime Type Distribution */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Distribusi Jenis Kejahatan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={crimeTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis
                dataKey="type"
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
              <Bar dataKey="count" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Response Time Analysis */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Analisis Waktu Respons per Jenis Kejahatan
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={responseTimeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis
              dataKey="type"
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

      {/* Crime Cases Table */}
      <Card className="p-6 bg-slate-800 border-slate-700">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Daftar Kasus Kejahatan Terbaru
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600 bg-slate-700">
                <th className="text-left p-3 font-semibold text-slate-200">
                  ID
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Tanggal
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Jenis
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Kecamatan
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Korban
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Respons (min)
                </th>
                <th className="text-left p-3 font-semibold text-slate-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {crimeData.slice(0, 10).map((crime) => {
                const tanggalObj = excelDateToJSDate(
                  Number(crime.Tanggal_Kejadian)
                );
                const formattedDate = tanggalObj.toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });

                return (
                  <tr
                    key={crime.ID_Kejadian}
                    className="border-b border-slate-600 hover:bg-slate-700/50"
                  >
                    <td className="p-3 text-slate-300">
                      {crime.ID_Kejadian}
                    </td>
                    <td className="p-3 text-slate-300">{formattedDate}</td>
                    <td className="p-3 text-slate-300">
                      {crime.Jenis_Kejadian}
                    </td>
                    <td className="p-3 text-slate-300">
                      {crime.Kecamatan}
                    </td>
                    <td className="p-3 text-slate-300">{crime.Korban}</td>
                    <td className="p-3 text-slate-300">
                      {crime.Durasi_Respons}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          crime.Status === 'Selesai'
                            ? 'bg-green-500/20 text-green-400'
                            : crime.Status === 'Penyidikan Lanjutan'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {crime.Status}
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

export default CrimePanel;
