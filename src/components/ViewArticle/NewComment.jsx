const NewComment = ({ comments }) => {
  const handleSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <section>
      <h3>Add a new comment</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-comment"></label>
        <input type="text" id="new-comment" name="new-comment" />
        <button>Add comment</button>
      </form>
    </section>
  );
};
export default NewComment;
