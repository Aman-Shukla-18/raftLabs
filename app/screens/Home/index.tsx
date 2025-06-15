import { fetchProperties } from '@/src/lib/api';
import { usePropertyStore } from '@/src/store/propertyStore';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: properties, isLoading } = useQuery({ queryKey: ['properties'], queryFn: fetchProperties });
  const setProperties = usePropertyStore((state) => state.setProperties);

  if (properties) {
    setProperties(properties);
  }

  const filteredProperties = properties?.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProperty = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-white rounded-lg  mb-4 overflow-hidden`}
      onPress={() => router.push(`/property/${item.id}`)}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={tw`w-full h-48`}
        resizeMode="cover"
      />
      <View style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>{item.title}</Text>
        <Text style={tw`text-gray-600 mb-2`}>
          {item.location.city}, {item.location.state}
        </Text>
        <Text style={tw`text-green-600 font-bold`}>${item.price}/month</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <TextInput
        style={tw`bg-white p-4 rounded-lg mb-4`}
        placeholder="Search by title or city"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {isLoading ? (
        <Text style={tw`text-center`}>Loading properties...</Text>
      ) : (
        <FlatList
          data={filteredProperties}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
