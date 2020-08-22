import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import  * as URLs from "../../assets/constants/fetchs"

export default function (props) {
  const { navigation } = props;
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      function findStory() {
        return fetch(`${URLs.HEROKU_URL}/api/historia/${search}`)
          .then((response) => response.json())
          .then((json) => {
            setStories(json);
            return json;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      findStory();
    } else {
      async function findHistoriasInactivas() {
        return await fetch(`${URLs.HEROKU_URL}/api/historiasInactivas`)
          .then((response) => response.json())
          .then((json) => {
            setStories(json);
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      let w = findHistoriasInactivas();
    }
  }, 300);

  return (
    <View>
      <SearchBar
        placeholder="Busca una historia"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.seachBar}
      />
      {stories.length === 0 ? (
        <View>
          <NotFoundStory />
        </View>
      ) : (
        <FlatList
          data={stories}
          renderItem={(story) => (
            <Story story={story} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
function Story(props) {
  const { story, navigation } = props;
  console.log("esto es sstory" + story.item.imagen);
  return (
    <View>
      <ListItem
        title={story.item.titulo}
        titleStyle={styles.title}
        subtitle={
          <View style={styles.subtitleView}>
            <Icon type="material-community" name="heart" color="#DD0000" />
            <Text style={styles.ratingText}>{story.item.mg}</Text>
            <Icon type="material-community" name="account" color="#00a680" />
            <Text style={styles.ratingText}>43</Text>
          </View>
        }
        Icon={<Icon type="material-community" name="chevron-right" />}
        leftAvatar={{ source: { uri: story.item.imagen }, size: "large" }}
        rightIcon={<Icon type="material-community" name="chevron-right" />}
        onPress={() => navigation.navigate("Story", { story: story.item })}
      />
    </View>
  );
}
function NotFoundStory() {
  return (
    <View style={styles.notFound}>
      <Image
        source={require("../../assets/img/search.png")}
        resizeMode="cover"
        style={{ width: 250, height: 300 }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  seachBar: {
    marginBottom: 20,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
  },
  subtitleView: {
    flexDirection: "row",
  },
  ratingText: {
    color: "#000000",
    fontSize: 18,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
