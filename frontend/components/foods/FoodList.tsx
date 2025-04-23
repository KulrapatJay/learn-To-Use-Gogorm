import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'

const FoodList: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Food List</h1>
      </div>
    </div>
  );
};

export default FoodList;