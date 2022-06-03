
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Components/ScrollView/ScrollView');

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => jest.genMockFromModule('react-native/Libraries/Components/ScrollView/ScrollView'));