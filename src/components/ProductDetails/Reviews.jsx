import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useAuth } from "../../context/AuthProvider";
const Reviews = ({ comments, setComments, product }) => {

  const { user } = useAuth()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [openReviewForm, setOpenReviewForm] = useState(false)
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false)
  function formatDate(date) {
    const d = new Date(date)
    if (Number.isNaN(d.getTime())) return "";

    const today = new Date();
    if (today.toDateString() === d.toDateString()) {
      return new Intl.DateTimeFormat('default', { hour: 'numeric', minute: 'numeric', second: "numeric" }).format(d);
    }

    return new Intl.DateTimeFormat('default', { month: "long", year: "numeric", day: "numeric" }).format(d);
  }

  function handleWritingReviewForm() {
    setOpenReviewForm(true)
  }

  async function handleSubmitReview(e) {
    e.preventDefault();


    if (!user) {
      setComment(null)
      setRating(null)
      setOpenReviewForm(false)
      return toast('Must Login', {
        style: {
          color: "red",
          fontWeight: 'bold'
        }
      })
    }

    if (!rating) {
      return toast('Must write rating', {
        style: {
          color: "red",
          fontWeight: "bold"
        }
      })
    }
    setSubmitReviewLoading(true)
    try {

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/reviews/${product._id}`, {
        comment,
        rating
      }, {
        withCredentials: true,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        error.response.data.message.startsWith('E11000')
        toast('you wrote Comment Before', {
          style: {
            color: 'red'
          }
        })
      }
    }
    setComments(prev => [...prev, data.review])
    setSubmitReviewLoading(false)
    setOpenReviewForm(false)
  }
  return (
    <div className='mx-auto container px-3 md:px-0 py-2.5 mt-5'>
      <div className="flex justify-between mb-4">
        <h2>Reviews</h2>
        <button onClick={handleWritingReviewForm} className="cursor-pointer bg-black p-2 text-white rounded-xl hover:scale-105 hover:bg-gray-600 transition duration-300">Write Review</button>
      </div>

      {/* Form */}

      <div className={`fixed overflow-hidden left-0 top-0 justify-center items-center w-full min-h-screen flex bg-[#00000056] ${openReviewForm ? 'fade-in' : 'hidden'}`}>
        <form onSubmit={handleSubmitReview} className='w-[500px] relative flex flex-col max-h-[500px] mx-auto gap-3 bg-fuchsia-300 rounded-lg p-5'>
          <span className="absolute top-1 right-1 cursor-pointer" onClick={() => setOpenReviewForm(false)}><i className="fas fa-x"></i></span>
          <h1 className='text-3xl font-bold'>Submit Review</h1>
          <div className='flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg'>Rating</label>
            <input value={rating} onChange={(e) => setRating(e.target.value)} type="number" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' min={0} max={5} placeholder='Enter rating between 1 and 5' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg'>Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Comment' />
          </div>
          <button disabled={submitReviewLoading} className={`bg-black disabled:bg-gray-500  rounded-lg text-white cursor-pointer py-2`}>Submit Review
            {
              submitReviewLoading &&
              <div role="status">
                <svg aria-hidden="true" className="w-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>

            }
          </button>
        </form>
      </div>
      {/* Comments */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {comments.map(comment => (
          <div key={comment._id} className='p-3 rounded-xl border border-gray-200'>
            <div className='flex justify-between '>
              <span>{comment?.rating}</span>
              <span><i className='fas fa-dots'></i></span>
            </div>
            <div className='gap-2 flex flex-col mt-4'>
              <h2 className='text-xl font-bold'>{comment?.userName}</h2>
              <p className='text-sm text-gray-500'>"{comment?.comment}"</p>
              <p className='mt-2'>{formatDate(comment?.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews