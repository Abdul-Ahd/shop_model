import React from "react";
export const user = () => {
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const ur = document.getElementById("user").value;
      const pass = document.getElementById("password").value;
      if (!ur.trim() || !pw.trim()) {
        alert("Enter Data First");
      } else {
        const newuser = { user, pw };
        const res = await fetch("http://localhost:3000/task");

        if (res.ok) {
          const response = await fetch("http://localhost:3000/task", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();

          if (data.find((item) => item.user === ur)) {
            alert("User Name Already Taken");
          } else {
            const response = await fetch("http://localhost:3000/task", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newuser),
            });
            const data1 = await response.json();
            console.log(data1);
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return <div>user</div>;
};
