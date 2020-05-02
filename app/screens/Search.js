import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";

export default function(props) {
  const { navigation } = props;
  const [stories, setHistories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    if (search) {
      setHistories([
        
        {
          id: 2,
          usuario: null,
          comentarios: [],
          imagen:
            "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fasd?alt=media&token=c99ff75e-4ab7-4eff-9ec7-a5a1f63cd7e4",
          genero: "fantasia",
          titulo: "la naranja mecanica",
          relato: "Habia una vez un...",
          mg: "14",
          createAt: null,
          activo: 0
        }
      ]);
    }else{
      setHistories([
        {
          id: 1,
          usuario: null,
          comentarios: [
            {
              id: 1,
              mg: 2,
              comentario:
                "Entonces aparecio un bicmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmhoEntonces aparecio un bicho Entonces aparecio un bicho Entonces aparecio un bicho Entonces aparecio un bicho",
              createAt: "2000-01-01T00:00:00.000+0000",
              usuario: {
                usuario: "Jorgelina rivaldi"
              }
            },
            {
              id: 2,
              mg: 2,
              comentario: "un circo que alegraba siempre el cprazon",
              createAt: "2000-01-01T00:00:00.000+0000",
              usuario: {
                usuario: "Jorgelina rivaldi"
              }
            },
            {
              id: 2,
              mg: 5,
              comentario: "una cancha de futbol en el medio ",
              createAt: "2000-01-01T00:00:00.000+0000",
              usuario: {
                usuario: "Jorgelina rivaldi"
              }
            }
          ],
          imagen:
            "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fpiramides.jpg?alt=media&token=a34ef33f-203f-40ae-a039-55d342bcd31c",
          genero: "fantasia",
          titulo: "el loco flechazo",
          relato:
            "Habia una vez un.... Entonce   s aparecio un bicho. Entonces aparecio un bicho. Entonces aparecio un bicho. Entonces aparecio un bicho",
          mg: "38",
          createAt: null,
          activo: 0
        },
        {
          id: 2,
          usuario: null,
          comentarios: [],
          imagen:
            "https://firebasestorage.googleapis.com/v0/b/welit-3d309.appspot.com/o/storyImages%2Fasd?alt=media&token=c99ff75e-4ab7-4eff-9ec7-a5a1f63cd7e4",
          genero: "fantasia",
          titulo: "la naranja mecanica",
          relato: "Habia una vez un...",
          mg: "14",
          createAt: null,
          activo: 0
        }
      ]);
    }
  }, 300);

  return (
    <View>
      <SearchBar
        placeholder="Busca una historia"
        onChangeText={e => setSearch(e)}
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
          renderItem={story => <Story story={story} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
function Story(props) {
  const { story, navigation } = props;
  console.log("esto es sstory" + story);
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
        source={require("../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  seachBar: {
    marginBottom: 20
  },
  notFound: {
    flex: 1,
    alignItems: "center"
  },
  subtitleView: {
    flexDirection: "row"
  },
  ratingText: {
    color: "#000000",
    fontSize: 18,
    marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
