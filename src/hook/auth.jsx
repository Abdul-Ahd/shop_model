import React, { useEffect, useState } from "react";
function userauth() {
  const [tag, set] = useState(false);
  return { tag, set };
}
function log() {
  const [tag1, set1] = useState(false);
  return { tag1, set1 };
}
function getCookie(Name) {
  const name = Name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();

    // Check if the cookie starts with the specified name
    if (cookie.indexOf(name) === 0) {
      // Return the value of the cookie
      return cookie.substring(name.length, cookie.length);
    }
  }

  // Return null if the cookie is not found
  return null;
}

export { log, userauth, getCookie };
