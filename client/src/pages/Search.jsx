import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap'>Search Term:</label>
            <input 
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='p-3 border rounded-lg w-full'
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>

            <label className='font-semibold'>Type: </label>

            <div className='flex gap-2'>
              <input type='checkbox' id='all' className='w-5'/>
              <span>Rent & Sale</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5'/>
              <span>Rent</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'/>
              <span>Sale</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5'/>
              <span>Offer</span>
            </div>
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities: </label>

            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5'/>
              <span>Parking</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5'/>
              <span>Furnished</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>
              Sort:
            </label>
            <select id='sort_order' className='border rounded-lg p-3'>
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <button className='p-3 rounded-lg bg-slate-900 uppercase text-white hover:opacity-90'>Search</button>

        </form>
      </div>

      <div className=''>
        <h1 className='font-semibold text-3xl border-b p-3 text-slate-700 mt-6'>Listing results: </h1>
      </div>
    </div>
  )
}