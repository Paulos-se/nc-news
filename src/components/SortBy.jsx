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
    <form onSubmit={sort} className="params">
      <select onChange={handleInput} name="sort_by" className="sando">
        <option>Sort by</option>
        <option value="created_at">Created at</option>
        <option value="author">Author</option>
        <option value="article_id">Article ID</option>
        <option value="votes">votes</option>
        <option value="title">Title</option>
        <option value="comment_count">Number of comments</option>
      </select>

      <select name="order" onChange={handleInput} className="sando">
        <option>order</option>
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
