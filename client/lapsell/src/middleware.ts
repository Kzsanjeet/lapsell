import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export function middleware(request:NextRequest){
    const token = request.cookies.get("accessToken")?.value;
    const pathname = new URL(request.url).pathname;

    //path where authentication should not redirect
    const publicPaths= ["/login"]

    // if(token && publicPaths.some((path)=>pathname.startsWith(path))){
    //     return NextResponse.redirect(new URL("/",request.url));
    // }

    // if(!token && !publicPaths.some((path)=>pathname.startsWith(path))){
    //     return NextResponse.redirect(new URL("/login",request.url));
    // }



    return NextResponse.next()


}

// export const config ={
//     matcher:[
//         "/",
//         "/products/:path*",
//         "/search/:path*",
//         "/product/:path*"

//     ]
// }