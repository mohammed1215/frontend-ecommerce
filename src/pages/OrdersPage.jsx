import axios from "axios"
import { useEffect, useState } from "react"
import { useTitle } from "../customHooks"

const OrdersPage = () => {
  useTitle('Orders')
  const [orders, setOrders] = useState([])
  const [payLoading, setPayLoading] = useState(false);
  const handleRetry = async (orderId) => {

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders/capture-order/${orderId}`, {
        withCredentials: true
      })
      toast('payed successfully')
      getOrders()
    } catch (error) {
      console.log(error)
    }
  }
  const getOrders = async () => {
    setPayLoading(true);

    try {

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {}, {
        withCredentials: true
      })
      setOrders(data.orders)
    } catch (error) {
      //todo: handle error
      console.log(error)
    }
    setPayLoading(false)

  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-xl">Search Result</h2>

      {
        payLoading ? <div className="flex justify-center" role="status">
          <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div> :
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
      }


    </div>
  )
}

export default OrdersPage