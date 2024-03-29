import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Modal from "../Modals/Modal"

const Submissions = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen]=useState(false)
  const [addError, setAddError] = useState("");
  const [coverImage, setCoverImage] = useState();
  const [spreadOne, setSpreadOne] = useState();
  const [spreadTwo, setSpreadTwo] = useState();
  const [spreadThree, setSpreadThree] = useState();

  const [addBook, setAddBook] = useState({
    title: "",
    photographer: "",
    size: "",
    pages: "",
    edition: "",
    editionSize: "",
    publicationDate: "",
    publisher: "",
    language: "",
    printing: "",
    extraDetails: "",
    images: "",
    imageTwo: "",
    imageThree: "",
    imageFour: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddBook({ ...addBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/submissions", {
      method: "POST",
      body: JSON.stringify({ ...addBook }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        setAddError("error");
      });
      setSuccessModalIsOpen(true)
    // handleClear();
  };

  const handleClear = () => {
    document
      .querySelectorAll("input,textarea")
      .forEach((input) => (input.value = ""));
    history.go(0);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCoverImage(base64);
    setAddBook({ ...addBook, images: base64 });
  };

  const uploadImageTwo = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSpreadOne(base64);
    setAddBook({ ...addBook, imageTwo: base64 });
  };

  const uploadImageThree = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSpreadTwo(base64);
    setAddBook({ ...addBook, imageThree: base64 });
  };

  const uploadImageFour = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSpreadThree(base64);
    setAddBook({ ...addBook, imageFour: base64 });
  };
const xHandler=()=>{
  setSuccessModalIsOpen(false)
  handleClear()

}
const viewCollection=()=>{
  history.push("/catalogue/collection")
  window.scrollTo(0, 0)

}
  return (
    <BigWrap>
      <Wrap>
        <FormWrap autocomplete="off" >
          <InputGrid>
            <Input
              id="title"
              placeholder="Title"
              type="text"
              name="title"
              value={addBook.title}
              required
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="photographer"
              placeholder="Photographer"
              type="text"
              name="photographer"
              value={addBook.photographer}
              required
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="size"
              placeholder="Size"
              type="text"
              name="size"
              value={addBook.size}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="pages"
              placeholder="Pages"
              type="text"
              name="pages"
              value={addBook.pages}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="edition"
              placeholder="Edition"
              type="text"
              name="edition"
              value={addBook.edition}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="editionSize"
              placeholder="Edition Size"
              type="text"
              name="editionSize"
              value={addBook.editionSize}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="publicationDate"
              placeholder="Publication Date"
              type="text"
              name="publicationDate"
              value={addBook.publicationDate}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="publisher"
              placeholder="Publisher"
              type="text"
              name="publisher"
              value={addBook.publisher}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="language"
              placeholder="Language"
              type="text"
              name="language"
              value={addBook.language}
              onChange={(e) => handleChange(e)}
            />
            <Input
              id="printing"
              placeholder="Printing"
              type="text"
              name="printing"
              value={addBook.printing}
              onChange={(e) => handleChange(e)}
            />
            <Wrap2>
              <Text> Cover: </Text>{" "}
              <input
                id="image"
                type="file"
                required
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
            </Wrap2>
            <Wrap2>
              <Text> Spread One: </Text>{" "}
              <input
                id="image"
                type="file"
                onChange={(e) => {
                  uploadImageTwo(e);
                }}
              />
            </Wrap2>
            <Wrap2>
              <Text> Spread Two: </Text>{" "}
              <input
                id="image"
                type="file"
                onChange={(e) => {
                  uploadImageThree(e);
                }}
              />
            </Wrap2>
            <Wrap2>
              <Text> Spread Three: </Text>{" "}
              <input
                id="image"
                type="file"
                onChange={(e) => {
                  uploadImageFour(e);
                }}
              />
            </Wrap2>
          </InputGrid>
          <ThumbWrap>
            <LeftThumbWrap>
              {coverImage ? (
                <img src={coverImage} height="90px" alt={addBook.title} />
              ) : (
                ""
              )}
              {spreadOne ? (
                <img src={spreadOne} height="90px" alt={addBook.title} />
              ) : (
                ""
              )}
            </LeftThumbWrap>
            <RightThumbWrap>
              {spreadTwo ? (
                <img src={spreadTwo} height="90px" alt={addBook.title} />
              ) : (
                ""
              )}
              {spreadThree ? (
                <img src={spreadThree} height="90px" alt={addBook.title} />
              ) : (
                ""
              )}
            </RightThumbWrap>
          </ThumbWrap>
          <TextArea
            id="extraDetails"
            placeholder="Extra Details"
            wrap="hard"
            type="text"
            name="extraDetails"
            value={addBook.extraDetails}
            onChange={(e) => handleChange(e)}
          />
        </FormWrap>
        <FootWrap>
          <GuideBtn onClick={() => setIsOpen(true)}>Guidelines</GuideBtn>
          <ButWrap>
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
            <Button onClick={handleClear}>Reset</Button>
          </ButWrap>
        </FootWrap>
        <Modal open={isOpen}>
          <Guidelines>
            <X onClick={()=> setIsOpen(false)}>X</X>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit
              duis tristique sollicitudin nibh sit amet commodo. Feugiat pretium
              nibh ipsum consequat nisl vel pretium lectus quam. Donec ultrices
              tincidunt arcu non sodales neque sodales ut. Pellentesque habitant
              morbi tristique senectus et netus et malesuada. Felis imperdiet
              proin fermentum leo vel. Dignissim enim sit amet venenatis urna
              cursus eget nunc scelerisque. Nibh sit amet commodo nulla facilisi
              nullam vehicula. Elit eget gravida cum sociis natoque penatibus
              et. Amet tellus cras adipiscing enim eu turpis. Aliquam eleifend
              mi in nulla. Malesuada fames ac turpis egestas maecenas. Dictum at
              tempor commodo ullamcorper a lacus. Ornare quam viverra orci
              sagittis eu.
            </span>
          </Guidelines>
        </Modal>
        <Modal open={successModalIsOpen}>
          <Success>
          <X onClick={xHandler}>X</X>
<Message>Thank you for your submission!</Message><Button onClick={viewCollection}>View Collection</Button>
          </Success>
        </Modal>
      </Wrap>
    </BigWrap>
  );
};
const Message = styled.div`
margin-left:15px;`

const Success = styled.div`
  border: 2px solid #000;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  line-height: 1.6;
  animation: fadein 2s ease-out;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
const ThumbWrap = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-bottom: 15px;
  @media (max-width: 619px) {
    grid-template-columns: 1fr;
    width: 300px;
  }
`;

const RightThumbWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftThumbWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.span`
  font-size: 18px;
`;

const Wrap2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const X = styled.div`
  border: 2px solid #000;
  padding: 5px;
  background-color: #000;
  color: #fff;
  width: 20px;
  height: 20px;
  line-height: 6px;
  font-size: 10px;
  display: inline-block;
  margin-right: 5px;
  font-weight: bold;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;

const Wrap = styled.div`
  width: 600px;
  margin: 0 auto;
  @media (max-width: 619px) {
    width: 300px;
  }
`;

const Guidelines = styled.div`
  border: 2px solid #000;
  padding: 5px;
  line-height: 1.6;
  animation: fadein 2s ease-out;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FootWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ButWrap = styled.div`
  width: 600px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 619px) {
    width: 300px;
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-bottom: 15px;
  @media (max-width: 619px) {
    grid-template-columns: 1fr;
  }
`;

const TextArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  margin-bottom: 15px;
  height: 300px;
  border: 2px solid #000;
  padding: 5px;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: 2px solid #000;
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;

const GuideBtn = styled.button`
  border: 2px solid #000;
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  border: 2px solid #000;
  padding: 5px;
  :focus {
    outline: none;
  }
`;

const BigWrap = styled.div``;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  justify-content: center;
  margin: 30px 0 15px auto;
  @media (max-width: 619px) {
    width: 300px;
  }
`;

export default Submissions;
