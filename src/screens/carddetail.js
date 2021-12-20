import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCardDetail, resetCardDetail } from "../redux/cardSlice";

const CardDetail = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { cardDetail } = useSelector((state) => state.cardReducer) || {};

  React.useEffect(() => {
    const { route } = props;
    const cardId = route.params.cardId ?? "";
    setLoading(true);
    dispatch(getCardDetail(cardId));
    return () => {
      dispatch(resetCardDetail());
    };
  }, []);

  React.useEffect(() => {
    if (cardDetail !== null) {
      setLoading(false);
    }
  }, [cardDetail]);

  const { cardSet, name, playerClass, text, type } = cardDetail || {};
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View>
          <Text>
            {"CardSet: "}
            {cardSet}
          </Text>
          <Text>
            {"Name: "}
            {name}
          </Text>
          <Text>
            {"PlayerClass: "}
            {playerClass}
          </Text>
          <Text>
            {"Type: "}
            {type}
          </Text>
          <Text>
            {"Text: "}
            {text}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CardDetail;
