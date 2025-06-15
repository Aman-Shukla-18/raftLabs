import { createBooking, fetchProperty } from "@/src/lib/api";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";

export default function PropertyDetail({ id }: { id: string | string[] }) {
  const topInSet = useSafeAreaInsets().top
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id as string),
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      router.push("/booking");
    },
  });

  const handleBooking = () => {
    bookingMutation.mutate({
      propertyId: id,
      userId: "user1", // Hardcoded for demo
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "pending",
    });
  };

  const goBack = () => {
    router.back();
  }

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-center`}>Loading property details...</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-center`}>Property not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Image
        source={{ uri: property.images[0] }}
        style={tw`w-full h-64`}
        resizeMode="cover"
      />
      <Pressable onPress={goBack} style={tw`absolute top-${Math.floor(topInSet/4)} left-4 bg-white p-3 rounded-full`}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{property.title}</Text>
        <Text style={tw`text-gray-600 mb-2`}>{property.location.address}</Text>
        <Text style={tw`text-green-600 font-bold text-xl mb-4`}>
          ${property.price}/month
        </Text>

        <Text style={tw`font-bold text-lg mb-2`}>Features</Text>
        {property.features.map((feature, index) => (
          <Text key={index} style={tw`text-gray-600 mb-1`}>
            • {feature}
          </Text>
        ))}

        <Text style={tw`font-bold text-lg mt-4 mb-2`}>Location</Text>
        <MapView
          style={tw`w-full h-48 mb-4`}
          initialRegion={{
            latitude: property.location.coordinates.latitude,
            longitude: property.location.coordinates.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: property.location.coordinates.latitude,
              longitude: property.location.coordinates.longitude,
            }}
            title={property.title}
          />
        </MapView>

        <Pressable
          style={tw`bg-blue-500 p-4 rounded-lg`}
          onPress={handleBooking}
          disabled={bookingMutation.isPending}
        >
          <Text style={tw`text-white text-center font-bold`}>
            {bookingMutation.isPending ? "Booking..." : "Book Now"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
