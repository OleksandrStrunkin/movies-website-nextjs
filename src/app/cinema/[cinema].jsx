import { useRouter } from "next/router";

export default function CinemaDetails (){
    const router = useRouter()

    const {cinemaId} router.query;
    return <h1>details {cinemaId}</h1>
}