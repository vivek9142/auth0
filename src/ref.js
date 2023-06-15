import {
  Link,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useParams,
  useOutletContext,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

export default function Ref() {
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {location.state}
          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/*" element={<BookRoutes />}>
          {/* <Route index element={<BookList />} />
          <Route path=":id" element={<Book />} />
          <Route path="new" element={<NewBook />} /> */}
        </Route>
        {/* <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/new" element={<NewBook />} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function BookRoutes() {
  return (
    <>
      <BookLayout />
      <Routes>
        <Route index element={<BookList />} />
        <Route path=":id" element={<Book />} />
        <Route path="new" element={<NewBook />} />
      </Routes>
    </>
  );
}

function BookList() {
  return (
    <>
      <h1>BookList</h1>
    </>
  );
}

function Home() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

function NewBook() {
  // hook to access outlet context
  //   const obj = useOutletContext();
  return (
    <>
      <h1>
        NewBook with context
        {/* {obj.text}  */}
      </h1>
    </>
  );
}

function Book() {
  const { id } = useParams();
  return (
    <>
      <h1>Book {id}</h1>
    </>
  );
}

function BookLayout() {
  const [searchParams, setSearchParams] = useSearchParams({ n: 3 });
  const number = searchParams.get("n");

  return (
    <>
      <Link to="/books/1">Book 1</Link>
      <br />
      <Link to="/books/2">Book 2</Link>
      <br />
      <Link to="/books/new">New Book</Link>
      {/* the outlet will share the data and components between routes and sub routes
        the context will share data with sub routes
       */}
      <Outlet context={{ text: "Hello World" }} />

      <Link to={`/books/${number}`}>Book {number}</Link>
      <br />
      <input
        type="number"
        value={number}
        onChange={(e) => setSearchParams({ n: e.target.value })}
      />
    </>
  );
}

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { state: "Error Not Page" });
    });
  }, []);
  return <h1>NotFound</h1>;
}
