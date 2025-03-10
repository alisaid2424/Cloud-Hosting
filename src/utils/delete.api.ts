"use server";
import { returnTokenCookie, secureToken } from "./cookies.api";

const baseUrl = process.env.baseUrl;

export async function DeleteRow({ url }: { url: string }) {
  const isToken = await returnTokenCookie();
  const token = await secureToken(isToken?.value || "");

  const res = await fetch(`${baseUrl}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  // const contentType = res.headers.get("content-type");
  console.log("res::", res);
  if (res.status === 200) {
    return { success: true };
  }
  const result = await res.json();
  console.log("resultsda", result);
  if (typeof result !== "object") {
    return { result, success: Boolean(res.ok) };
  }
  return result;
  // if (res.ok) {
  //   // Handle JSON or text response
  //   if (contentType && contentType.indexOf("application/json") !== -1) {
  //     return res.json();
  //   } else {
  //     return res.text();
  //   }
  // } else {
  //   // Report the error and throw it

  //   return `Server responded with status `;
  // }
}
