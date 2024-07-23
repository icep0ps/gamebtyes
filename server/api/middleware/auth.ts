import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export default function authenticateTokens(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const access_token = request.headers.authorization?.split(" ")[1];
  const refresh_token = request.cookies.token;

  // checking if we have a refresh token
  if (!refresh_token) {
    console.log("No refresh token found, redirectting");
    response.statusCode = 403;
    return response.json({
      message: "Unauthorized",
    });
  }

  // generate a new access token if we dont have one
  if (!access_token) {
    const decodedRefreshToken = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET as string,
    );

    // refresh token expired
    if (!decodedRefreshToken) {
      response.clearCookie("token");
      return response.redirect("http://localhost:3000/auth/signup");
    }

    const newAccessToken = jwt.sign(decodedRefreshToken, refresh_token);
    response.header("Authorization", `Bearer ${newAccessToken}`);
    return next();
  }

  const validToken = jwt.verify(access_token, refresh_token);

  if (!validToken) {
    // we are not chcking if the refresh token is still valid please check
    const newAccessToken = jwt.sign(refresh_token, refresh_token);
    response.header("Authorization", `Bearer ${newAccessToken}`);
    return next();
  }

  response.header("Authorization", `Bearer ${access_token}`);
  return next();
}
