"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const get_product_data = async () => {
      setLoading(true);
      setError(null); // Reset previous error
      try {
        const res = await axios.get(`http://127.0.0.1:5000/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch product data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    get_product_data();
  }, [id]);

  const formatValue = (val) => {
    if (!val || val === "" || val === "0.00") return "-";
    return val;
  };

  const fields = [
    { title: "Product Number", value: formatValue(product?.number) },
    { title: "Stock Quantity", value: formatValue(product?.stock_quantity) },
    { title: "Sales Price", value: formatValue(product?.sales_price) },
    { title: "Currency", value: formatValue(product?.currency) },
    { title: "Unit", value: formatValue(product?.unit) },
    { title: "Cost Price", value: formatValue(product?.cost_price) },
    { title: "Created At", value: formatValue(product?.created_at) },
    { title: "Updated At", value: formatValue(product?.updated_at) },
    { title: "Height", value: formatValue(product?.dimensions?.height) },
    { title: "Width", value: formatValue(product?.dimensions?.width) },
    { title: "Weight", value: formatValue(product?.dimensions?.weight) },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        {/* Product Name */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {formatValue(product.name)}
        </h1>
        <p className="text-gray-600 mb-6">{formatValue(product.description)}</p>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {fields.map((field, id) => (
            <InnerCard key={id} title={field.title} value={field.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

const InnerCard = ({ title, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};
