// A user should be able to sort how the articles are presented to them.
// Things to consider:

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// The controls they will use to do this
// What their default values are
// How you can use these to change the API request.
// You may wish to update the URL as well. Have a look at the useSearchParams available from React Router to help you with this.

function SortBy({ setCategory, setOrder }) {
  return (
    <div>
      <label htmlFor="order">Sort by</label>
      <select name="sort_by" onChange={(e) => setCategory(e.target.value)}>
        <option value="created_at">created_at</option>
        <option value="article_id">article_id</option>
        <option value="comment_count">comment_count</option>
        <option value="title">title</option>
        <option value="author">author</option>
        <option value="votes">votes</option>
      </select>
      <label htmlFor="order">Order</label>
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="DESC">DESC</option>
        <option value="ASC">ASC</option>
      </select>
    </div>
  );
}

export default SortBy;
