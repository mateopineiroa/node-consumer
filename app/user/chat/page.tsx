"use client";
import { FormEvent, useState } from "react";
import { useQuery } from "react-query";
import { io } from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<
    { message: string; date: Date }[]
  >([]);
  const {
    isLoading,
    error,
    data: user,
  } = useQuery("user", async () => {
    if (typeof window !== "undefined") {
      const bearerToken = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:3000/mongoose/user", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = res.json();

        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      throw "window === undefined";
    }
  });

  const {
    isLoading: isLoadingMessages,
    error: errorMessages,
    data: messages,
  } = useQuery("messages", async () => {
    if (typeof window !== "undefined") {
      const bearerToken = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:3000/mongoose/messages", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      throw "window === undefined";
    }
  });
  console.log(messages);
  var socket = io("http://localhost:3000");

  const handleSubmit = (
    e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    socket.emit("chat message", { message, user });
    setMessage("");
  };

  socket.on("chat message", (msg) => {
    setMessageList([...messageList, msg]);
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          placeholder="Send a message"
          className="text-black rounded-md m-4"
        />
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>

      <div className="h-full w-[20rem] m-4 bg-white text-black">
        {!isLoadingMessages &&
          !errorMessages &&
          messages.map((msg: { message: string; date: Date; user: string }) => {
            const msgDate = new Date(msg.date);
            return (
              <div className="flex justify-between" key={msg.date.toString()}>
                <div>
                  <p>Message: {msg.message}</p>
                  <p>
                    {msgDate.getDate()}/{msgDate.getMonth()}/
                    {msgDate.getFullYear()}, {msgDate.getHours()}:
                    {msgDate.getMinutes()}:{msgDate.getSeconds()}
                  </p>
                </div>
                <p>User: {msg.user}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chat;
