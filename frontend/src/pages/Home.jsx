import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Joe Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      {/* offerListings */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* rentListings */}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {/* saleListings */}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//CHATGPT REFACTOR -ERRORED THO
{
  /* listing results for offer, sale and rent */
}
{
  /* <div className="w-full flex justify-center">
        <div className="max-w-6xl w-full flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="bg-white rounded-md shadow-md p-4">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {offerListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex flex-col justify-between"
                    style={{ maxHeight: "500px", overflow: "hidden" }}
                  >
                    <ListingItem listing={listing} key={listing._id} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="bg-white rounded-md shadow-md p-4">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rentListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex flex-col justify-between"
                    style={{ maxHeight: "500px", overflow: "hidden" }}
                  >
                    <ListingItem listing={listing} key={listing._id} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="bg-white rounded-md shadow-md p-4">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {saleListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex flex-col justify-between"
                    style={{ maxHeight: "900px", overflow: "hidden" }}
                  >
                    <ListingItem
                      listing={listing}
                      key={listing._id} // Within the ListingItem component <img src={listing.image} alt={listing.title} style={{ maxWidth: "100%", height: "auto" }} />
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div> */
}

// import { useEffect } from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import "swiper/css/bundle";
// import ListingItem from "../components/ListingItem";

// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation]);
//   console.log(saleListings);

//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch("/api/listing/get?offer=true&limit=4");
//         const data = await res.json();
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchRentListings = async () => {
//       try {
//         const res = await fetch("/api/listing/get?type=rent&limit=4");
//         const data = await res.json();
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchSaleListings = async () => {
//       try {
//         const res = await fetch("/api/listing/get?type=sale&limit=4");
//         const data = await res.json();
//         setSaleListings(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchOfferListings();
//   }, []);
//   return (
//     <div>
//       {/* top */}
//       <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
//         <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
//           Find your next <span className="text-slate-500">perfect</span>
//           <br /> place with ease.
//         </h1>
//         <div className="text-gray-400 text-xs sm:text-sm">
//           Joe Estate is the best place to find your next perfect place to live.
//           <br />
//           We have a wide range of properties for you to choose from
//         </div>
//         <Link
//           className="text-xs sm:text-sm text-blue-700 font-bold hover:underline"
//           to={"/search"}
//         >
//           Let's get started
//         </Link>
//       </div>
//       {/* swiper */}
//       <Swiper navigation>
//         {offerListings &&
//           offerListings.length > 0 &&
//           offerListings.map((listing) => (
//             <SwiperSlide key={listing._id}>
//               <div
//                 style={{
//                   background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                   backgroundSize: "cover",
//                 }}
//                 className="h-[500px]"
//                 //key={listing._id}
//               ></div>
//             </SwiperSlide>
//           ))}
//       </Swiper>

//       {/* listing results for offer sale and rent*/}
//       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
//         {offerListings && offerListings.length > 0 && (
//           <div className="">
//             <div className="my-3">
//               <h2 className="text-2xl font-semibold text-slate-600">
//                 Recent offers
//               </h2>
//               <Link
//                 className="text-sm text-blue-800 hover:underline"
//                 to={"/search?offer=true"}
//               >
//                 Show more offers
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-4 flex-row">
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className="flex flex-col">
//             <div className="my-3">
//               <h2 className="text-2xl font-semibold text-slate-600">
//                 Recent places for rent
//               </h2>
//               <Link
//                 className="text-sm text-blue-800 hover:underline"
//                 to={"/search?type=rent"}
//               >
//                 Show more places for rent
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-4 flex-row">
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className="flex flex-col">
//             <div className="my-3">
//               <h2 className="text-2xl font-semibold text-slate-600">
//                 Recent places for sale
//               </h2>
//               <Link
//                 className="text-sm text-blue-800 hover:underline"
//                 to={"/search?type=sale"}
//               >
//                 Show more places for sale
//               </Link>
//             </div>
//             <div className="flex flex-wrap gap-4 ">
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
