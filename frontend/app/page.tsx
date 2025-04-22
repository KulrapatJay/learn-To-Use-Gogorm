'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

type Food = {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/foods`)
    .then(res => setFoods(res.data))
    .catch(err => console.error(err));
}, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Foods</h1>
      <ul className="space-y-2">
        {foods.map(food => (
          <li key={food.id} className="border p-4 rounded shadow">
            🍽️ {food.name} - ฿{food.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
