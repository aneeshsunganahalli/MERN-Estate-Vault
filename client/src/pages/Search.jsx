import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { useSelector } from 'react-redux';

export default function Search() {
  const isNotDarkMode = useSelector(state => state.darkMode)
  const navigate = useNavigate()
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading,setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(listings)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if(
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true: false,
        furnished: furnishedFromUrl === 'true' ? true: false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc'
      })
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await res.json();
      if (data.length > 8){
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      setListings(data)
      setLoading(false)
    }

    fetchListings();

  }, [location.search])

    const handleChange = (e) => {
      if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
        setSidebardata({...sidebardata, type: e.target.id})
      }

      if (e.target.id === 'searchTerm'){
        setSidebardata({...sidebardata, searchTerm: e.target.value})
      }

      if(e.target.id === 'offer' || e.target.id === 'furnished' || e.target.id === 'parking') {
        setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true: false})
      }

      if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';

        const order = e.target.value.split('_')[1] || 'desc';

        setSidebardata({...sidebardata, sort, order})
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', sidebardata.searchTerm)
    urlParams.set('type', sidebardata.type)
    urlParams.set('parking', sidebardata.parking)
    urlParams.set('furnished', sidebardata.furnished)
    urlParams.set('offer', sidebardata.offer)
    urlParams.set('sort', sidebardata.sort)
    urlParams.set('order', sidebardata.order)

    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const onShowMoreCLick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9){
      setShowMore(false)
    }
    setListings([...listings,...data])
  }


  return (
    <div className={`${isNotDarkMode? '' : 'text-white'} flex flex-col md:flex-row`}>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap'>Search Term:</label>
            <input 
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='p-3 border rounded-lg w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>

            <label className='font-semibold'>Type: </label>

            <div className='flex gap-2'>
              <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebardata.type === 'all'}/>
              <span>Rent & Sale</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebardata.type === 'rent'}/>
              <span>Rent</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebardata.type === 'sale'}/>
              <span>Sale</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebardata.offer}/>
              <span>Offer</span>
            </div>
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities: </label>

            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebardata.parking}/>
              <span>Parking</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebardata.furnished}/>
              <span>Furnished</span>
            </div>
          </div>

          <div className='  flex items-center gap-2'>
            <label className='font-semibold'>
              Sort:
            </label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className=' text-black border rounded-lg p-3'>
              <option value='regularPrice_desc'>Price high to low</option>
              <option  value='regularPrice_asc'>Price low to high</option>
              <option  value='createdAt_desc'>Latest</option>
              <option  value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button className='p-3 rounded-lg bg-slate-900 uppercase text-white hover:opacity-90'>Search</button>

        </form>
      </div>

      <div className=''>
        <h1 className={`font-semibold text-3xl border-b p-3 ${isNotDarkMode? 'text-slate-700' : 'text-[#abb8c9]' } mt-6`}>
          Listing results: 
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No Listings found</p>
          )}
          {
            loading && (
              <p className='text-xl text-slate-700 w-full text-center'>Loading...</p>
          )}

          {
            !loading && listings && listings.map((listing) => (<ListingItem key={listing._id} listing={listing}/>))
          }

          {
            showMore &&
              <button className='text-green-700 hover:underline p-7 text-center w-full' onClick={() => {
                onShowMoreCLick();
              }}>
                Show more
              </button>
          }
        </div>
      </div>
    </div>
  )
}
