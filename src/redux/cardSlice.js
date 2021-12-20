import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import HttpClient from "../httpClient";

export const getCardList = createAsyncThunk("cardSlice/gerCardList", () => {
  return HttpClient.getRequest({ url: "/cards" })
    .then((response) => {
      const { Classic } = response.data;
      return {
        cardList: Classic,
      };
    })
    .catch(() => {
      Alert.alert("Something went wrong");
      return {
        cardList: undefined,
      };
    });
});

export const getSearchedCardList = createAsyncThunk(
  "cardSlice/getSearchedCardList",
  (keyword) => {
    return HttpClient.getRequest({ url: `/cards/search/${keyword}` })
      .then((response) => {
        const { data } = response;
        return {
          searchedCardList: data,
        };
      })
      .catch(() => {
        Alert.alert("Something went wrong");
        return {
          searchedCardList: undefined,
        };
      });
  }
);

export const getCardDetail = createAsyncThunk(
  "cardSlice/getCardDetail",
  (cardId) => {
    return HttpClient.getRequest({ url: `/cards/${cardId}` })
      .then((response) => {
        const { data } = response;
        return {
          cardDetail: data[0],
        };
      })
      .catch(() => {
        Alert.alert("Something went wrong");
        return {
          cardDetail: undefined,
        };
      });
  }
);

export const cardSlice = createSlice({
  name: "cardSlice",
  initialState: {
    cardList: null,
    searchedCardList: null,
    cardDetail: null,
  },
  reducers: {
    resetCardDetail: (state) => {
      state.cardDetail = null;
    },
  },
  extraReducers: {
    [getCardList.fulfilled]: (state, { payload }) => {
      const { cardList } = payload;
      state.cardList = cardList;
    },
    [getSearchedCardList.fulfilled]: (state, { payload }) => {
      const { searchedCardList } = payload;
      state.searchedCardList = searchedCardList;
    },
    [getCardDetail.fulfilled]: (state, { payload }) => {
      const { cardDetail } = payload;
      state.cardDetail = cardDetail;
    },
  },
});
export const { resetCardDetail } = cardSlice.actions;
export default cardSlice.reducer;
