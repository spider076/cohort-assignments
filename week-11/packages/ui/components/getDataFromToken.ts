import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (req: any):any => {
    try {
        const token = req.cookies.get("token")?.value || "";
        console.log("token :", token);
        const DecodedToken: any = jwt.verify(token, "secret");
        return DecodedToken;
    } catch (err: any) {
        throw new Error(err.message);
    }
}