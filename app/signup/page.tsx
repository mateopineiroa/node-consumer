"use client";
import { useState } from "react";

import Button, { ButtonType } from "@/Components/Button/Button";
import Input from "@/Components/Input";
import { InputMode } from "@/Components/Input/Input";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-learning-node.onrender.com/mongoose/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);

        router.push("/user/items");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-full">
      <form className="flex flex-col gap-4">
        <p>Create an account in the Mateo web</p>

        <Input
          label="Username"
          Type={InputMode.Text}
          formData={formData}
          fieldName="username"
          setFormData={setFormData}
        />

        <Input
          label="Password"
          Type={InputMode.Password}
          formData={formData}
          fieldName="password"
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

export default SignUp;
