import React from 'react' 
import { useState, useEffect } from 'react' 
 
const ServerSideExample: React.FC<any> = ({data}) => {
     return <>{data && data.map((item: any) => <p key={item.name}>{item.name}</p>)}</>
} 

export async function getStaticProps() {
    console.log("request")
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json();
    return {
        props: { data }
    }
}

 export default ServerSideExample