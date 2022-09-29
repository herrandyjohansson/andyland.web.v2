
import React from 'react'

interface Resturants {
  id: number;
  name: string;
  description: string;
  rating: number;
  latitude: number;
  longitude: number;
}

interface Props {
  visits: Resturants[];
}

const Lab: React.FC<Props> = () => {
  const [data, setData] = React.useState<Resturants[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch('https://andyland-api.azurewebsites.net/api/Resturantes')
      const resturants = await res.json()
      if(resturants) setData(resturants)
      setLoading(false)
    };

    fetchData();
  }, [])


  return (
    <div>
      {loading ? <p>Loading...</p> : data.map(resturant => <p key={resturant.id}>{resturant.name}</p>)}
    </div>
  )
}


export default Lab;