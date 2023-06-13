"use client";
import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { io } from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<
    { message: String; date: Date; user: String }[]
  >([]);
  const {
    isLoading,
    error,
    data: user,
  } = useQuery("user", async () => {
    if (typeof window !== "undefined") {
      const bearerToken = localStorage.getItem("token");
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/mongoose/user`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

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

  useEffect(() => {
    const fetchChat = async () => {
      if (typeof window !== "undefined") {
        const bearerToken = localStorage.getItem("token");
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/mongoose/messages`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();

          setMessageList(data);
        } catch (err) {
          console.log(err);
          throw err;
        }
      } else {
        throw "window === undefined";
      }
    };
    fetchChat();
  }, []);
  // console.log(messages);
  var socket = io(`${process.env.NEXT_PUBLIC_URL}`);

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

      <div className="flex flex-col-reverse h-full w-[20rem] m-4 bg-white text-black">
        {messageList.map((msg) => {
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
