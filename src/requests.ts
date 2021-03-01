import fetch from "node-fetch";
import { userAgent } from "./consts";

const baseHeaders = {
  "User-Agent": userAgent,
  Accept: "*/*",
  "Accept-Language": "zh-CN,en-US;q=0.7,en;q=0.3",
};
export interface IBasicSignInfo {
  courseId: number;
  signId: number;
}

export interface IActiveSign extends IBasicSignInfo {
  isGPS?: 1 | 0;
  isQR?: 1 | 0;
  name: string;
  code: string;
  startYear: number;
  term: string;
  cover: string; // url
}

export type ActiveSignResp = IActiveSign[];

export const activeSign = (openId: string) =>
  fetch(
    "https://v18.teachermate.cn/wechat-api/v1/class-attendance/student/active_signs",
    {
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json",
        openId,
        "If-None-Match": '"38-djBNGTNDrEJXNs9DekumVQ"',
        Referrer: `https://v18.teachermate.cn/wechat-pro-ssr/student/sign?openid=${openId}`,
      },
      method: "GET",
    }
  );

export interface ISignInQuery {
  courseId: number;
  signId: number;
  lon?: number;
  lat?: number;
}

export const signIn = (openId: string, query: ISignInQuery) =>
  fetch(
    "https://v18.teachermate.cn/wechat-api/v1/class-attendance/student-sign-in",
    {
      headers: {
        ...baseHeaders,
        "Content-Type": "application/json",
        openId,
        Referrer: `https://v18.teachermate.cn/wechat-pro-ssr/student/sign?openid=${openId}`,
      },
      body: JSON.stringify(query),
      method: "POST",
    }
  );

// export const tryShortenURL = async (url: string) => {
//   try {
//     const resp = await fetch(
//       `https://v1.alapi.cn/api/url?url=${encodeURIComponent(url)}`
//     );
//     const json = await resp.json();
//     return json.data.short_url;
//   } catch (err) {
//     console.log(err)
//     return url;
//   }
// };
