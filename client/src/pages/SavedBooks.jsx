import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
  });

  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      try {
        const { me } = cache.readQuery({ query: GET_ME });

        const updatedSavedBooks = me.savedBooks.filter(
          (book) => book.bookId !== removeBook.savedBooks[0].bookId
        );

        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...me,
              savedBooks: updatedSavedBooks,
            },
          },
        });

        console.log("Updated cache after removal:", updatedSavedBooks);
      } catch (e) {
        console.error("Error updating cache after book removal:", e);
      }
    },
    onError(err) {
      console.error("Mutation error:", err);
    },
  });

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      console.log("Book removed:", data); // Log the mutation response

      if (!data?.removeBook) {
        throw new Error("Something went wrong!");
      }

      removeBookId(bookId);
      refetch(); // Refetch the query to update the UI
    } catch (err) {
      console.error("Error removing book:", err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Ensure there are no duplicate books
  const uniqueSavedBooks = Array.from(
    new Map(userData.savedBooks.map((book) => [book.bookId, book])).values()
  );

  console.log("Rendered saved books:", uniqueSavedBooks);

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {uniqueSavedBooks.length
            ? `Viewing ${uniqueSavedBooks.length} saved ${
                uniqueSavedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {uniqueSavedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(", ")}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
