"use client";
import Button, { ButtonType } from "@/Components/Button/Button";
import Input from "@/Components/Input";
import { InputMode } from "@/Components/Input/Input";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";

const USER_DATA = {
  username: "test",
  password: "testPass",
};

const Login = () => {
  const [formData, setFormData] = useState(USER_DATA);
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-learning-node.onrender.com/mongoose/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      localStorage.setItem("token", data.token);

      if (data.token) {
        route.push("/");
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
        <p>Login to Mateo web</p>

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

export default Login;
