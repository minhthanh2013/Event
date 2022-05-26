
import Container from '@material-ui/core/Container'
import {Paper , Button} from '@mui/material'
import React, { useRef, useState } from "react";
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Pagination, Navigation } from "swiper";

import Background from './Background';
import Box from '@material-ui/core/Box';



interface CarouselSlideProps {}


const CarouselSlide = (props: CarouselSlideProps) => {
    const lists = [
        {id: 1, title: 'title1', content: 'content1'},
      
    ]

    
  return (
		<>
			<Box sx={{boxShadow:"0px 4px 5px -2px rgb(0 0 0 / 20%), 0px 7px 10px 1px rgb(0 0 0 / 14%), 0px 2px 16px 1px rgb(0 0 0 / 12%)"}}>
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					navigation={true}
					modules={[Pagination, Navigation]}
					className="mySwiper"
				>
					{lists.map((list) => (
						<SwiperSlide key={list.id}>
							<Box>
								<Typography
									sx={{
										fontWeight: "500",
										fontSize: "3.1rem",
										"-webkit-user-select": "none",
										"user-select": "none",
									}}
								>
									Traders Fair and Gala Night 2022
								</Typography>

								<Typography
									sx={{
										background:
											"linear-gradient(90deg, #C64EFF 55.78%, rgba(184, 64, 233, 0.665587) 88.26%, rgba(207, 77, 247, 0) 125.43%)",
										"-webkit-background-clip": "text",
										"-webkit-text-fill-color": "transparent",
										fontSize: "3.1rem",
										fontWeight: "500",
										"-webkit-user-select": "none",
										"user-select": "none",
									}}
								>
									Vietnam
								</Typography>

								<Typography
									sx={{
										fontSize: "1.1rem",
										fontWeight: "400",
										my: "44px",
										"-webkit-user-select": "none",
										"user-select": "none",
									}}
								>
									Series of Fantastic Traders Fairs is going to take place in
									Asia attracting the world of traders to one place during in
									one day and has yet again come to Vietnam, HCMC.
								</Typography>

								<Button
									sx={{
										fontSize: "1.1rem",
										fontWeight: "500",
										background:
											"linear-gradient(90deg, #C64EFF 55.78%, rgba(184, 64, 233, 0.665587) 88.26%, rgba(207, 77, 247, 0) 125.43%)",
										"-webkit-background-clip": "text",
										"-webkit-text-fill-color": "transparent",
										border: "1px solid rgba(184, 64, 233, 0.665587)",
										"&:hover": {
											borderColor: "rgba(184, 64, 233, 0.2)",
										},
									}}
									variant="outlined"
								>
									Explor more
								</Button>
							</Box>
							<Box>
								<Box>
									<Typography
										sx={{
											mt: "45px",
											fontWeight: "500",
											fontSize: "1.8rem",
											"-webkit-user-select": "none",
											"user-select": "none",
										}}
									>
										Date & Location
									</Typography>
									<Typography
										sx={{
											my: "40px",
											mr: "22px",
											display: "flex",
											textAlign: "left",
											alignItems: "center",
											fontWeight: "400",
											fontSize: "1.1rem",
											"-webkit-user-select": "none",
											"user-select": "none",
										}}
									>
										<AccessAlarmIcon sx={{ ml: "22px", mr: "38px" }} />
										10:00 AM – 9:00 PM – Saturday, Dec 10,{" "}
									</Typography>
									<Typography
										sx={{
											mb: "40px",
											mr: "22px",
											display: "flex",
											textAlign: "left",
											alignItems: "center",
											fontWeight: "400",
											fontSize: "1.1rem",
											"-webkit-user-select": "none",
											"user-select": "none",
										}}
									>
										<LocationOnIcon sx={{ ml: "22px", mr: "38px" }} />
										Windsor Plaza Hotel – 18 An Duong Vuong Street, District 5,
										Ho Chi Minh City
									</Typography>

									<Button
										sx={{
											mb: "45px",
											fontSize: "1.1rem",
											fontWeight: "500",
											color: "white",
											border: "1px solid white",
											minWidth: "70%",
											"&:hover": {
												borderColor: "rgba(255,255, 255, 0.2)",
											},
										}}
										variant="outlined"
									>
										Buy ticket ($ 10.00)
									</Button>
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
			`}</style>
		</>
	);
}
export default CarouselSlide

