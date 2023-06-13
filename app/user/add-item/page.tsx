"use client";
import Button, { ButtonType } from "@/Components/Button/Button";
import Input from "@/Components/Input";
import { InputMode } from "@/Components/Input/Input";
import { useState } from "react";

const EMPTY_ITEM = {
  name: "",
  description: "",
};

const AddItem = () => {
  const [formData, setFormData] = useState(EMPTY_ITEM);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Button type={ButtonType.Button} onClick={onSubmit}>
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddItem;
