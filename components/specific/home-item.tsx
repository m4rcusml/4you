import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

interface HomeItemProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onPress?(): any;
}

export function HomeItem({ label, icon, onPress, className }: HomeItemProps) {
  return (
    <Pressable onPress={onPress} className="flex-1">
      <Card
        className={cn(
          "flex-1 p-4 items-center justify-center gap-2 rounded-xl bg-card hover:shadow-lg",
          className
        )}
        style={{
          // React Native shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          // React Native elevation for Android
          elevation: 4,
        }}
      >
        <CardContent className="flex flex-col items-center justify-center p-0">
          <View className="w-12 h-12 items-center justify-center mb-2">
            {icon}
          </View>
          <Text className="text-sm text-center font-medium text-foreground">{label}</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}