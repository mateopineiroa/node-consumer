"use client";
import Button, { ButtonType } from "@/components/Button/Button";
import Input from "@/components/Input";
import { InputMode } from "@/components/Input/Input";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";

const EMPTY_ITEM = {
  name: "",
  description: "",
};

const AddItem = () => {
  const [formData, setFormData] = useState(EMPTY_ITEM);

  const route = useRouter();

  const onSubmit = async () => {
    try {
      const bearer = localStorage.getItem("token");

      await fetch("https://api-learning-node.onrender.com/mongoose/addItem", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-full">
      <form className="flex flex-col gap-4">
        <h2 className="text-2xl text-center">Add Item</h2>

        <Input
          label="Name"
          Type={InputMode.Text}
          formData={formData}
          fieldName="name"
          setFormData={setFormData}
        />
        <Input
          label="Description"
          Type={InputMode.Text}
          formData={formData}
          fieldName="description"
          setFormData={setFormData}
        />

        <Button type={ButtonType.Button} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
