import { useLocalSearchParams } from "expo-router";
import PropertyDetail from "../screens/Property";

export default function PropertyWrapper() {
  const { id } = useLocalSearchParams();

  return <PropertyDetail id={id} />;
}