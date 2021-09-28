import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

let count2 = 0;

interface Response {
  page: number
}

const Inicio: FC = () => {
  const [count1, setCount1] = useState(0);
  const [data, setData] = useState<Response>();
  
  useEffect(() => {
    let _mounted = true;
    axios.get<Response>('https://reqres.in/api/users?page=2')
      .then(result => {
        _mounted && setData(result.data);
      })
    return () => {
      _mounted = false;
    }
  }, []);
  
  useEffect(() => {
    axios.get<Response>(`https://reqres.in/api/users?page=${count1}`)
      .then(result => {
        setData(result.data);
      })
  }, [count1])
  
  return (
    <div>
      <p>Count1 {count1}</p>
      <p>Count2 {count2}</p>
      <button onClick={() => setCount1(count1+1)}>
        Count 1
      </button>
      <button onClick={() => count2++}>
        Count 2 sresult.data
      </button>
      {data && (
        <p>{data.page}</p>
      )}
    </div>
  );
}

export default Inicio;
