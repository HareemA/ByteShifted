"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowLeft,
  SearchIcon,
} from "lucide-react";

export default function ProductsTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const get_products = async () => {
      const res = await axios.get(
        `http://127.0.0.1:5000/products?page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalItems(res.data.total);
    };

    get_products();
  }, [page, limit]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    if (sortConfig.direction === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const filteredProducts = sortedProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex flex-col items-center  w-full bg-gray-100 pb-10 px-4 sm:px-6 lg:px-10">
      <h1 className="font-bold text-2xl sm:text-3xl text-center mt-10 mb-10">
        Products List
      </h1>

      <div className="sm:w-full lg:w-[60%] overflow-x-auto">
        <div className="flex flex-row gap-3 items-center m-3">
          <h5 className="font-bold">Search</h5>
          <input
            className="border p-1 rounded-[10px]"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <SearchIcon />
        </div>
        <table className="min-w-full border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">
                <div className="flex items-center gap-1">
                  Sales Price
                  <ArrowUp
                    size={30}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("sales_price", "asc")}
                  />
                  <ArrowDown
                    size={30}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("sales_price", "desc")}
                  />
                </div>
              </th>
              <th className="px-4 py-2 text-left">
                <div className="flex items-center gap-1">
                  Stock
                  <ArrowUp
                    size={20}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("stock_quantity", "asc")}
                  />
                  <ArrowDown
                    size={20}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSort("stock_quantity", "desc")}
                  />
                </div>
              </th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredProducts
              ? filteredProducts.map((p, i) => (
                  <tr
                    key={p.number}
                    onClick={() => router.push(`/Products/${p.number}`)}
                    className={`${
                      i % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 cursor-pointer`}
                  >
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.sales_price}</td>
                    <td className="px-4 py-2">{p.stock_quantity}</td>
                    <td className="px-4 py-2">{p.description}</td>
                  </tr>
                ))
              : sortedProducts.map((p, i) => (
                  <tr
                    key={p.number}
                    onClick={() => router.push(`/Products/${p.number}`)}
                    className={`${
                      i % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 cursor-pointer`}
                  >
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.sales_price}</td>
                    <td className="px-4 py-2">{p.stock_quantity}</td>
                    <td className="px-4 py-2">{p.description}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center sm:w-full lg:w-[60%] justify-between bg-gray-400 p-2 rounded">
        <p className="text-sm sm:text-base">
          Showing {(page - 1) * limit + 1}-{Math.min(page * limit, totalItems)}{" "}
          of {totalItems} items
        </p>

        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm sm:text-base">Rows per page</p>
          <select
            name="quantity"
            id="quantity"
            className="border p-1"
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div className="flex flex-row gap-1 flex-wrap items-center justify-center sm:justify-end">
          <button
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ArrowLeft />
          </button>

          <button
            className={`rounded-full px-3 py-1 text-sm ${
              page === 1 ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(1)}
          >
            1
          </button>

          <span className="px-1">..</span>

          <button
            className={`rounded-full px-3 py-1 text-sm ${
              page > 1 && page < totalPages
                ? "bg-gray-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() =>
              setPage(
                page === 1 ? page + 1 : page === totalPages ? page - 1 : page
              )
            }
          >
            {page === 1 ? page + 1 : page === totalPages ? page - 1 : page}
          </button>

          <span className="px-1">..</span>

          <button
            className={`rounded-full px-3 py-1 text-sm ${
              page === totalPages ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </button>

          <button
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
