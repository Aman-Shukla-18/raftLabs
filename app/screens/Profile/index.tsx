import { Text, View } from "react-native";
import tw from "twrnc";

export default function Profile() {
  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Profile</Text>
      <View style={tw`bg-white rounded-lg p-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>John Doe</Text>
        <Text style={tw`text-gray-600`}>john@example.com</Text>
      </View>
    </View>
  );
}
