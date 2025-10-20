import axios from "axios"
import { useEffect, useState } from "react"

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [payLoading, setPayLoading] = useState(false);
  const handleRetry = async (orderId) => {
    setPayLoading(true);
    try {

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders/capture-order/${orderId}`, {
        withCredentials: true
      })
      toast('payed successfully')
      getOrders()
    } catch (error) {
      console.log(error)
    }
    setPayLoading(false)
  }
  const getOrders = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {}, {
        withCredentials: true
      })
      setOrders(data.orders)
    } catch (error) {
      //todo: handle error
      console.log(error)
    }
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-xl">Search Result</h2>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                id
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>

            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, index) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th scope="row" className="text-center content-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className={`text-center content-center px-6 py-4 ${order?.paymentStatus === "COMPLETED" ? "text-green-500" : order?.paymentStatus === "FAILED" ? "text-red-500" : "text-yellow-500"}`}>
                    {order?.paymentStatus}
                  </td>
                  <td className="text-center content-center px-6 py-4">
                    {order?.totalAmount} $
                  </td>
                  <td className="text-center content-center px-6 py-4">
                    {order.paymentStatus === "PENDING" ? (
                      <div className="text-yellow-600 font-medium">
                        Payment pending. Awaiting confirmation.
                        <button
                          onClick={() => handleRetry(order.paypalOrderId)}
                          className="ml-3 text-blue-600 underline"
                        >
                          Retry
                        </button>
                      </div>
                    ) : "Successfully payed"}
                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default OrdersPage