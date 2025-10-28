import { useEffect } from "react"
import { useRef } from "react"
import { useAuth } from "../../context/AuthProvider"

const Info = ({ avatar, setPreview }) => {
  const formRef = useRef()
  const { user } = useAuth()
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    if (avatar)
      formData.append('image', avatar)
    console.log([...formData.values()])
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/update`, formData, {
        withCredentials: true
      })
      toast('account has been updated successfully', {
        style: {
          color: "green"
        }
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    if (avatar)
      setPreview(URL.createObjectURL(avatar))
    else {
      setPreview(user?.imgPath)
    }

    return () => { }
  }, [avatar])




  return (
    <section className='flex-2'>
      <h2 className="text-center font-bold text-4xl mt-10 text-gray-500">Your Personal Profile Info</h2>

      <form action="" ref={formRef} id="form-info" onSubmit={handleSubmit} className="flex flex-col md:flex-row">
        <div className="w-full p-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="">Fullname</label>
            <input defaultValue={user?.fullname} name="fullname" type="text" className="input bg-gray-200 border-cyan-600 !border-2" />
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <label htmlFor="">Email</label>
            <input defaultValue={user?.email} name="email" disabled type="email" className="input bg-gray-200 border-cyan-600 !border-2" />
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <label htmlFor="">Role</label>
            <input defaultValue={user?.role} disabled name="email" type="text" className="input disabled:bg-gray-500 disabled:text-gray-300 cursor-not-allowed" />
          </div>

          <button className="cursor-pointer bg-[#0194F1] text-white rounded-xl p-2 mt-3">Update Info</button>
        </div>
        {/* <div>
            <div className="flex flex-col gap-3">
              <label htmlFor=""></label>
              <input type="text" className="input" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor=""></label>
              <input type="text" className="input" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor=""></label>
              <input type="text" className="input" />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor=""></label>
              <input type="text" className="input" />
            </div>

          </div> */}
      </form>

    </section>
  )
}

export default Info