import { getSalon, updateSalon } from "@/api/salons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Salon } from "@/types/salon";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function SalonDetaisPage() {

  const { placeId } = useParams<{ placeId: string }>();
  const [generalInfoEditMode, setGeneralInfoEditMode] = useState(false);
  const [locationEditMode, setLocationEditMode] = useState(false);

  const [salon, setSalon] = useState<Salon | null>(null);

  const { data, isLoading } = useQuery<Salon>({
    queryKey: ["salons", placeId],
    queryFn: () => getSalon(placeId!),
    enabled: (!!placeId)
  });

  const handleSave = async () => {
    setSalon(await updateSalon(placeId!, salon!));
    setGeneralInfoEditMode(false);
    setLocationEditMode(false);
  }

  useEffect(() => {
    if (!isLoading) setSalon(data!);
  }, [data]);

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="px-4">
          <Card className="mb-4">
            <CardHeader className="flex flex-end text-5xl">{data?.name}</CardHeader>
            <CardDescription className="flex flex-1 items-end text-slate-500 text-sm">
              <MapPin className="mx-4" />
              <span className="">{salon?.address.split(",")[0]}</span>
            </CardDescription>
          </Card>
          <Card className="mb-4">
            {generalInfoEditMode ? (
              <>
                <CardHeader className="flex flex-1 justify-between">
                  <span className="text-xl">General information</span>
                  <div>
                    <Button variant="outline" onClick={() => setGeneralInfoEditMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSave()}>
                      Save
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-4">
                  <Field className="flex flex-col">
                    <FieldLabel className="text-slate-500">
                      Salon Name
                    </FieldLabel>
                    <Input
                      value={salon?.name ?? ""}
                      className="text-lg"
                      onChange={(e) =>
                        setSalon((prev) => ({
                          ...prev!,
                          name: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field className="flex flex-col">
                    <FieldLabel className="text-slate-500">
                      Phone
                    </FieldLabel>
                    <Input
                      value={salon?.phoneNumber ?? ""}
                      className="text-lg"
                      onChange={(e) =>
                        setSalon((prev) => ({
                          ...prev!,
                          phoneNumber: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field className="flex flex-col col-span-2">
                    <FieldLabel className="text-slate-500">
                      Contact link
                    </FieldLabel>
                    <Input
                      value={salon?.website ?? ""}
                      placeholder="https://example.com"
                      onChange={(e) =>
                        setSalon((prev) => ({
                          ...prev!,
                          website: e.target.value,
                        }))
                      }
                    />
                  </Field>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="flex flex-1 justify-between">
                  <span className="text-xl">General information</span>
                  <Button onClick={() => setGeneralInfoEditMode(true)}>Edit</Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2">
                  <Field className="flex">
                    <FieldLabel className="text-slate-500">Salon Name</FieldLabel>
                    <FieldContent><span className="flex text-lg text-left">{salon?.name}</span></FieldContent>
                  </Field>
                  <Field className="flex">
                    <FieldLabel className="text-slate-500">Phone</FieldLabel>
                    <FieldContent><span className="flex text-lg">{salon?.phoneNumber}</span></FieldContent>
                  </Field>
                  <Field className="flex mt-4">
                    <FieldLabel className="hover:underline"><a href={salon?.website ? salon.website : "#"} className="flex flex-1 items-end">Contact link<ExternalLink /></a></FieldLabel>
                  </Field>
                </CardContent>
              </>
            )}
          </Card >
          <Card className="mb-4">
            {locationEditMode ? (
              <>
                <CardHeader className="flex flex-1 justify-between">
                  <span className="text-xl">Location</span>
                  <div>
                    <Button variant="outline" onClick={() => setLocationEditMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSave()}>
                      Save
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-4">
                  <Field className="flex flex-col col-span-2">
                    <FieldLabel className="text-slate-500">
                      Street Address
                    </FieldLabel>
                    <Input
                      value={salon?.address ?? ""}
                      className="text-lg"
                      onChange={(e) =>
                        setSalon((prev) => ({
                          ...prev!,
                          address: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field className="flex flex-col">
                    <FieldLabel className="text-slate-500">
                      District
                    </FieldLabel>
                    <Input
                      value={salon?.district ?? ""}
                      className="text-lg"
                      onChange={(e) =>
                        setSalon((prev) => ({
                          ...prev!,
                          district: e.target.value,
                        }))
                      }
                    />
                  </Field>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="flex flex-1 justify-between">
                  <span className="text-xl">Location</span>
                  <Button onClick={() => setLocationEditMode(true)}>Edit</Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2">
                  <Field>
                    <FieldLabel className="text-slate-500">Street Address</FieldLabel>
                    <FieldContent><span className="flex text-lg">{salon?.address}</span></FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel className="text-slate-500">District</FieldLabel>
                    <FieldContent><span className="flex text-lg">{salon?.district}</span></FieldContent>
                  </Field>
                </CardContent>
              </>
            )}
          </Card>
          <Card>
            <CardHeader className="flex flex-1 justify-between">
              <span className="text-xl">Rating</span>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              <Field>
                <FieldLabel className="text-slate-500">Rating Score</FieldLabel>
                <FieldContent><span className="flex text-lg">{salon?.rating}/5.0</span></FieldContent>
              </Field>
              <Field>
                <FieldLabel className="text-slate-500">Number Of Reviwes</FieldLabel>
                <FieldContent><span className="flex text-lg">{salon?.reviewsNumber}</span></FieldContent>
              </Field>
            </CardContent>
          </Card>
        </div >
      )
      }
    </div >
  )
}
