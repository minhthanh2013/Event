
import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { InferGetStaticPropsType } from 'next'

type Data = {
    ISO3: string,
    name: string,
    region: string,
    population_density: string,
}

const Map = ({ countries }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Box>
                {countries.map((country) =>
                (
                    <Box key={country['ISO3']}>
                        <h1>{country.name}</h1>
                        <p>{country.region}</p>
                    </Box>
                )
                )}
            </Box>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3004/countries')
    const countries: Data[] = await res.json()
    return { props: { countries, }, }
}



export default Map
