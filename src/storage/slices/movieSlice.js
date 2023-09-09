import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKeyTMDB } from "../../services/movieApiKey";
import { movieApiInstance } from "../../services/movieApi";

const initialState = {
  movies: [],
  trendingMovies: [],
  popularMovies: [],
  allMovie: [],
  genres: [],
  movieByGenre: [],
  searchList: [],
  movieInfo: [],
  totalPages: 0,
  isLoading: false,
  isSuccess: false,
  message: "",
  selectedGenres: [],
  keyword: "",
};
 

export const getAllMovies = createAsyncThunk(
  "movieList/getAllMovie",
  async (data, { rejectWithValue }) => {
 
    try {
  
      const res = await movieApiInstance.get(`discover/movie`, {
        params:{
          api_key: APIKeyTMDB,
          page:data.page
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
      state.keyword = action.payload
    },
    clearKeyword:(state,action)=>{
      state.keyword = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allMovie = action.payload.movies;
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
        state.searchList = action.payload;
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
export const {setKeyword,clearKeyword} = movieSlice.actions
export default movieSlice.reducer;
