"use client"

import Image from "next/image";
import Search from "./Search";

export default function Home() {
  const onChange = (e) => {
    console.log(e.target.value);
  }

  const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere tortor vel nisl feugiat porttitor a sed enim. In hac habitasse platea dictumst.";
  
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Australia",
    "Japan",
    "China",
    "Brazil",
    "India",
    "Mexico",
    "South Korea",
    "South Africa"
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <Search description={desc} disabled={false} loading={false} placeholder='placeholder'
      multiple={false} label='Simple Search' onChange={onChange} onInputChange={onChange}
      value="test" options={countries} renderOption={onChange} 
      filterOptions={onChange}/>
    </div>
  );
}
