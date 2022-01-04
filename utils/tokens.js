const prod = process.env.NODE_ENV === "production";

export const createCookie = (token, maxAge) =>
  `token=${token}; Max-Age=${maxAge.toString()}; SameSite=Lax; Path=/; HttpOnly${prod ? "; Secure" : ""
  }`;

// export const removeCookie = () => createCookie("", 0);

export const removeCookie = () => {
  const tok = `token=""; Max-Age=0; SameSite=Lax; Path=/; HttpOnly${prod ? "; Secure" : ""}`
  console.log(tok)
  return (tok)
};