import axios from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useAuth } from "../../context/AuthProvider";
const Reviews = ({ comments, setComments, product }) => {

  const { user } = useAuth()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [openReviewForm, setOpenReviewForm] = useState(false)

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

    const { data } = await axios.post(`http://localhost:5000/reviews/${product._id}`, {
      comment,
      rating
    }, {
      withCredentials: true,
    })
    setComments(prev => [...prev, data.review])
  }
  return (
    <div className='mx-auto container px-3 md:px-0 py-2.5 mt-5'>
      <div className="flex justify-between mb-4">
        <h2>Reviews</h2>
        <button onClick={handleWritingReviewForm} className="cursor-pointer bg-black p-2 text-white rounded-xl hover:scale-105 hover:bg-gray-600 transition duration-300">Write Review</button>
      </div>

      {/* Form */}

      <div className={`absolute overflow-hidden left-0 top-0 justify-center items-center w-full min-h-screen flex bg-[#00000056] ${openReviewForm ? '' : 'hidden'}`}>
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
          <button className='bg-black rounded-lg text-white cursor-pointer py-2'>Submit Review</button>
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