import React, { useState, useContext, useEffect } from 'react'
import Review from './Review';
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { motion } from 'framer-motion';
import LoginContext from "../../store/context/login-context.js";
import { ToLink } from '../../constants';
import axios from 'axios';

const stars = [{ id: 1, fill: false }, { id: 2, fill: false }, { id: 3, fill: false }, { id: 4, fill: false }, { id: 5, fill: false }];
const onetime = 5;

const ReviewComponent = ({ productid }) => {
    const [review, setReview] = useState(false);
    const [framerAction, setFramerAction] = useState(false);
    const [starFill, setStarFill] = useState(stars);
    const [reviewData, setReviewData] = useState({
        title: '',
        description: '',
        rating: 0
    });
    const [AllReviews, setAllReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState({});
    const loginCtx = useContext(LoginContext);

    const [reviewIdx, setReviewIdx] = useState({
        start: 0,
        end: onetime
    });

    const changeReviewIdx = (e, key) => {
        if (key === 'next' && reviewIdx.end < AllReviews.length) {
            setReviewIdx({ start: reviewIdx.start + onetime, end: reviewIdx.end + onetime });
        } else if (key === 'prev' && reviewIdx.start > 1) {
            setReviewIdx({ start: reviewIdx.start - onetime, end: reviewIdx.end - onetime });
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [productid]);

    const fetchReviews = async () => {
        try {
            const resp = await axios.get(`${ToLink}/product_data/products/${productid}/reviews`);
            setAllReviews(resp.data.data.reviews);
            let temp = {};
            resp.data.data.reviews.forEach((review) => {
                if (temp[review.rating]) {
                    temp[review.rating] += 1;
                } else {
                    temp[review.rating] = 1;
                }
            });
            temp.avg = 0;
            for (let i = 1; i <= 5; i++) {
                if (!temp[i]) {
                    temp[i] = 0;
                }
                temp.avg += i * temp[i];
            }
            temp.avg = temp.avg / resp.data.data.reviews.length;
            if (temp.avg === NaN) {
                temp.avg = 0;
            }
            setReviewStats(temp);
        } catch (error) {
            console.log(error);
        }
    }
    const showHideReview = () => {
        setFramerAction(!framerAction);
        setTimeout(() => {
            setReview(!review);
        }, 500);
    };

    const starsfillHandler = (e, index) => {
        let temp = starFill.map((item, i) => {
            if (i <= index) {
                return { ...item, fill: true };
            } else {
                return { ...item, fill: false };
            }
        });
        setStarFill(temp);
        setReviewData({ ...reviewData, rating: index + 1 });
    }

    const reviewaddHandler = (e, key) => {
        setReviewData({ ...reviewData, [key]: e.target.value });
    }

    const submitReviewHandler = async () => {
        const data = {
            title: reviewData.title,
            description: reviewData.description,
            rating: reviewData.rating
        }
        if (data.title === '' || data.description === '' || data.rating === 0) {
            alert('Please fill all the fields');
            return;
        }
        if (loginCtx.token === null) {
            alert('Please login to write a review');
            return;
        }
        try {
            const resp = await axios.post(`${ToLink}/product_data/products/${productid}/reviews`, data, {
                headers: {
                    Authorization: `Bearer ${loginCtx.token}`
                }
            });

            $('#modalLoginForm').modal('hide');
            setReviewData({
                title: '',
                description: '',
                rating: 0
            });
            setStarFill(stars);
            console.log(resp);
            fetchReviews();
        } catch (error) {
            console.log(error);
        }
    }

    const variants = {
        show: {
            // scaleY: 1,
            height: 'auto',
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        hide: {
            // scaleY: 0,
            height: 150,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        },
        exit: {
            // scaleY: 0,
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        }
    };
    return (
        // Tailwind CSS
        <div>
            {!review && <motion.div
                // key={framerAction}
                variants={variants}
                initial='show'
                animate={framerAction ? 'hide' : 'show'}
                exit="exit"
                class='font-bold p-5 text-2xl' onClick={showHideReview}> Reviews</motion.div>}
            {review && <motion.div
                // key={framerAction}
                variants={variants}
                initial='hide'
                animate={framerAction ? 'show' : 'hide'}
                exit="exit">
                <div className='d-flex justify-content-center'>
                    <div class="w-3/4 border-1 border-white-500 rounded ">
                        <div class=" mx-auto max-w-screen-md px-10 py-4">
                            <div class="flex w-full flex-col">
                                <div class="flex flex-col sm:flex-row" >
                                    <h1 class="max-w-sm text-3xl font-bold text-blue-900" onClick={showHideReview}>
                                        Reviews
                                    </h1>
                                    <div class="my-4 rounded-xl bg-white py-2 px-4 shadow sm:my-0 sm:ml-auto">
                                        <div class="flex h-16 items-center text-2xl font-bold text-blue-900">
                                            <RiStarSFill color='orange' />
                                            {(reviewStats.avg) ? reviewStats.avg.toFixed(2) : 0}
                                        </div>
                                        <p class="text-sm text-gray-500">Average Rating</p>
                                    </div>
                                </div>
                                <div class="text-gray-700">
                                    <p class="font-medium">Reviews</p>
                                    <ul class="mb-6 mt-2 space-y-2">
                                        <li class="flex items-center text-sm font-medium">
                                            <span class="w-3">5</span
                                            ><span class="mr-4 text-yellow-400"
                                            > <RiStarSFill color='orange' size='20' /></span>
                                            <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                                <div className={`h-full bg-yellow-400`}
                                                    style={{
                                                        width: `${(reviewStats[5] ? reviewStats[5] : 0) / (AllReviews.length * 1) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <span class="w-3">{reviewStats[5] ? reviewStats[5] : 0}</span>
                                        </li>
                                        <li class="flex items-center text-sm font-medium">
                                            <span class="w-3">4</span
                                            ><span class="mr-4 text-yellow-400"
                                            > <RiStarSFill color='orange' size='20' /></span>
                                            <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                                <div class="h-full bg-yellow-400"
                                                    style={{
                                                        width: `${(reviewStats[4] ? reviewStats[4] : 0) / (AllReviews.length * 1) * 100}%`
                                                    }}></div>
                                            </div>
                                            <span class="w-3">{reviewStats[4] ? reviewStats[4] : 0}</span>
                                        </li>
                                        <li class="flex items-center text-sm font-medium">
                                            <span class="w-3">3</span
                                            ><span class="mr-4 text-yellow-400"
                                            > <RiStarSFill color='orange' size='20' /></span>
                                            <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                                <div class="h-full  bg-yellow-400"
                                                    style={{
                                                        width: `${(reviewStats[3] ? reviewStats[3] : 0) / (AllReviews.length * 1) * 100}%`
                                                    }}></div>
                                            </div>
                                            <span class="w-3">{reviewStats[3] ? reviewStats[3] : 0}</span>
                                        </li>
                                        <li class="flex items-center text-sm font-medium">
                                            <span class="w-3">2</span
                                            ><span class="mr-4 text-yellow-400"
                                            > <RiStarSFill color='orange' size='20' /></span>
                                            <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                                <div class="h-full  bg-yellow-400"
                                                    style={{
                                                        width: `${(reviewStats[2] ? reviewStats[2] : 0) / (AllReviews.length * 1) * 100}%`
                                                    }}></div>
                                            </div>
                                            <span class="w-3">{reviewStats[2] ? reviewStats[2] : 0}</span>
                                        </li>
                                        <li class="flex items-center text-sm font-medium">
                                            <span class="w-3">1</span
                                            ><span class="mr-4 text-yellow-400"
                                            > <RiStarSFill color='orange' size='20' /></span>
                                            <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                                                <div class="h-full  bg-yellow-400"
                                                    style={{
                                                        width: `${(reviewStats[1] ? reviewStats[1] : 0) / (AllReviews.length * 1) * 100}%`
                                                    }}></div>
                                            </div>
                                            <span class="w-3">{reviewStats[1] ? reviewStats[1] : 0}</span>
                                        </li>
                                    </ul>
                                </div>
                                {loginCtx.isLoggedIn && <button data-toggle="modal" data-target="#modalLoginForm" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" >Write a review</button>}


                                {/* Bootstrap CSS */}
                                <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header text-center">
                                                <h4 class="modal-title w-100 font-weight-bold">Write a Review</h4>
                                                <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body mx-3">
                                                <div class='row'>
                                                    <div class='col-4'>
                                                        <div className='d-flex my-2'>
                                                            {starFill.map((star, index) => {
                                                                return (
                                                                    <div key={index} onClick={(e) => starsfillHandler(e, index)}>
                                                                        {star.fill ? <RiStarSFill color='orange' size='20' /> : <RiStarSLine color='orange' size='20' />}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div class="col-8 form-floating mb-3 ">
                                                        <input type="text" class="form-control" id="floatingInput" placeholder="Title" value={reviewData.title} onChange={(e) => reviewaddHandler(e, 'title')} maxLength={30} />
                                                        <label class='mx-2' for="floatingInput">Title</label>
                                                    </div>
                                                </div>


                                                <div class="form-floating">
                                                    <textarea class="form-control" placeholder="Description" id="floatingTextarea" value={reviewData.description} onChange={(e) => reviewaddHandler(e, 'description')} maxLength={1000} ></textarea>
                                                    <label for="floatingTextarea">Description</label>
                                                </div>

                                            </div>
                                            <div class="modal-footer d-flex justify-content-center ">
                                                <button class="btn btn-primary " onClick={submitReviewHandler}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>

                {AllReviews.length > 0 && AllReviews.map((item, index) => {
                    if (index < reviewIdx.start || index >= reviewIdx.end) {
                        return null;
                    }
                    return <Review item={item} stars={stars} />
                })}
                {AllReviews.length === 0 && <div class="flex justify-content-center">
                    <p class="text-2xl font-bold text-gray-500">No Reviews Found</p>
                </div>}


                {AllReviews.length > onetime && <div class="flex justify-content-center">
                    <p class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={(e) => changeReviewIdx(e, 'prev')}>
                        <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Previous
                    </p>
                    <p class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={(e) => changeReviewIdx(e, 'next')}>
                        Next
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </p>
                </div>}
            </motion.div>}
        </div>
    )
}

export default ReviewComponent;