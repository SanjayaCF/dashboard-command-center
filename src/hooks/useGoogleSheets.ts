
import { useState, useEffect } from 'react';

interface CrimeDataItem {
  ID_Kejadian: number;
  Jenis_Kejadian: string;
  Tanggal_Kejadian: string;
  Waktu_Kejadian: string;
  Kota: string;
  Kecamatan: string;
  Latitude: string;
  Longitude: string;
  Korban: number;
  Status: string;
  Koordinat: string;
  Bulan: number;
  Durasi_Respons: number;
}

export const useGoogleSheets = () => {
  const [data, setData] = useState<CrimeDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Direct configuration
  const SPREADSHEET_ID = '1yMGQB1B2QvQ6pb8NJR2TcSXYdMNHU-Fk';
  const API_KEY = 'AIzaSyB5-gOrcGGCQ_e1JrLgE2map7XBthPVMUM';
  const RANGE = 'Sheet1!A:M';

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const rows = result.values;
      
      if (!rows || rows.length === 0) {
        throw new Error('No data found in spreadsheet');
      }

      // Skip header row and map to CrimeDataItem
      const mappedData: CrimeDataItem[] = rows.slice(1).map((row: any[]) => ({
        ID_Kejadian: parseInt(row[0]) || 0,
        Jenis_Kejadian: row[1] || '',
        Tanggal_Kejadian: row[2] || '',
        Waktu_Kejadian: row[3] || '',
        Kota: row[4] || '',
        Kecamatan: row[5] || '',
        Latitude: row[6] || '',
        Longitude: row[7] || '',
        Korban: parseInt(row[8]) || 0,
        Status: row[9] || '',
        Koordinat: row[10] || '',
        Bulan: parseInt(row[11]) || 0,
        Durasi_Respons: parseInt(row[12]) || 0,
      }));

      setData(mappedData);
      console.log('Google Sheets data loaded successfully:', mappedData.length, 'items');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching Google Sheets data:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
