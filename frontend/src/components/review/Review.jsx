import React from 'react'
import { RiStarSFill, RiStarSLine } from "react-icons/ri";


const Review = ({ item, stars }) => {
    // console.log(item);
    const date = new Date(item.date);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const dateStr = date.toLocaleString('en-US', options);

    const rating = item.rating;

    return (
        // <div class='d-flex justify-content-center' id={item._id}>
        //     <ul class="w-full">
        //         <li class="py-1 text-left border px-4 m-1 rounded">
        //             <div class="flex items-start">
        //                 <img class="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle" src={item.user_id.image} alt="" />

        //                 <div class="ml-6">
        //                     <div class="flex items-center">
        //                         {
        //                             stars.map((star, index) => {
        //                                 if (index * 1 < rating * 1) {
        //                                     return <RiStarSFill key={index} color='orange' />
        //                                 } else {
        //                                     return <RiStarSLine key={index} color='orange' />
        //                                 }
        //                             })
        //                         }
        //                     </div>
        //                     <h5>{item.title}</h5><p class=" text-base text-white-900">{item.description}</p>
        //                     <div class="inline-flex text-sm font-bold text-slate-900">{item.user_id.name}</div> 
        // <div class="inline-flex text-sm text-slate-600">{dateStr}</div>
        //                 </div>
        //             </div>
        //         </li>
        //     </ul>

        // </div>
        <div style={{
            padding: '20px',
            paddingBottom: '0px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>

            <div class="mb-12 pb-12 border-bottom border-dark-light" id={item._id}>
                <div class="d-flex mb-6 align-items-center">

                    <div style={{ width: '100%' }}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <img class="block flex-shrink-0 rounded-full align-middle" style={{
                                    width: '40px',
                                    height: '40px',
                                    objectFit: 'cover',
                                    mixBlendMode: 'color-dodge',
                                }} src={item.user_id.image} alt="" />


                                <div class="d-block fw-bold text-white">{item.user_id.name}</div>
                            </div>
                            <div class="text-sm text-slate-600">{dateStr}</div>
                        </div>
                        <span>
                            <div class="flex items-center">
                                {
                                    stars.map((star, index) => {
                                        if (index * 1 < rating * 1) {
                                            return <RiStarSFill key={index} color='orange' />
                                        } else {
                                            return <RiStarSLine key={index} color='orange' />
                                        }
                                    })
                                }
                            </div>
                        </span>
                    </div>
                </div>
                <div class="d-flex mb-6 align-items-center">
                    <p class="mb-0" style={{
                        color: 'white',
                        paddingBottom: '10px',
                    }}>{item.description}</p>
                </div>
            </div>
        </div>

    )
}

export default Review;