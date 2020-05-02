import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";
import story from "../screens/Stories/Story";

const SearchScreenStack = createStackNavigator({
  Searchs: {
    screen: SearchScreen,
    navigationOptions: () => {
      title: "search";
    },
  },
  Story:{
    screen: story,
    navigationOptions: () => ({
      
    })
  },

});

export default SearchScreenStack;
