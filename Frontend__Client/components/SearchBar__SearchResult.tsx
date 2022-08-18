import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from '../styles/SearchBar__SearchResult.module.scss'
interface SearchBarProps {
	inputSearch: string
	setInputSearch: any
	type: string
	setType: any

	setTypeTemp: any
	setInputSearchTemp: any
	typeTemp: string
	inputSearchTemp: string
	
	typeRef: any
}

const SearchBar__SearchResult = (props: SearchBarProps) => {
	
	const handleSearch = (e: any) => {
		e.preventDefault()
	}
	let temp = '';
	const handleChangeType = (event: any, value) => {
		// props.setTypeTemp(event.target.value)
		// temp = event.target.value;
		props.setTypeTemp(value)
	}

	const handleOnClick = (event: any) => {
		props.setType(props.typeTemp)
		props.setInputSearch(() => props.inputSearchTemp)
	}
	return (
		<>
			<Box
				sx={{
					width: '100%',
					height: '140px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						width: '80%',
						minWidth: '600px',
						height: '100%',
						p: '40px 30px',
					}}
				>
					<form noValidate autoComplete='off' onSubmit={handleSearch} className={styles.form}>
						<TextField
							fullWidth
							id='standard-search'
							label='Looking for something?'
							type='search'
							variant='standard'
							onChange={(e) => props.setInputSearchTemp(e.target.value)}
							sx={{
								'& label': {
									color: '#6A35F2',
									fontSize: '1.1rem',
									fontWeight: '500',
									userSelect: 'none',
								},
								'& label:after': { color: '#6A35F2' },
								'& div:before': { borderColor: '#6A35F2' },
								'& input': { color: '#6A35F2' },
								'& .Mui-focused': { color: '#6A35F2' },
								'& .MuiInput-underline:after': { borderBottomColor: '#6A35F2' },
								'& .css-1r19i84-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
									borderBottomColor: '#6A35F2',
								},
							}}
						/>
						<Box sx={{ minWidth: 120, mr: 2 }}>
							<FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id='demo-simple-select-label' sx={{ color: '#6A35F2' }}>
									Type
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={props.typeTemp}
									onChange={(e) => props.setTypeTemp(e.target.value)}
									ref={props.typeRef}
									sx={{
										'& .MuiSelect-select:before': { color: '#6A35F2', borderBottomColor: '#6A35F2' },
										'& .MuiSelect-iconStandard': { color: '#6A35F2' },
										'& .MuiSelect-standard:before': { color: '#6A35F2', borderBottomColor: '#6A35F2' },
										'& .MuiSelect-standard:after': { color: '#6A35F2', borderBottomColor: '#6A35F2' },
										'& .css-cgt953-MuiInputBase-root-MuiInput-root-MuiSelect-root:before': {
											color: '#6A35F2',
											borderBottomColor: '#6A35F2',
										},
										'&:before': { borderBottomColor: '#6A35F2' },
										'&:hover:not(.Mui-disabled):before': { borderBottomColor: '#6A35F2' },
										'&:after': { borderBottomColor: '#6A35F2' },
										'&:active': { borderBottomColor: '#6A35F2' },
										'& *': { color: '#6A35F2 !important' },
									}}
								>
									<MenuItem value={0}>Conference</MenuItem>
									<MenuItem value={1}>Combo</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<SearchIcon onClick={handleOnClick} className={styles.searchIcon} />
					</form>
				</Box>
			</Box>
		</>
	)
}

export default SearchBar__SearchResult
