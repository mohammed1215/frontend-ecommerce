import Card from '../Card'

const Cards = ({ data }) => {
  console.log("data in cards", data.data)
  return (
    <div className='grid grid-flow-col auto-cols-[200px] md:auto-cols-fr  gap-5 overflow-x-auto  mt-6 '>
      {data.data?.length > 0 && data.data.map((item, index) => (
        index < 5 && (<Card key={item._id} item={item} />)
      ))}
    </div>
  )
}

export default Cards