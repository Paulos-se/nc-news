function SortBy({ query, setQuery, setSearch }) {
  function handleInput(e) {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  }

  function sort(e) {
    e.preventDefault();

    setSearch(query);
  }
  return (
    <form onSubmit={sort} name="params">
      <label htmlFor="sort_by">Sort by</label>
      <select onChange={handleInput} name="sort_by">
        <option value="created_at">Created at</option>
        <option value="author">Author</option>
        <option value="created_at">Article ID</option>
        <option value="votes">votes</option>
        <option value="title">Title</option>
        <option value="comment_count">Number of comments</option>
      </select>
      <label htmlFor="order">Order</label>
      <select name="order" onChange={handleInput}>
        <option value="DESC">DESC</option>
        <option value="ASC">ASC</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Sort
      </button>
    </form>
  );
}

export default SortBy;
