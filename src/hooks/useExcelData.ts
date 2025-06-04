
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

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

export const useExcelData = () => {
  const [data, setData] = useState<CrimeDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the Excel file from public folder
      const response = await fetch('/crime_data.xlsx');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      // Get the first worksheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (!jsonData || jsonData.length === 0) {
        throw new Error('No data found in Excel file');
      }

      // Skip header row and map to CrimeDataItem
      const mappedData: CrimeDataItem[] = (jsonData as any[]).slice(1).map((row: any[]) => ({
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
      console.log('Excel data loaded successfully:', mappedData.length, 'items');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error loading Excel data:', errorMessage);
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
