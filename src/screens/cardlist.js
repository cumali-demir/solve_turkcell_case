import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCardList, getSearchedCardList } from "../redux/cardSlice";

const CardList = (props) => {
  const dispatch = useDispatch();
  const { cardList, searchedCardList } =
    useSelector((state) => state.cardReducer) || {};
  const [dataSource, setDataSource] = React.useState([]);
  //   const [searchActive, setSearchActive] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [searchLoading, setSearchLoading] = React.useState(false);
  let searchText = "";
  React.useEffect(() => {
    dispatch(getCardList());
  }, []);

  React.useEffect(() => {
    if (cardList !== null) {
      setLoading(false);
      setDataSource(cardList);
    }
  }, [cardList]);

  React.useEffect(() => {
    if (searchedCardList !== null) {
      setSearchLoading(false);
      setDataSource(searchedCardList);
    }
    if (searchedCardList === undefined) {
      setSearchLoading(false);
    }
  }, [JSON.stringify(searchedCardList)]);

  const renderItem = ({ item }) => {
    const { cardId, name, playerClass, text, type } = item;
    const { navigation } = props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("CardDetail", { cardId })}
        key={cardId}
      >
        <Text style={{ marginVertical: 10 }}>
          {"Name: "} {name}
        </Text>
        <Text style={{ marginVertical: 10 }}>
          {"Player Class: "} {playerClass}
        </Text>
        <Text style={{ marginVertical: 10 }}>
          {"Text: "} {text}
        </Text>
        <Text style={{ marginVertical: 10 }}>
          {"Type: "} {type}
        </Text>
      </TouchableOpacity>
    );
  };

  const callSearch = () => {
    // setSearchActive(true);
    if (searchText !== "") {
      setSearchLoading(true);
      dispatch(getSearchedCardList(searchText));
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          {searchLoading ? (
            <View
              style={{
                position: "absolute",
                backgroundColor: "#FFFFFF",
                opacity: 0.5,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10000,
              }}
            >
              <ActivityIndicator />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              padding: 12,
            }}
          >
            <TextInput
              placeholder="Type here"
              style={{
                flex: 1,
                padding: 12,
                borderWidth: 1,
                borderColor: "darkgray",
              }}
              onChangeText={(text) => {
                if (text === "") {
                  setDataSource(cardList);
                }
                searchText = text;
              }}
            />
            <TouchableOpacity
              style={{ padding: 12, borderWidth: 1 }}
              onPress={callSearch}
            >
              <Text>{"SEARCH"}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 20,
              flexGrow: cardList?.length > 0 ? undefined : 1,
            }}
            keyExtractor={(item) => `ExractorKey${item.cardId}`}
            data={dataSource || []}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  marginVertical: 2,
                  backgroundColor: "gray",
                }}
              />
            )}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{"There is no Card here :("}</Text>
              </View>
            }
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "white" },
});
