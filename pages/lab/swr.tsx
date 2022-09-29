import React from 'react'
import useSWR from 'swr'

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

function useFetchResturantById (id: number) {
    const { data, error } = useSWR(`https://andyland-api.azurewebsites.net/api/Resturantes/${id}`, fetcher)

    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }


const SWRExample = () => {
    const { user: resturant, isLoading, isError } =  useFetchResturantById(1)

    if (isError) return <div>failed to load</div>

  return (
    <div>{isLoading ? 'loading...' : resturant.name}</div>
  )
}

export default SWRExample