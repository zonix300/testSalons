import { Salon } from "@/types/salon";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Star } from "lucide-react";

export default function SalonCard({ salon }: { salon: Salon }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/salons/${salon.placeId}`);
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle className="text-3xl">{salon.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col h-full">

        <div className="flex pb-4 mt-auto">
          <MapPin className="mr-2" />
          {salon.address.split(",")[0]}, {salon.district}
        </div>

      </CardContent>

      <CardFooter className="block">
        <div className="flex pb-4">
          <Star className="mr-2" />
          {salon.rating}
          ({salon.reviewsNumber})
        </div>

        <Button onClick={handleClick} className="w-full p-5">
          View Details <ArrowRight />
        </Button>
      </CardFooter>

    </Card>
  );
}
