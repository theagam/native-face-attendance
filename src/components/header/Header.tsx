import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../helper/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

type NavigationProp = NativeStackNavigationProp<any>;

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={Style.headerContainer} edges={['top']}>
      <View style={Style.headLeft}>
        {showBack && (
          <TouchableOpacity
            style={Style.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={Style.iconText}>←</Text>
          </TouchableOpacity>
        )}
        <View style={Style.titleContainer}>
          <Text style={Style.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const Style = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.PRIMARY,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    minHeight: 56,
  },
  headLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingEnd: 10,
  },
  iconText: {
    fontSize: 24,
    color: colors.WHITE,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.WHITE,
    textTransform: 'capitalize',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: colors.RED,
  },
});
