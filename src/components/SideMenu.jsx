export default function SideMenu() {
  return (
    <>
      <div className="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search..." name="search" size="25" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <br />
      <div>highest rated</div>
      <div> categories toggles</div>
      <div>live chat</div>
    </>
  );
}
