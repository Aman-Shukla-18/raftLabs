import { fetchBookings, fetchProperties } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function Bookings() {
  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });
  const { data: properties, isLoading: isLoadingProperties } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100";
      case "pending":
        return "bg-yellow-100";
      case "cancelled":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderBooking = ({ item: booking }) => {
    const property = properties?.find((p) => p.id === booking.propertyId);

    if (!property) return null;

    return (
      <TouchableOpacity
        style={tw`${getStatusColor(booking.status)} rounded-lg p-4 mb-4`}
        onPress={() => router.push(`/property/${property.id}`)}
      >
        <Text style={tw`text-lg font-bold mb-2`}>{property.title}</Text>
        <Text style={tw`text-gray-600 mb-1`}>
          Check-in: {formatDate(booking.checkIn)}
        </Text>
        <Text style={tw`text-gray-600 mb-2`}>
          Check-out: {formatDate(booking.checkOut)}
        </Text>
        <Text
          style={tw`capitalize font-semibold ${
            booking.status.toLowerCase() === "confirmed"
              ? "text-green-700"
              : booking.status.toLowerCase() === "pending"
              ? "text-yellow-700"
              : "text-red-700"
          }`}
        >
          {booking.status}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoadingBookings || isLoadingProperties) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-center`}>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Your Bookings</Text>
      {bookings?.length === 0 ? (
        <Text style={tw`text-center text-gray-500`}>No bookings found</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
