import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKeyTMDB } from "../../services/movieApiKey";
import { movieApiInstance } from "../../services/movieApi";

const initialState = {
  movies: [],
  allMovie: [],
  movieByGenre: [],
  searchList: [],
  movieInfo: [],
  totalPages: 0,
  isLoading: false,
  isSuccess: false,
  message: "",
  keyword: "",
  movieIncludePriceList: localStorage.getItem("movieIncludePriceList")
    ? JSON.parse(localStorage.getItem("movieIncludePriceList"))
    : [],
  onSellMovieList: localStorage.getItem("movieInStore")
    ? JSON.parse(localStorage.getItem("movieInStore"))
    : [],
};

export const getAllMovies = createAsyncThunk(
  "movieList/getAllMovie",
  async (data, { rejectWithValue }) => {
    try {
      const res = await movieApiInstance.get(`discover/movie`, {
        params: {
          api_key: APIKeyTMDB,
          page: data.page,
        },
      });
      // console.log(res.data);
      return {
        movies: [...res.data.results],
        totalPages: res.data.total_pages,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMovieByKeyword = createAsyncThunk(
  "movieList/getMovieByKeyword",
  async (keyword, { rejectWithValue }) => {
    try {
      const res = await movieApiInstance.get(`search/movie`, {
        params: {
          api_key: APIKeyTMDB,
          query: keyword,
        },
      });

      return [...res.data.results];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMovieDetailByID = createAsyncThunk(
  "movieList/getMovieDetailByID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await movieApiInstance.get(`movie/${id}`, {
        params: {
          api_key: APIKeyTMDB,
          append_to_response: "videos",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearKeyword: (state, action) => {
      state.keyword = "";
    },
    updatePriceById: (state, action) => {
      const { id, price } = action.payload;
      const existingMovie = state.movieIncludePriceList.find(
        (item) => item.id === id
      );

      if (existingMovie) {
        existingMovie.price = price;
      } else {
        state.movieIncludePriceList.push({ id: id, price: price });
      }

      //need to check searchList first
      if (state.searchList.length !== 0) {
        state.searchList = state.searchList.map((movie) => {
          return movie.id === id ? { ...movie, price: price } : movie;
        });
      }

      state.allMovie = state.allMovie.map((movie) => {
        return movie.id === id ? { ...movie, price: price } : movie;
      });

      localStorage.setItem(
        "movieIncludePriceList",
        JSON.stringify(state.movieIncludePriceList)
      );
    },
    addMovieToMarket: (state, action) => {
      const id = action.payload;
      const existingMovie = state.onSellMovieList.find(
        (item) => item.id === id
      );
      if (!existingMovie) {
        state.onSellMovieList.push({ id: action.payload });
        localStorage.setItem(
          "movieInStore",
          JSON.stringify(state.onSellMovieList)
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allMovie = action.payload.movies.map((movie) => {
          const priceItem = state.movieIncludePriceList.find(
            (item) => item.id === movie.id
          );
          return {
            ...movie,
            price: priceItem ? priceItem.price : 0,
          };
        });
        state.totalPages = action.payload.totalPages;
        state.isSuccess = true;
      })

      .addCase(getAllMovies.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getMovieByKeyword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieByKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchList = action.payload.map((movie) => {
          const priceItem = state.movieIncludePriceList.find(
            (item) => item.id === movie.id
          );
          return {
            ...movie,
            price: priceItem ? priceItem.price : 0,
          };
        });

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getMovieByKeyword.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getMovieDetailByID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieDetailByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieInfo = action.payload;
        state.isSuccess = true;
      })
      .addCase(getMovieDetailByID.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});
export const { setKeyword, clearKeyword, updatePriceById, addMovieToMarket } =
  movieSlice.actions;
export default movieSlice.reducer;
