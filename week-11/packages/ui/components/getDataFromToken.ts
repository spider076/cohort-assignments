import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const getDataFromToken = (req: NextRequest): any => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const DecodedToken: any = jwt.verify(token, "secret");
        return DecodedToken;
    } catch (err: any) {
        console.log('eorrrrrr');
        throw new Error(err.message);
    }
}

export default getDataFromToken;