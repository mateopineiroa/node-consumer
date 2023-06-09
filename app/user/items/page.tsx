"use client";

import Item from "@/components/Item";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

type ItemType = {
  name: string;
  description: string;
  dateAcquired: string;
  idx: number;
};

const Items = () => {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery("items", async () => {
    if (typeof window !== "undefined") {
      const bearerToken = localStorage.getItem("token");
      const res = await fetch(
        "https://api-learning-node.onrender.com/mongoose/items",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    } else {
      throw "window === undefined";
    }
  });

  if (isLoading) return "Loading";

  if (error) {
    console.log(error);
    return "Error";
  }
  console.log(items);
  return (
    <div className="flex flex-col gap-6 w-screen h-full p-10">
      <h1 className="text-3xl text-gray-200">Items</h1>

      {items &&
        items.map((item: ItemType, idx: number) => (
          <Item
            key={item.dateAcquired}
            name={item.name}
            description={item.description}
            dateAcquired={item.dateAcquired}
            idx={idx}
          />
        ))}
    </div>
  );
};

export default Items;
