import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;
        const icon = options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: isFocused ? 'white' : 'gray', size: 24 }) : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Animated.View style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
              {icon}
              <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    height: 120,
    backgroundColor: 'rgba(20,18,25,.9)',
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    marginTop: 30,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  tabItemFocused: {
    backgroundColor: 'rgb(62, 84, 199)',
  },
  label: {
    color: 'gray',
    marginLeft: 8,
    display: 'none',
  },
  labelFocused: {
    color: 'white',
    display: 'flex',
  },
});