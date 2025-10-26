import { useNavigate } from "react-router-dom"

const Card = ({ item }) => {

  const navigate = useNavigate()

  function handleClick(e) {
    navigate(`/products/${item?._id}`)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className='bg-gray-300 rounded-xl'><img src={item?.imgPaths?.[0]} alt={item?.title} /></div>
      <div className='font-semibold flex flex-col gap-1 mt-4'>
        <h2 className='text-lg'>{item?.title}</h2>
        <span className='text-xl'>{item?.price}</span>
      </div>
    </div>
  )
}

export default Card