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
}

const SearchBar__SearchResult = (props: SearchBarProps) => {
		const handleSearch = (e: any) => {
			e.preventDefault()
		
		}
		const handleChangeType = (event: any) => {
			props.setType(event.target.value)
		}
		const handleOnClick = (event: any) => {
			// console.log(props.type)
			// console.log(props.inputSearch)
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
							onChange={e => props.setInputSearch(e.target.value)}
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
								'& .css-1r19i84-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': { borderBottomColor: '#6A35F2' },
								
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
									value={props.type}
									onChange={handleChangeType}
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
									<MenuItem value={10}>Event</MenuItem>
									<MenuItem value={20}>Combo</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<SearchIcon type="submit" onClick={handleOnClick} className={styles.searchIcon} />
					</form>
				</Box>
			</Box>
		</>
	)
}

export default SearchBar__SearchResult