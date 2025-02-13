import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem'
import { useSelector } from 'react-redux'


export default function Home() {
  const isNotDarkMode = useSelector(state => state.darkMode)
  const [offerListings,setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])
  console.log(offerListings)

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json();
        setOfferListings(data)
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }
    
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json();
        setRentListings(data)
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json();
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, [])

  return (
    <div >
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className={`${isNotDarkMode? 'text-slate-700' : 'text-[#abb8c9]' } font-bold text-3xl lg:text-6xl`}>
          Find your next <span className={`${isNotDarkMode? 'text-slate-500': 'text-[#758499]'}`}>perfect</span> <br/>place with ease 
        </h1>
        <div className={`${isNotDarkMode? 'text-gray-400' : 'text-[#505762]'} text-xs sm:text-sm`}>
          Estate Vault is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className={`text-xs sm:text-sm ${isNotDarkMode? 'text-blue-800': 'text-[#5876da]'} font-bold hover:underline`}>
          Let's get started...
        </Link>
      </div>
      <Swiper>
        {
          offerListings && offerListings.length > 0 && 
          offerListings.map((listing) => (
            <SwiperSlide>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover"}} className='h-[500px]'></div>
            </SwiperSlide>
          ))
        }
      </Swiper>

        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {
            offerListings && offerListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className={`text-2xl font-semibold ${isNotDarkMode? 'text-slate-600': 'text-[#97a3b5]'}`}>Recent offers</h2>
                  <Link className={`text-sm ${isNotDarkMode? 'text-blue-800': 'text-[#5876da]'} hover:underline`} to={'/search?offer=true'}>
                    Show more offers
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offerListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    )
                  )}
                </div>
              </div>
            )
          }
        </div>

        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {
            rentListings && rentListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className={`text-2xl font-semibold ${isNotDarkMode? 'text-slate-600': 'text-[#97a3b5]'}`}>Recent places for rent</h2>
                  <Link className={`text-sm ${isNotDarkMode? 'text-blue-800': 'text-[#5876da]'} hover:underline`} to={'/search?type=rent'}>
                    Show more offers
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rentListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    )
                  )}
                </div>
              </div>
            )
          }
        </div>

        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {
            saleListings && saleListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className={`text-2xl font-semibold ${isNotDarkMode? 'text-slate-600': 'text-[#97a3b5]'}`}>Recent places for sale</h2>
                  <Link className={`text-sm ${isNotDarkMode? 'text-blue-800': 'text-[#5876da]'} hover:underline`} to={'/search?type=sale'}>
                    Show more offers
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    saleListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    )
                  )}
                </div>
              </div>
            )
          }
        </div>
    </div>
  )
}
