
const PartFilter = ({ children, title, setOpen, open }) => {
  return (
    <div className='pb-2 border-b border-gray-200'>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        <span onClick={() => setOpen(prev => !prev)} className={`cursor-pointer transition-all duration-300 block w-fit ${open ? 'rotate-90' : ""}`}>
          <i className="fas fa-arrow-right"></i>
        </span>
      </div>
      {children}
    </div>
  )
}

export default PartFilter