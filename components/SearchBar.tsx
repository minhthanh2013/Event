
import { Box } from '@mui/material'
import React from 'react'
import { Typography } from '@mui/material'
interface SearchBarProps {}

const SearchBar = (props: SearchBarProps) => {
  return (
    <>
      <Box sx={{width: '100%', height:'140px',display:"flex", position:"absolute", mt:"-70px", zIndex:"1", justifyContent:"center", alignItems:"center"}}>
        <Box sx={{bgcolor: "#180A3D", width:"80%", minWidth:"600px",height:"100%", borderRadius:"30px", boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', p:"40px 30px"}}>
          <Typography>Hello world</Typography>
        </Box>
      </Box>
    </>
  )
}


export default SearchBar