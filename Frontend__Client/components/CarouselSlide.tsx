import Container from '@material-ui/core/Container'
import { Paper, Button, Link } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Pagination, Navigation } from 'swiper'
import Box from '@material-ui/core/Box'
import { splitNum } from '../GlobalFunction/SplitNumber'

interface CarouselSlideProps {
    status: boolean
    data: CarouselSlideProp[]
}

interface CarouselSlideProp {
    conference_id: number
    description: string
    price: number
    conference_name: number
    date_start_sell: Date
    date_end_sell: Date
    date_start_sell_string: string
    date_end_sell_string: string
    address: string
    // conferenceOrganizer: string;
    handleToggle: any
}
const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const CarouselSlide = (props: any) => {
    const [ticketList, setTicketList] = useState<CarouselSlideProps>()

    const [dateMap, setDateMap] = useState<Map<number, string>>()

    // 'conference-1-avatar '
    useEffect(() => {
        const fetchTicketList = async () => {
            let request = '/api/conference/get-latest-x';
            if (props?.tempDecode !== undefined && props?.tempDecode.sub !== undefined) {
                request = `/api/conference/get-latest-x?userId=${props.tempDecode?.sub}`
            }
            const dataResult = await fetch(request)
            const cateResult = await dataResult.json()
            console.log(cateResult)
            setTicketList(cateResult)
        }
        fetchTicketList()
    }, [props?.tempDecode])

    const test = (date: Date) => {
        // 9:00 PM – Saturday, Dec 10,{" "}
        const newDate = new Date(date)
        let hours = newDate.getHours()
        let minutes = newDate.getMinutes()
        let ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        let minuteString = minutes < 10 ? '0' + minutes : minutes
        const dateString =
            hours.toString() +
            ':' +
            minuteString.toString() +
            ' ' +
            ampm +
            ' - ' +
            weekday[newDate.getDay()] +
            ', ' +
            newDate.toLocaleString('en-us', { month: 'short' }) +
            ' ' +
            newDate.getDate().toString()
        return dateString
    }
    return (
        <>
            <Box>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className='mySwiper'
                    autoplay
                >
                     {ticketList?.data.map((list) => ( 
                    // {/* {[1,2,3,4].map((list) => (  */}
                        <SwiperSlide key={list?.conference_id}>
                            <Box sx={{ maxHeight: '870px' }}>
                                <Typography
                                    sx={{
                                        fontWeight: '500',
                                        fontSize: '3.1rem',
                                        '-webkit-user-select': 'none',
                                        'user-select': 'none',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        '-webkit-line-clamp': '3',
                                        'line-clamp': '3',
                                        '-webkit-box-orient': 'vertical',
                                    }}
                                >
                                    {list?.conference_name}
                                </Typography>

                                <Typography
                                    sx={{
                                        background:
                                            'linear-gradient(90deg, #C64EFF 55.78%, rgba(184, 64, 233, 0.665587) 88.26%, rgba(207, 77, 247, 0) 125.43%)',
                                        '-webkit-background-clip': 'text',
                                        '-webkit-text-fill-color': 'transparent',
                                        fontSize: '3.1rem',
                                        fontWeight: '500',
                                        '-webkit-user-select': 'none',
                                        'user-select': 'none',
                                    }}
                                >
                                    Vietnam
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontWeight: '400',
                                        my: '44px',
                                        '-webkit-user-select': 'none',
                                        'user-select': 'none',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        '-webkit-line-clamp': '6',
                                        'line-clamp': '6',
                                        '-webkit-box-orient': 'vertical',
                                    }}
                                >
                                    {list?.description || 'No description'}
                                </Typography>

                                <Button
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontWeight: '500',
                                        background:
                                            'linear-gradient(90deg, #C64EFF 55.78%, rgba(184, 64, 233, 0.665587) 88.26%, rgba(207, 77, 247, 0) 125.43%)',
                                        '-webkit-background-clip': 'text',
                                        '-webkit-text-fill-color': 'transparent',
                                        border: '1px solid rgba(184, 64, 233, 0.665587)',
                                        '&:hover': {
                                            borderColor: 'rgba(184, 64, 233, 0.2)',
                                        },
                                    }}
                                    variant='outlined'
                                    href={`/event/${list?.conference_id}`}
                                >
                                    Explore more
                                </Button>
                            </Box>
                            <Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            mt: '45px',
                                            fontWeight: '500',
                                            fontSize: '1.8rem',
                                            '-webkit-user-select': 'none',
                                            'user-select': 'none',
                                        }}
                                    >
                                        Date & Location
                                    </Typography>
                                    <Typography
                                        sx={{
                                            my: '40px',
                                            mr: '22px',
                                            display: 'flex',
                                            textAlign: 'left',
                                            alignItems: 'center',
                                            fontWeight: '400',
                                            fontSize: '1.1rem',
                                            '-webkit-user-select': 'none',
                                            'user-select': 'none',
                                        }}
                                    >
                                        <AccessAlarmIcon sx={{ ml: '22px', mr: '38px' }} />
                                        {/* 10:00 AM – 9:00 PM – Saturday, Dec 10,{" "} */}
                                        {test(list?.date_start_sell)}
                                        <br />
                                        {test(list?.date_end_sell)}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mb: '40px',
                                            mr: '22px',
                                            display: 'flex',
                                            textAlign: 'left',
                                            alignItems: 'center',
                                            fontWeight: '400',
                                            fontSize: '1.1rem',
                                            '-webkit-user-select': 'none',
                                            'user-select': 'none',
                                        }}
                                    >
                                        <LocationOnIcon sx={{ ml: '22px', mr: '38px' }} />
                                        {list?.address ? list.address : 'Zoom'}
                                    </Typography>

                                    <Link href={`/event/${list.conference_id}?isBuy=true`} sx={{textDecoration: 'none !important'}}>
                                        <Button
                                            onClick={props.handleToggle}
                                            sx={{
                                                mb: '45px',
                                                fontSize: '1.1rem',
                                                fontWeight: '500',
                                                color: 'white',
                                                border: '1px solid white',
                                                minWidth: '70%',
                                                '&:hover': {
                                                    borderColor: 'rgba(255,255, 255, 0.2)',
                                                },
                                            }}
                                            variant='outlined'
                                        >
                                            {/* `${splitNum(Total)} VNĐ` || '' */}
                                            Buy ticket ({list?.price ? `${splitNum(list.price)} VNĐ` : '0'})
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            <style global jsx>{`
                .swiper-button-prev {
                    color: #ffffff;
                }

                .swiper-button-next {
                    color: #ffffff;
                }

                .swiper {
                    width: 90%;
                    border-radius: 15px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    min-width: 1100px;
                }

                .swiper-slide {
                    text-align: center;
                    font-size: 18px;
                    background: #0c1a22;
                    display: flex;
                }

                .swiper-slide img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .swiper-slide > div {
                    margin: 0px auto;
                    color: #ffffff;
                }

                .swiper-slide > div:nth-child(1) {
                    display: flex;
                    width: 50%;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                    padding-top: 72px;
                    padding-left: 175px;
                    padding-bottom: 150px;
                }

                .swiper-slide > div:nth-child(2) {
                    display: flex;
                    width: 50%;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .swiper-slide > div:nth-child(2) > div {
                    width: 65%;
                    min-width: 400px;
                    background-color: #180a3d;
                    border-radius: 30px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                }

                .swiper-wrapper {
                    height: 870px;
                }
            `}</style>
        </>
    )
}
export default CarouselSlide
