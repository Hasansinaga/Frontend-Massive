const CardPembeli = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4 w-full max-w-full">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-2xl"><img src="/images/user-36-06.jpg" alt="" /></span> {/* Icon Placeholder */}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Janet Adebayo</h2>
          <p className="text-sm text-gray-500">janet@gmail.com</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <p>Telepon</p>
          <p className="font-semibold">+6248065650633</p>
        </div>
        <div>
          <p>Alamat</p>
          <p className="font-semibold">Jalan Sitoluama, Laguboti, Sumatera Utara</p>
        </div>
        <div>
          <p>Umur</p>
          <p className="font-semibold">24 tahun</p>
        </div>
        <div>
          <p>Jenis Kelamin</p>
          <p className="font-semibold">Laki-Laki</p>
        </div>
        <div>
          <p>Tanggal Lahir</p>
          <p className="font-semibold">12 Oktober 2000</p>
        </div>
      </div>
    </div>
  );
};

export default CardPembeli;