import LogoutComponent from '@/components/LogoutComponent';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: 'blue',
        headerShown: true,
        headerRight: () => <LogoutComponent />,
        headerTitleAlign: 'left'
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Feed',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addPost"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          title: 'My Profile',
          href: null,
        }}
      />
    </Tabs>
    
  );
}
