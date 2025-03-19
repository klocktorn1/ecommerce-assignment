import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      alert("wrong. Hint - username: admin, password: admin ");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  });

  return (
    <>
      <div
        className="flex justify-center h-100 items-center"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <form action="" className="flex flex-col gap-3">
          <input
            className="bg-blue-950"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="bg-blue-950"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};
