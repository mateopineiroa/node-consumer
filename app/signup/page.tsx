"use client";
import { useState } from "react";

import Button, { ButtonType } from "@/components/Button/Button";
import Input from "@/components/Input";
import { InputMode } from "@/components/Input/Input";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const onSubmit = async () => {
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

        <Button type={ButtonType.Button} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
