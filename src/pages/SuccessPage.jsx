import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTitle } from '../customHooks';

const SuccessPage = () => {
  useTitle('Success')
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({})
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    let hasCaptured = false;
    const captureOrder = async () => {
      if (hasCaptured) return;
      hasCaptured = true
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) return;

      try {
        setLoading(true);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/orders/capture-order/${token}`
        );
        setLoading(false);
        console.log(data.links)
        if (data.status === 'COMPLETED') {
          toast.success('Payment captured successfully');
        } else {
          toast.error('Payment not completed');
        }
        setOrderData(data)
      } catch (err) {
        setLoading(false);
        toast.error('Error capturing order');
        console.error(err.response?.data || err.message);
      }
    };

    captureOrder();
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-2 text-gray-700">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      {orderData && (
        <div className="mt-4 p-4 border rounded-md text-left">
          <p><strong>Order ID:</strong> {orderData?.data?._id}</p>
          <p><strong>Amount:</strong> {orderData?.data?.totalAmount} $</p>
          <p className={`${orderData.status === "COMPLETED" ? "text-green-600" : "text-red-500"}`}><strong>Status:</strong> {orderData?.status}</p>
        </div>
      )}

      <button
        onClick={() => navigate('/account/orders')}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        View Orders
      </button>
    </div>

  );
};

export default SuccessPage;
