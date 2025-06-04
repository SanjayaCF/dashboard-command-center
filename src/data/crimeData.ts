// Crime data and categories
export interface CrimeData {
  ID_Kejadian: number;
  Jenis_Kejadian: string;
  Tanggal_Kejadian: string;
  Waktu_Kejadian: string;
  Kota: string;
  Kecamatan: string;
  Latitude: number;
  Longitude: number;
  Korban: number;
  Status: string;
  Koordinat: string;
  Bulan: number;
  Durasi_Respons: number;
}

export const fullCrimeData: CrimeData[] = [
  { ID_Kejadian: 1, Jenis_Kejadian: "Penganiayaan", Tanggal_Kejadian: "2025-04-13", Waktu_Kejadian: "20:07", Kota: "Yogyakarta", Kecamatan: "Jetis", Latitude: -7.793, Longitude: 110.363, Korban: 1, Status: "Dilimpahkan ke Cyber Crime", Koordinat: "-7.793, 110.363", Bulan: 4, Durasi_Respons: 77 },
  { ID_Kejadian: 2, Jenis_Kejadian: "Penipuan Online", Tanggal_Kejadian: "2025-12-15", Waktu_Kejadian: "00:47", Kota: "Yogyakarta", Kecamatan: "Kotagede", Latitude: -7.825, Longitude: 110.385, Korban: 3, Status: "Penyidikan Lanjutan", Koordinat: "-7.825, 110.385", Bulan: 12, Durasi_Respons: 101 },
  { ID_Kejadian: 3, Jenis_Kejadian: "Tawuran", Tanggal_Kejadian: "2025-09-28", Waktu_Kejadian: "08:15", Kota: "Yogyakarta", Kecamatan: "Umbulharjo", Latitude: -7.801, Longitude: 110.375, Korban: 1, Status: "Penyidikan Lanjutan", Koordinat: "-7.801, 110.375", Bulan: 9, Durasi_Respons: 87 },
  { ID_Kejadian: 4, Jenis_Kejadian: "Pemerkosaan", Tanggal_Kejadian: "2025-04-17", Waktu_Kejadian: "07:08", Kota: "Yogyakarta", Kecamatan: "Mantrijeron", Latitude: -7.81, Longitude: 110.377, Korban: 2, Status: "Penyidikan Lanjutan", Koordinat: "-7.81, 110.377", Bulan: 4, Durasi_Respons: 70 },
  { ID_Kejadian: 5, Jenis_Kejadian: "Penipuan Online", Tanggal_Kejadian: "2025-03-13", Waktu_Kejadian: "23:06", Kota: "Yogyakarta", Kecamatan: "Umbulharjo", Latitude: -7.801, Longitude: 110.375, Korban: 3, Status: "Penyidikan Lanjutan", Koordinat: "-7.801, 110.375", Bulan: 3, Durasi_Respons: 119 },
  { ID_Kejadian: 6, Jenis_Kejadian: "Pencurian Motor", Tanggal_Kejadian: "2025-07-08", Waktu_Kejadian: "21:47", Kota: "Yogyakarta", Kecamatan: "Tegalrejo", Latitude: -7.776, Longitude: 110.368, Korban: 3, Status: "Penyidikan Lanjutan", Koordinat: "-7.776, 110.368", Bulan: 7, Durasi_Respons: 47 },
  { ID_Kejadian: 7, Jenis_Kejadian: "Penganiayaan", Tanggal_Kejadian: "2025-01-21", Waktu_Kejadian: "17:05", Kota: "Yogyakarta", Kecamatan: "Umbulharjo", Latitude: -7.801, Longitude: 110.375, Korban: 3, Status: "Selesai", Koordinat: "-7.801, 110.375", Bulan: 1, Durasi_Respons: 33 },
  { ID_Kejadian: 8, Jenis_Kejadian: "Penganiayaan", Tanggal_Kejadian: "2025-04-13", Waktu_Kejadian: "18:27", Kota: "Yogyakarta", Kecamatan: "Umbulharjo", Latitude: -7.801, Longitude: 110.375, Korban: 3, Status: "Dilimpahkan ke Cyber Crime", Koordinat: "-7.801, 110.375", Bulan: 4, Durasi_Respons: 30 },
  { ID_Kejadian: 9, Jenis_Kejadian: "Pencurian Motor", Tanggal_Kejadian: "2025-05-02", Waktu_Kejadian: "01:01", Kota: "Yogyakarta", Kecamatan: "Jetis", Latitude: -7.793, Longitude: 110.363, Korban: 2, Status: "Penyidikan Lanjutan", Koordinat: "-7.793, 110.363", Bulan: 5, Durasi_Respons: 38 },
  { ID_Kejadian: 10, Jenis_Kejadian: "Klitih", Tanggal_Kejadian: "2025-08-03", Waktu_Kejadian: "02:13", Kota: "Yogyakarta", Kecamatan: "Jetis", Latitude: -7.793, Longitude: 110.363, Korban: 2, Status: "Dilimpahkan ke Cyber Crime", Koordinat: "-7.793, 110.363", Bulan: 8, Durasi_Respons: 34 },
  { ID_Kejadian: 11, Jenis_Kejadian: "Vandalisme", Tanggal_Kejadian: "2025-11-27", Waktu_Kejadian: "07:32", Kota: "Yogyakarta", Kecamatan: "Danurejan", Latitude: -7.796, Longitude: 110.367, Korban: 1, Status: "Selesai", Koordinat: "-7.796, 110.367", Bulan: 11, Durasi_Respons: 95 },
  { ID_Kejadian: 12, Jenis_Kejadian: "Pemerkosaan", Tanggal_Kejadian: "2025-03-29", Waktu_Kejadian: "19:01", Kota: "Yogyakarta", Kecamatan: "Mergangsan", Latitude: -7.787, Longitude: 110.367, Korban: 3, Status: "Selesai", Koordinat: "-7.787, 110.367", Bulan: 3, Durasi_Respons: 35 },
  { ID_Kejadian: 13, Jenis_Kejadian: "Narkoba", Tanggal_Kejadian: "2025-04-10", Waktu_Kejadian: "17:12", Kota: "Yogyakarta", Kecamatan: "Mantrijeron", Latitude: -7.81, Longitude: 110.377, Korban: 3, Status: "Dilimpahkan ke Cyber Crime", Koordinat: "-7.81, 110.377", Bulan: 4, Durasi_Respons: 43 },
  { ID_Kejadian: 14, Jenis_Kejadian: "Penipuan Online", Tanggal_Kejadian: "2025-12-26", Waktu_Kejadian: "22:41", Kota: "Yogyakarta", Kecamatan: "Umbulharjo", Latitude: -7.801, Longitude: 110.375, Korban: 2, Status: "Dalam Penyelidikan", Koordinat: "-7.801, 110.375", Bulan: 12, Durasi_Respons: 111 },
  { ID_Kejadian: 15, Jenis_Kejadian: "Pencurian Motor", Tanggal_Kejadian: "2025-06-01", Waktu_Kejadian: "22:34", Kota: "Yogyakarta", Kecamatan: "Umbulharjo", Latitude: -7.801, Longitude: 110.375, Korban: 1, Status: "Tersangka Ditangkap", Koordinat: "-7.801, 110.375", Bulan: 6, Durasi_Respons: 73 },
  { ID_Kejadian: 16, Jenis_Kejadian: "Tawuran", Tanggal_Kejadian: "2025-05-11", Waktu_Kejadian: "13:14", Kota: "Yogyakarta", Kecamatan: "Kotagede", Latitude: -7.825, Longitude: 110.385, Korban: 2, Status: "Dalam Penyelidikan", Koordinat: "-7.825, 110.385", Bulan: 5, Durasi_Respons: 45 },
  { ID_Kejadian: 17, Jenis_Kejadian: "Penipuan Online", Tanggal_Kejadian: "2025-05-30", Waktu_Kejadian: "14:37", Kota: "Yogyakarta", Kecamatan: "Jetis", Latitude: -7.793, Longitude: 110.363, Korban: 2, Status: "Dalam Penyelidikan", Koordinat: "-7.793, 110.363", Bulan: 5, Durasi_Respons: 64 },
  { ID_Kejadian: 18, Jenis_Kejadian: "Vandalisme", Tanggal_Kejadian: "2025-11-05", Waktu_Kejadian: "08:51", Kota: "Yogyakarta", Kecamatan: "Mantrijeron", Latitude: -7.81, Longitude: 110.377, Korban: 1, Status: "Dalam Penyelidikan", Koordinat: "-7.81, 110.377", Bulan: 11, Durasi_Respons: 96 },
  { ID_Kejadian: 19, Jenis_Kejadian: "Tawuran", Tanggal_Kejadian: "2025-09-15", Waktu_Kejadian: "00:48", Kota: "Yogyakarta", Kecamatan: "Danurejan", Latitude: -7.796, Longitude: 110.367, Korban: 3, Status: "Penyidikan Lanjutan", Koordinat: "-7.796, 110.367", Bulan: 9, Durasi_Respons: 68 },
  { ID_Kejadian: 20, Jenis_Kejadian: "Perampokan", Tanggal_Kejadian: "2025-12-10", Waktu_Kejadian: "05:44", Kota: "Yogyakarta", Kecamatan: "Mergangsan", Latitude: -7.787, Longitude: 110.367, Korban: 3, Status: "Selesai", Koordinat: "-7.787, 110.367", Bulan: 12, Durasi_Respons: 52 },
  // Continue adding the rest of the data...
  { ID_Kejadian: 28, Jenis_Kejadian: "Kecelakaan Lalu Lintas", Tanggal_Kejadian: "2025-08-24", Waktu_Kejadian: "08:51", Kota: "Yogyakarta", Kecamatan: "Gondokusuman", Latitude: -7.783, Longitude: 110.381, Korban: 3, Status: "Tersangka Ditangkap", Koordinat: "-7.783, 110.381", Bulan: 8, Durasi_Respons: 26 },
  { ID_Kejadian: 42, Jenis_Kejadian: "Kecelakaan Lalu Lintas", Tanggal_Kejadian: "2025-05-11", Waktu_Kejadian: "08:29", Kota: "Yogyakarta", Kecamatan: "Mergangsan", Latitude: -7.787, Longitude: 110.367, Korban: 2, Status: "Dalam Penyelidikan", Koordinat: "-7.787, 110.367", Bulan: 5, Durasi_Respons: 51 },
  { ID_Kejadian: 44, Jenis_Kejadian: "Kecelakaan Lalu Lintas", Tanggal_Kejadian: "2025-05-15", Waktu_Kejadian: "11:10", Kota: "Yogyakarta", Kecamatan: "Gedongtengen", Latitude: -7.776, Longitude: 110.381, Korban: 3, Status: "Penyidikan Lanjutan", Koordinat: "-7.776, 110.381", Bulan: 5, Durasi_Respons: 31 },
  { ID_Kejadian: 52, Jenis_Kejadian: "Kecelakaan Lalu Lintas", Tanggal_Kejadian: "2025-08-30", Waktu_Kejadian: "07:10", Kota: "Yogyakarta", Kecamatan: "Gedongtengen", Latitude: -7.776, Longitude: 110.381, Korban: 2, Status: "Tersangka Ditangkap", Koordinat: "-7.776, 110.381", Bulan: 8, Durasi_Respons: 21 },
  { ID_Kejadian: 57, Jenis_Kejadian: "Kecelakaan Lalu Lintas", Tanggal_Kejadian: "2025-04-02", Waktu_Kejadian: "21:20", Kota: "Yogyakarta", Kecamatan: "Gedongtengen", Latitude: -7.776, Longitude: 110.381, Korban: 1, Status: "Tersangka Ditangkap", Koordinat: "-7.776, 110.381", Bulan: 4, Durasi_Respons: 43 }
  // Add more data as needed...
];

export const crimeCategories = [
  "Penganiayaan",
  "Penipuan Online", 
  "Tawuran",
  "Pemerkosaan",
  "Pencurian Motor",
  "Klitih",
  "Vandalisme",
  "Narkoba",
  "Perampokan"
];

export const trafficCategories = [
  "Kecelakaan Lalu Lintas"
];
